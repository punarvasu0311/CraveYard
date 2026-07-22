import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider } from "./context/AppContext.tsx";
import "leaflet/dist/leaflet.css";
import { SocketProvider } from './context/SocketContext.tsx';

export const authService = "https://craveyard-authv12.onrender.com";
export const restaurantService = "https://craveyard-restaurantv12.onrender.com";
export const utilsService = "https://craveyard-utilsv12.onrender.com";
export const riderService = "https://craveyard-riderv12.onrender.com";
export const realtimeService = "https://craveyard-realtimev12.onrender.com";
export const adminService = "https://craveyard-adminv12.onrender.com";

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
