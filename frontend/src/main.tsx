import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider } from "./context/AppContext.tsx";
import "leaflet/dist/leaflet.css";
import { SocketProvider } from './context/SocketContext.tsx';

export const authService = "http://localhost:5001";
export const restaurantService = "http://localhost:5002";
export const utilsService = "http://localhost:5003";
export const riderService = "http://localhost:5004";
export const realtimeService = "http://localhost:5005";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <GoogleOAuthProvider clientId="599552265988-3u4lkshnjqoo3hqi5vjnn32m5h996146.apps.googleusercontent.com">
    <AppProvider> {/* User Context is added*/}
      <SocketProvider>
        <App />
        </SocketProvider>
    </AppProvider>
  </GoogleOAuthProvider>
  </StrictMode>
)
