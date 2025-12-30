import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';


import { Routing } from './routing';

const root = document.getElementById('root');

createRoot(root).render(
  <StrictMode>
    <Routing />
  </StrictMode>
);