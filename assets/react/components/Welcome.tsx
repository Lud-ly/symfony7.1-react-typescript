import React, { FC } from 'react';
import { Container } from '@mui/material';

interface WelcomeProps {
  message: string;
}

const Welcome: FC<WelcomeProps> = ({ message }) => {
  return (
    <Container>
      <p>{message}</p>
    </Container>
  );
};

export default Welcome;
