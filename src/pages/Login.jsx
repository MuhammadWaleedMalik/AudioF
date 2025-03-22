import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase"; // Assuming firebase is set up similarly
import useGoogle from "../hooks/useGoogle";
import useLogin from "../hooks/useLogin";

const primaryColor = "#fde047"; // Yellow
const textColor = "#ffffff"; // White
const secondaryColor = "#dba20f"; // Darker Yellow/Gold

const Login = () => {
  const { t } = useTranslation();
  const { loginWithGoogle } = useAuth();
  const { login } = useLogin();
  const { authenticateWithGoogle } = useGoogle();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;
      const response = await authenticateWithGoogle(displayName, email);
      alert("Signed in with Google successfully!");
      localStorage.setItem("credits", response.user.credits);
      localStorage.setItem("token", response.token);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Google login failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    try {
      if (email === "admin@newtonai.net" && password === "@Abc123456") {
        localStorage.setItem("Admin", "Done");
        navigate("/admin");
      } else {
        const response = await login(email, password);
        if (response !== undefined) {
          localStorage.removeItem("credits");
          localStorage.removeItem("token");
          localStorage.setItem("credits", response.user.credits);
          localStorage.setItem("token", response.token);
          alert("Logged in successfully!");
          navigate("/");
        } else {
          setError("Internal Error Occurred Try Again Later");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-300 flex flex-col justify-center px-20">
      {/* Heading on Left */}
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold font-inkfree mb-10 uppercase"
        style={{ color: "black" }}
      >
        {t("login")}
      </motion.h1>

      {/* Google Login Button (Centered & Wider) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex justify-center w-full"
      >
        <button
          onClick={handleGoogleLogin}
          className="p-5 flex items-center justify-center font-bold text-xl rounded-lg hover:opacity-80 transition-all duration-300 uppercase"
          style={{
            backgroundColor: primaryColor,
            color: textColor,
            width: "50%", // Much wider button
          }}
        >
          <FcGoogle className="h-7 w-7 mr-3" />
          {t("continueWithGoogle")}
        </button>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="my-4 text-center text-black"
      >
        OR
      </motion.div>

      {/* Email Login Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="flex flex-col items-center w-full space-y-4"
      >
        <input
          type="email"
          className="w-50% p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ backgroundColor: "#ffffff", color: "black" }}
        />
        <input
          type="password"
          className="w-50% p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ backgroundColor: "#ffffff", color: "black" }}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm"
          >
            {error}
          </motion.p>
        )}
        <button
          type="submit"
          className="p-4 font-bold text-xl rounded-lg hover:opacity-80 transition-all duration-300 uppercase"
          style={{
            backgroundColor: primaryColor,
            color: textColor,
            width: "50%",
          }}
        >
          Login
        </button>
      </motion.form>

      {/* "Don't have an account?" (Centered) */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="text-lg mt-10 text-center"
        style={{ color: primaryColor }}
      >
        {t("dontHaveAccount")}{" "}
        <Link
          to="/signup"
          className="font-bold hover:underline"
          style={{ color: secondaryColor }}
        >
          {t("signup")}
        </Link>
      </motion.p>
    </div>
  );
};

export default Login;