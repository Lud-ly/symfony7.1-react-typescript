import { registerReactControllerComponents } from '@symfony/ux-react';
import './bootstrap.js';
import './styles/app.css';

registerReactControllerComponents(require.context('./react/components', true, /\.(j|t)sx?$/));