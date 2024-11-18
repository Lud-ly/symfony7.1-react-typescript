## Author

- [@ludovicmouly](https://www.github.com/Lud-ly)


# Symfony 7.1, TypeScript, and React Setup

This project demonstrates how to set up a Symfony application with React and TypeScript, using Webpack Encore for asset management.

## Prerequisites

Make sure you have the following software installed:

- **PHP** (8.1 or later) - Symfony is a PHP framework
- **Composer** - PHP dependency manager
- **Node.js** (14.x or later) - JavaScript runtime for React and Webpack
- **npm** (or **yarn**) - Node.js package manager
- **Symfony CLI** (optional but recommended)

## Check Requirements
```bash
symfony check:requirements
```

# 1. Create a New Symfony Project

```bash
symfony new my_project --version="7.1.*" --webapp

cd my_project
```

## 2. Install Webpack Encore
```bash
composer require symfony/webpack-encore-bundle

npm install --save-dev @symfony/webpack-encore

npm run dev
npm run build
```
### 3. Install React
```bash
npm install react react-dom

npm install --save-dev @symfony/ux-react
```

### 4. Install React Typescript
```bash
npm install --save-dev typescript @types/react @types/react-dom
```

### 5. Create tsconfig.json
### 6. Update the webpack.config.js
### 7. Create the assets/app.ts

```bash
import { registerReactControllerComponents } from '@symfony/ux-react';
import './bootstrap.js';
import './styles/app.css';

registerReactControllerComponents(require.context('./react/components', true, /\.(j|t)sx?$/));
```

### 8. In react folder create a react component.tsx
```	bash
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
```
```bash
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';

export default function BottomNav() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: 'antiquewhite',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Connexion" icon={<LoginIcon />} />
      </BottomNavigation>
    </Box>
  );
}
```

### 9. In base.html.twig call components
```	bash
<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title>{% block title %}Welcome!{% endblock %}</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 128 128%22><text y=%221.2em%22 font-size=%2296%22>⚫️</text></svg>">
        {% block stylesheets %}
            {{ encore_entry_link_tags('app') }}
        {% endblock %}

        {% block javascripts %}
            {{ encore_entry_script_tags('app') }}
        {% endblock %}
    </head>
    <body>
        {% block body %}{% endblock %}
        <div {{ react_component('BottomNav') }}></div>
    </body>
</html>
```

### 10.For example : Create a controller
```	bash
symfony console make:controller MainController
```

### 11. In main/index.html.twig call component react
```bash
{% extends 'base.html.twig' %}

{% block title %}Symfony React{% endblock %}

{% block body %}
    <div {{ react_component('Welcome', {'message': 'Hello, Symfony with React!'}) }}></div>
{% endblock %}
```

### 12. Check assets/bootstrap.js
```bash
import { startStimulusApp } from '@symfony/stimulus-bridge';

// Registers Stimulus controllers from controllers.json and in the controllers/ directory
export const app = startStimulusApp(require.context(
    '@symfony/stimulus-bridge/lazy-controller-loader!./controllers',
    true,
    /\.[jt]sx?$/
));
// register any custom, 3rd party controllers here
// app.register('some_controller_name', SomeImportedController);
```
### 13. Check assets/controllers.json
```bash
{
    "controllers": {
        "@symfony/ux-react": {
            "react": {
                "enabled": true,
                "fetch": "eager"
            }
        },
        "@symfony/ux-turbo": {
            "turbo-core": {
                "enabled": true,
                "fetch": "eager"
            },
            "mercure-turbo-stream": {
                "enabled": false,
                "fetch": "eager"
            }
        }
    },
    "entrypoints": []
}
```

# Command for user creation

- Created a Symfony Console command to create users with email and password.
- Passwords are hashed, and users are assigned the `ROLE_ADMIN` role by default if command used.
- Usage: 

```bash
php bin/console app:create-user <username> <password>
```