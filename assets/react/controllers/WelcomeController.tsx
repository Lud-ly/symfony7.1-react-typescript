import * as React from 'react';
import WelcomePage from '../pages/WelcomePage';

export default function WelcomeController({ WelcomeProps }: any) {
  return (
    <WelcomePage {...WelcomeProps} />
  );
}