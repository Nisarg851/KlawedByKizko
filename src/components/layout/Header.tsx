import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
// import ThemeToggle from './ThemeToggle';
import PrimaryLogo from "/logo-primary.svg";

interface HeaderProps {
  isAdmin?: boolean;
}

function Header({ isAdmin = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  // console.log("Is Admin:", isAdmin);

  const headerClasses = `fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background backdrop-blur max-sm:bg-transparent py-4`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to={isAdmin ? '/admin' : '/'} className="flex items-center gap-2">
          {/* <Sparkles className="text-primary-500 animate-sparkle" size={24} /> */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`font-serif text-2xl font-bold`}
          >
            {
            isAdmin || location.pathname=="/login"
              ? <span className="text-xl font-bold tracking-tight"><span className="text-accent">Kizko </span><span className="text-foreground">Admin</span></span>
              : <span className="text-xl font-bold tracking-tight">
                  <img src={PrimaryLogo} className='w-[8rem]'/>
                </span>
            }
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {isAdmin ? (
            <>
              <NavLink to="/admin" end className="nav-link text-foreground dark:text-white hover:text-primary-500 dark:hover:text-primary-400 font-medium">
                Dashboard
              </NavLink>
              <NavLink to="/admin/appointments" className="nav-link text-foreground dark:text-white hover:text-primary-500 dark:hover:text-primary-400 font-medium">
                Appointments
              </NavLink>
              <NavLink to="/admin/gallery" className="nav-link text-foreground dark:text-white hover:text-primary-500 dark:hover:text-primary-400 font-medium">
                Gallery
              </NavLink>
              {/* <ThemeToggle /> */}
              <button 
                onClick={handleLogout} 
                className="btn btn-outline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/" end className="nav-link text-foreground dark:text-white hover:text-primary-500 dark:hover:text-primary-400 font-medium">
                Home
              </NavLink>
              <NavLink to="/gallery" className="nav-link text-foreground dark:text-white hover:text-primary-500 dark:hover:text-primary-400 font-medium">
                Gallery
              </NavLink>
              <NavLink to="/artist" className="nav-link text-foreground dark:text-white hover:text-primary-500 dark:hover:text-primary-400 font-medium">
                About Kizko
              </NavLink>
              {/* <NavLink to="/booking" className="nav-link text-foreground dark:text-white hover:text-primary-500 dark:hover:text-primary-400 font-medium">
                Book Now
              </NavLink> */}
              <NavLink to="/inquiry" className="nav-link text-foreground dark:text-white hover:text-primary-500 dark:hover:text-primary-400 font-medium">
                Custom Design
              </NavLink>
              {/* <ThemeToggle /> */}
              {currentUser?.isAdmin && (
                <Link to="/admin" className="btn btn-primary">
                  Admin
                </Link>
              )}
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* <ThemeToggle /> */}
          <button 
            className="text-foreground dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg- shadow-md"
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {isAdmin ? (
              <>
                <NavLink to="/admin" end className="py-2 text-foreground dark:text-white hover:text-primary-500 dark:hover:text-primary-400 font-medium">
                  Dashboard
                </NavLink>
                <NavLink to="/admin/appointments" className="py-2 text-foreground dark:text-white hover:text-primary-500 dark:hover:text-primary-400 font-medium">
                  Appointments
                </NavLink>
                <NavLink to="/admin/gallery" className="py-2 text-foreground dark:text-white hover:text-primary-500 dark:hover:text-primary-400 font-medium">
                  Gallery
                </NavLink>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-outline mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/" end className="py-2 text-foreground dark:text-white hover:text-primary-500 dark:hover:text-primary-400 font-medium">
                  Home
                </NavLink>
                <NavLink to="/gallery" className="py-2 text-foreground dark:text-white hover:text-primary-500 dark:hover:text-primary-400 font-medium">
                  Gallery
                </NavLink>
                <NavLink to="/artist" className="py-2 text-foreground dark:text-white hover:text-primary-500 dark:hover:text-primary-400 font-medium">
                  About Kizko
                </NavLink>
                {/* <NavLink to="/booking" className="py-2 text-foreground dark:text-white hover:text-primary-500 dark:hover:text-primary-400 font-medium">
                  Book Now
                </NavLink> */}
                <NavLink to="/inquiry" className="py-2 text-foreground dark:text-white hover:text-primary-500 dark:hover:text-primary-400 font-medium">
                  Custom Design
                </NavLink>
                {currentUser?.isAdmin && (
                  <Link to="/admin" className="btn btn-primary mt-2">
                    Admin
                  </Link>
                )}
              </>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
}

export default Header;