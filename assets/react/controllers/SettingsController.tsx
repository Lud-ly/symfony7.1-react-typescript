import * as React from 'react';
import SettingsPage from '../pages/SettingsPage';

export default function SettingsController({ users, username }) {
  return (
    <SettingsPage users={users} username={username} />
  );
}