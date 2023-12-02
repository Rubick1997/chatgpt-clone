import { ChatGptLogo } from "@/assets/images";
import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      <Image alt="logo" width={200} height={200} src={ChatGptLogo} />
      <button
        onClick={() => signIn("google")}
        className="text-white font-bold text-3xl animate-pulse"
      >
        Sign in to chat gpt
      </button>
    </div>
  );
}
export default Login;
