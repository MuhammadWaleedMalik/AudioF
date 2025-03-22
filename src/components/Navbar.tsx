import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX, FiChevronDown, FiGlobe } from 'react-icons/fi';
import Logo from '/images/AudioLabs_Logo.jpg';

const colors = {
  primary: "#062827",
  secondary: "#062827",
  text: "#FFFFFF",
};

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAIFeaturesOpen, setIsAIFeaturesOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Local state for auth
  const location = useLocation();

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  ];

  // Check for token in localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Set authenticated if token exists
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAIFeatures = () => setIsAIFeaturesOpen(!isAIFeaturesOpen);
  const toggleLanguageMenu = () => setIsLanguageMenuOpen(!isLanguageMenuOpen);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageMenuOpen(false);
  };

  // Logout function: remove token and reload
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.reload(); // Reload to reset app state
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-red/90 backdrop-blur-md' : 'bg-red'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-2">
            <img src={Logo} alt="Logo Image" className="w-12 h-12 object-contain" />
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-[32px] font-bold font-inkfree text-[black]">Audio Labs</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" style={{ color: "#dba20f" }} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('home')}
            </NavLink>
            <NavLink to="/pricing" style={{ color: "#dba20f" }} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('pricing')}
            </NavLink>
            <NavLink to="/blog" style={{ color: "#dba20f" }} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('blog')}
            </NavLink>

            <div className="relative">
              <button style={{ color: "#dba20f" }} className="nav-link flex items-center" onClick={toggleAIFeatures}>
                {t('aiFeatures')} <FiChevronDown className={`text-[black] ml-1 transition-transform ${isAIFeaturesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAIFeaturesOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black text-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <NavLink to="/ai-features/AudioToText" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      {t('Audio To Text')}
                    </NavLink>
                    <NavLink to="/ai-features/TextToAudio" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      {t('Text To Audio')}
                    </NavLink>
                    <NavLink to="/ai-features/AudioEnhancer" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      {t('Audio Enhancer')}
                    </NavLink>
                    <NavLink to="/ai-features/AudioGeneration" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      {t('Audio Generation')}
                    </NavLink>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button style={{ color: "#dba20f" }} className="nav-link flex items-center" onClick={toggleLanguageMenu}>
                <FiGlobe className="text-black mr-1" /> {languages.find(lang => lang.code === i18n.language)?.name || 'English'}
              </button>
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-white text-white ring-opacity-5 z-50 max-h-96 overflow-y-auto">
                  <div style={{ color: "white" }} className="py-1" role="menu" aria-orientation="vertical">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => changeLanguage(language.code)}
                        className={`w-full text-left block px-4 py-2 text-white text-sm hover:bg-gray-700 ${i18n.language === language.code ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
                      >
                        {language.nativeName} ({language.name})
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">
                  {localStorage.getItem('username') || 'User'} {/* Optional: Store username in localStorage */}
                </span>
                <button onClick={handleLogout} className="btn btn-secondary bg-[#7A9908] hover:bg-white hover:text-[#dba20f]">
                  {t('logout')}
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary bg-[#7A9908] hover:bg-white hover:text-[#dba20f]">
                  {t('login')}
                </Link>
                <Link to="/signup" className="btn btn-secondary bg-[#7A9908] hover:bg-white hover:text-[#dba20f]">
                  {t('signup')}
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-500">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              {t('home')}
            </NavLink>
            <NavLink to="/pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              {t('pricing')}
            </NavLink>
            <NavLink to="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              {t('blog')}
            </NavLink>

            <button
              className="flex w-full items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={toggleAIFeatures}
            >
              {t('aiFeatures')}
              <FiChevronDown className={`transition-transform ${isAIFeaturesOpen ? 'rotate-180' : ''}`} />
            </button>

            {isAIFeaturesOpen && (
              <div className="pl-4">
                <NavLink to="/ai-features/AudioToText" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                  {t('Audio To Text')}
                </NavLink>
                <NavLink to="/ai-features/TextToAudio" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                  {t('Text To Audio')}
                </NavLink>
                <NavLink to="/ai-features/AudioEnhancer" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                  {t('Audio Enhancer')}
                </NavLink>
                <NavLink to="/ai-features/AudioGeneration" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                  {t('Audio Generation')}
                </NavLink>
              </div>
            )}

            <button
              className="flex w-full items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={toggleLanguageMenu}
            >
              <div className="flex items-center">
                <FiGlobe className="mr-2" />
                {languages.find(lang => lang.code === i18n.language)?.name || 'English'}
              </div>
              <FiChevronDown className={`transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLanguageMenuOpen && (
              <div className="pl-4 max-h-60 overflow-y-auto">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => changeLanguage(language.code)}
                    className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium ${i18n.language === language.code ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                  >
                    {language.nativeName} ({language.name})
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 pb-3 border-t border-gray-700">
            {isAuthenticated ? (
              <div className="px-2 space-y-1">
                <div className="px-3 py-2 text-base font-medium text-gray-300">
                  {localStorage.getItem('username') || 'User'}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-black"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-1">
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium bg-[#7A9908] hover:bg-white hover:text-[#dba20f]">
                  {t('login')}
                </Link>
                <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium bg-[#7A9908] hover:bg-white hover:text-[#dba20f]">
                  {t('signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;