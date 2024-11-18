import * as React from 'react';
import ProfilePage from '../pages/ProfilePage';

export default function ProfileController({ username }: any) {
  return (
    <ProfilePage username={username} />
  );
}