import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const provider = new GoogleAuthProvider();

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
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
  className="min-h-screen w-screen text-white flex flex-col items-center justify-center px-4 py-10 overflow-x-hidden bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/image1.png')",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    backgroundBlendMode: "overlay",
  }}
>
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold mb-10 leading-snug ">
        Create your <span className="text-blue-400">TaskMaster</span> account
        <br />
        <span className="text-sm md:text-base font-normal text-gray-500">
          Sign up to manage your tasks efficiently
        </span>
      </h1>

      <div className="bg-black backdrop-blur-lg p-8 rounded-2xl w-full max-w-md text-white hover:shadow-xl shadow-blue-500 shadow-xl/50">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-100">
          Sign Up to TaskMaster
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border text-white border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border text-white border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
  type="submit"
  className="w-full bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition"
>
  Sign Up
</button>
        </form>

        <div className="my-4 text-center text-gray-200">or</div>

         <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          <FcGoogle size={20} />
          Sign up with Google
        </button>


        <p className="mt-4 text-sm text-center text-gray-100">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
