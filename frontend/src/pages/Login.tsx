import axios from "axios";
import { useState } from "react";

import { authService } from "../main";
import toast from "react-hot-toast";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { useAppData } from "../context/AppContext";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const { setIsAuth, setUser } = useAppData();

  const responseGoogle = async (authResult: any) => {
    setLoading(true);
    try {
      const result = await axios.post(`${authService}/api/auth/login`, {
        code: authResult["code"],
      });
      
      localStorage.setItem("token", result.data.token);
      setIsAuth(true);//so the react rerenders automatically
      setUser(result.data.user);
      toast.success(result.data.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Problem while login");
      setLoading(false);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle, //when you click allow
    onError: responseGoogle, //when you click deny
    flow: "auth-code", //it tells that code is authoritative code form authoritative server
  });
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-3xl font-bold text-[#E23774]">
          CraveYard
        </h1>

        <p className="text-center text-sm text-gray-500">
          Log in or sign up to continue
        </p>

        <button
          onClick={googleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3"
        >
          <FcGoogle size={20} />
          {loading ? "Signing in ..." : "Continue with Google"}
        </button>

        <p className="text-center text-xs text-gray-400">
          By continuing, you agree with our{" "}
          <span className="text-[#E23774]">Terms of Service</span> &{" "}
          <span className="text-[#E23774]">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};


export default Login;