import { ColorPaletteProp } from '@mui/joy';

export interface LmIconButtonProps {
    href: string;
    icon?: React.ReactNode;
    txtSize?: string;  // Peut être 'sm', 'lg', 'xl', 'xxl', ou une taille personnalisée en pixels
    iconSize?: string;  // idem
    label?: string;
    iconColor?: string;
    txtColor?: ColorPaletteProp | 'inherit';
    bgColor?: string;
    onClick?: () => void;
  }

  export interface SignInProps {
    csrfToken: string;
    error: string | null;
  }
  
  export interface MainPageProps {
    username: string;
    title: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

export interface SettingsPageProps {
  users: User[];
  username: string;
}