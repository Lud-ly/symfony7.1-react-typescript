import * as React from 'react';
import SignInPage from '../pages/SignInPage';
import { SignInProps } from '../types/types';

export default function SignInController({ csrfToken, error }: SignInProps) {
  return (
    <SignInPage csrfToken={csrfToken} error={error} />
  );
}