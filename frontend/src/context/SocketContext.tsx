import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAppData } from "./AppContext";
import { realtimeService } from "../main";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useAppData(); //This is possible because socket is also inside appContext

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!isAuth) {
      socketRef.current?.disconnect();// if user is not authenticated then disconnect him from the socket
      socketRef.current = null;
      return;
    }

    if (socketRef.current) return;//if user already has socket then do nothing

    const socket = io(realtimeService, {//initializes the connection
      auth: {
        token: localStorage.getItem("token"),
      },
      transports: ["websocket"],// (upgrade) to skip the HTTP long-polling step completely and immediately try to establish a direct WebSocket 
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket Connected", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket Disconnected");
    });

    socket.on("connect_error", (err) => {
      console.log("Socket Error:", err.message);
    });
    //cleanup function (prevents memory leaks)
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isAuth]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
