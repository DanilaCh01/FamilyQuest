import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
//import { App } from './app';

import { Routing } from './routing/routing.component';

const root = document.getElementById('root');

createRoot(root).render(
  <StrictMode>
    <Routing />
  </StrictMode>
);