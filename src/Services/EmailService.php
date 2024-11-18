<?php

namespace App\Services;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mime\Address;

class EmailService
{

    public function __construct(private readonly MailerInterface $mailer){}

    public function sendEmail(string $to, string $subject, string $templateTwig,array $context): void
    {
        $email = (new TemplatedEmail())
        ->from(new Address('contact@devlm.fr', 'support-devlm'))
        ->to($to)
        ->subject($subject)
        ->htmlTemplate("mails/$templateTwig.html.twig")
        ->context($context);

        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $transportException) {
            throw $transportException;
        }
    }
}
