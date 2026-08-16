import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { store } from './App/store';
import { Provider } from 'react-redux';
import { UserProvider } from './Context/UserProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <Provider store={store}>
      <UserProvider>
      <App />
      </UserProvider>
    </Provider>
    
  </StrictMode>,
);
