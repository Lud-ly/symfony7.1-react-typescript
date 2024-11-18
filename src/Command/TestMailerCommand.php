<?php

// src/Command/TestMailerCommand.php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class TestMailerCommand extends Command
{
    public function __construct(private MailerInterface $mailer)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->setName('app:test-mailer');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $email = (new Email())
            ->from('contact@devlm.fr')
            ->to('ludom82@gmail.com')
            ->subject('Test email')
            ->text('Test email content');

        try {
            $this->mailer->send($email);
            $output->writeln('Email envoyé avec succès');
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $output->writeln('Erreur : ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}