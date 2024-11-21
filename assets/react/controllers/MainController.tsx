import * as React from 'react';
import MainPage from '../pages/MainPage';
import { MainPageProps } from '../types/types';

export default function MainController({ username, title }: MainPageProps) {
  return (
    <MainPage 
      username={username} 
      title={title} 
      />
  );
}