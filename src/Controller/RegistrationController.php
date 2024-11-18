<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Security\EmailVerifier;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

class RegistrationController extends AbstractController
{
    public function __construct(private EmailVerifier $emailVerifier) {}

    #[Route('/register', name: 'app_register')]
    public function register(
        Request $request,
        UserPasswordHasherInterface $userPasswordHasher,
        EntityManagerInterface $entityManager
    ): Response {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var string $plainPassword */
            $plainPassword = $form->get('plainPassword')->getData();

            // encode the plain password
            $user->setPassword($userPasswordHasher->hashPassword($user, $plainPassword));

            $user->setRoles(['ROLE_USER']);
            $entityManager->persist($user);
            $entityManager->flush();

            // generate a signed url and email it to the user
            $this->emailVerifier->sendEmailConfirmation(
                'app_verify_email',
                $user,
                (new TemplatedEmail())
                    ->from(new Address('contact@devlm.fr', 'support-devlm'))
                    ->to((string) $user->getEmail())
                    ->subject('Confirmation de votre email')
                    ->htmlTemplate('mails/confirmation_email.html.twig', [
                        'id' => $user->getId()
                    ])
            );

            $this->addFlash('success', 'Un e-mail de vérification a été envoyé. Veuillez vérifier votre boîte de réception.');

            return $this->redirectToRoute('app_login');
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form
        ]);
    }

    #[Route('/verify/email', name: 'app_verify_email')]
    public function verifyUserEmail(
        Request $request,
        TranslatorInterface $translator,
        EntityManagerInterface $entityManager
    ): Response {
        $id = $request->query->get('id');

        // Renvoi de l'email de confirmation
        if ($request->query->get('resend') === 'true') {
            if (!$id) {
                $this->addFlash('warning', 'Aucun utilisateur spécifié pour renvoyer l\'email de confirmation.');
                return $this->redirectToRoute('app_register');
            }

            $user = $entityManager->getRepository(User::class)->find($id);

            if (!$user) {
                $this->addFlash('warning', 'Utilisateur introuvable.');
                return $this->redirectToRoute('app_register');
            }

            if ($user->isVerified()) {
                $this->addFlash('info', 'Cet utilisateur a déjà vérifié son email.');
                return $this->redirectToRoute('app_login');
            }

            // Envoyer un nouvel email de confirmation
            $this->emailVerifier->sendEmailConfirmation(
                'app_verify_email',
                $user,
                (new TemplatedEmail())
                    ->from(new Address('contact@devlm.fr', 'support-devlm'))
                    ->to((string) $user->getEmail())
                    ->subject('Renvoyer votre email de confirmation')
                    ->htmlTemplate('mails/confirmation_email.html.twig', [
                        'id' => $user->getId()
                    ])
            );

            $this->addFlash('success', 'Un nouvel e-mail de confirmation a été envoyé. Veuillez vérifier votre boîte de réception.');
            return $this->redirectToRoute('verification_needed');
        }

        // Vérification de l'email
        if (null === $id) {
            return $this->redirectToRoute('app_register');
        }

        $user = $entityManager->getRepository(User::class)->find($id);

        if (null === $user) {
            $this->addFlash('warning', 'Utilisateur introuvable.');
            return $this->redirectToRoute('app_register');
        }

        try {
            $this->emailVerifier->handleEmailConfirmation($request, $user);
        } catch (VerifyEmailExceptionInterface $exception) {
            $this->addFlash('verify_email_error', $translator->trans($exception->getReason(), [], 'VerifyEmailBundle'));
            return $this->redirectToRoute('app_register');
        }

        $this->addFlash('success', 'Votre email a bien été vérifié. Vous pouvez vous connecter.');
        return $this->redirectToRoute('app_login');
    }
}
