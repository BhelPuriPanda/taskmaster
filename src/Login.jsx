import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const provider = new GoogleAuthProvider();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
  className=" bg-[url('/image1.png')] min-h-screen w-screen text-white flex flex-col items-center justify-center px-4 py-10 overflow-x-hidden bg-cover bg-center bg-no-repeat"
  style={{
    
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backgroundBlendMode: "overlay",
  }}
>
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold mb-10 leading-snug">
        Welcome Back to <span className="text-blue-400">TaskMaster</span>
        <br />
        <span className="text-sm md:text-base font-normal text-gray-500">
          Enter your credentials to get back to work
        </span>
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-black hover:shadow-xl shadow-blue-500 shadow-xl/50">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login to TaskMaster
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-gray-900 font-medium text-white py-2 rounded-lg hover:bg-gray-950 transition"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">or</div>

        <button
  onClick={handleGoogleLogin}
  className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-medium py-2 rounded-lg border border-gray-300 hover:bg-gray-950 transition"
>
  <FcGoogle size={20} />
  Sign in with Google
</button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
