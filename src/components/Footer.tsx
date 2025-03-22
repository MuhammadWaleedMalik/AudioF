import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Footer = () => {
  const { t } = useTranslation();
  
  const colors = {
    primary: "yellow",
    text: "white",
    highlight: "#0051D4",
    border: "#003A91",
  };

  return (
    <footer className="pt-16 pb-10 w-full bg-gray-900 text-white">
      <div className="w-full px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row justify-between items-start">
        
        {/* Left Side - Website Name & Slogan */}
        <div className="w-full md:w-1/3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/"
              className="text-5xl font-extrabold tracking-wide"
              style={{ color: colors.primary }}
            >
              {t("Audio Labs")}
            </Link>
          </motion.div>
          <motion.p
            whileHover={{ x: 5, opacity: 0.8 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mt-2 text-lg text-gray-300 italic"
          >
            {t("Mix and Fix, Lyrical Kicks")}
          </motion.p>
        </div>

        {/* Right Side - Links */}
        <div className="w-full md:w-2/3 flex justify-between gap-12 mt-10 md:mt-0">
          {/* Company Section */}
          <div className="text-left">
            <motion.h3
              whileHover={{ scale: 1.1, color: colors.primary }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-2xl font-semibold mb-3"
            >
              {t("Company")}
            </motion.h3>
            <ul className="space-y-2 text-lg">
              <motion.li
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link
                  to="/aboutus"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("About Us")}
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("Blogs")}
                </Link>
              </motion.li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="text-left">
            <motion.h3
              whileHover={{ scale: 1.1, color: colors.primary }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-2xl font-semibold mb-3"
            >
              {t("Legal")}
            </motion.h3>
            <ul className="space-y-2 text-lg">
              <motion.li
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("Terms")}
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("Privacy")}
                </Link>
              </motion.li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center">
        <p className="text-gray-400 text-lg">
          &copy; {new Date().getFullYear()} {t("Audio Labs. All rights reserved.")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
