<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Http\Authorization\AccessDeniedHandlerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class VerificationAccessDeniedHandler extends AbstractController implements AccessDeniedHandlerInterface
{
    public function __construct(
        private UrlGeneratorInterface $urlGenerator,
        private Security $security
    ) {}

    public function handle(Request $request, AccessDeniedException $accessDeniedException): ?Response
    {
        $user = $this->security->getUser();
        
        if ($user && !in_array('ROLE_VERIFIED', $user->getRoles())) {
            $this->addFlash(
                'warning',
                'Veuillez confirmer votre adresse email pour accéder à cette page. Un email de confirmation vous a été envoyé. Après confirmation, veuillez vous reconnecter.'
            );
            
            return new RedirectResponse($this->urlGenerator->generate('verification_needed'));
        }

        return new RedirectResponse($this->urlGenerator->generate('access_denied'));
    }
}