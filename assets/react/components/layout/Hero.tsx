/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from './TwoSidedLayout';
import IconLinkButton from '../buttons/IconLinkButton';

export default function Hero() {
  return (
    <TwoSidedLayout>
      <Typography color="primary" sx={{ fontSize: 'lg', fontWeight: 'lg' }}>
        The power to React with Symfony
      </Typography>
      <Typography
        level="h1"
        sx={{
          fontWeight: 'xl',
          fontSize: 'clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)',
        }}
      >
        A large headlinerer about our product features & services
      </Typography>
      <Typography
        textColor="text.secondary"
        sx={{ fontSize: 'lg', lineHeight: 'lg' }}
      >
        A descriptive secondary text placeholder. Use it to explain your business
        offer better.
      </Typography>
      <Button size="sm" color='neutral' variant='outlined' endDecorator={<ArrowForward fontSize="large" />}>
        <IconLinkButton
          href="/app"
          label='Connexion' icon={''}        />
      </Button>
      <Typography>
        Pas de compte? <Link href="/register" sx={{ fontWeight: 'lg' }}>S'inscrire</Link>
      </Typography>
      <Typography
        level="body-xs"
        sx={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        INFO.DEVLM
      </Typography>
    </TwoSidedLayout>
  );
}