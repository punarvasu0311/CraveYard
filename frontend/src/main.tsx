import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider } from "./context/AppContext.tsx";

export const authService = "http://localhost:5001";
export const restaurantService = "http://localhost:5002";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <GoogleOAuthProvider clientId="599552265988-3u4lkshnjqoo3hqi5vjnn32m5h996146.apps.googleusercontent.com">
    <AppProvider> {/* User Context is added*/}
      <App />
    </AppProvider>
  </GoogleOAuthProvider>
  </StrictMode>
)
