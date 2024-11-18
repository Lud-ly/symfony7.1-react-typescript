import * as React from 'react';
import MainPage from '../pages/MainPage';

export default function MainController({ username }: any) {
  return (
    <MainPage username={username} />
  );
}