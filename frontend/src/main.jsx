import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './components/login/AuthContext.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleId = import.meta.env.VITE_GOOGLE_OAUTH_API_ID;-

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleId}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
