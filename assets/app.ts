import { registerReactControllerComponents } from '@symfony/ux-react';
import './bootstrap.js';
import './react/styles/app.css';

registerReactControllerComponents(require.context('./react/controllers', true, /\.(j|t)sx?$/));