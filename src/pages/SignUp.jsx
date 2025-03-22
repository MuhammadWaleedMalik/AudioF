import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import useRegister from "../hooks/useRegister";

const SignUp = () => {
  const { t } = useTranslation();
  const { signup } = useAuth();
  const { register, isloading } = useRegister();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [error, setError] = useState("");

  const primaryColor = "black";
  const secondaryColor = "#dba20f"; // Darker Yellow/Gold

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setError("");

    if (!email || !password) {
      setFormError("Please fill in all fields");
      return;
    }

    try {
      const response = await register(email, password);
      if (response !== undefined) {
        alert("Signed up successfully!");
        navigate("/login");
      } else {
        setFormError("Email already Exists Internal Error Occurred Try Again Later");
      }
    } catch (err) {
      setFormError(err.message || "Failed to create an account");
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full mt-48 bg-gray-300 flex flex-col justify-center px-20">
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold font-inkfree mb-10 uppercase"
        style={{ color: primaryColor }}
      >
        {t("signup")}
      </motion.h1>

      {(formError || error) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-red-500/50 text-white px-6 py-3 rounded-lg mb-6 text-lg"
        >
          {formError || error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Email */}
        <div className="flex flex-col">
          <label className="text-3xl font-semibold" style={{ color: secondaryColor }}>
            {t("emailAddress")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-2/3 p-4 border-b-2 border-gray-500 bg-transparent text-black text-xl focus:outline-none focus:border-yellow-400"
            required
            disabled={isloading}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-3xl font-semibold" style={{ color: secondaryColor }}>
            {t("password")}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-2/3 p-4 border-b-2 border-gray-500 bg-transparent text-black text-xl focus:outline-none focus:border-yellow-400"
            required
            disabled={isloading}
          />
        </div>

        {/* Sign Up Button (Aligned to Right) */}
        <motion.button
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          type="submit"
          disabled={isloading}
          className="mt-8 p-5 text-yellow-300 font-bold text-xl rounded-lg hover:opacity-80 transition-all duration-300 uppercase"
          style={{ backgroundColor: primaryColor, marginLeft: "auto", display: "block" }}
        >
          {isloading ? t("creatingAccount") : t("signup")}
        </motion.button>
      </form>

      {/* Already have an account? (Centered) */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="text-lg mt-10 text-center"
        style={{ color: primaryColor }}
      >
        {t("alreadyHaveAccount")}{" "}
        <Link
          to="/login"
          className="font-bold text-[34px] hover:underline"
          style={{ color: secondaryColor }}
        >
          {t("login")}
        </Link>
      </motion.p>
    </div>
  );
};

export default SignUp;