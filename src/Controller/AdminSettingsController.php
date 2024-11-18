<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class AdminSettingsController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager) {}

    #[Route('/app/admin/settings', name: 'admin_settings')]
    #[IsGranted('ROLE_ADMIN')]
    public function index(Request $request): Response
    {
        
        // TODO: Formulaire pour modifier les rôles des utilisateurs
        $users = $this->entityManager->getRepository(User::class)->findAll();

        $userData = array_map(function ($user) {
            return [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles(),
            ];
        }, $users);


        return $this->render('admin/settings.html.twig', [
            'users' => $userData
        ]);
    }
}
