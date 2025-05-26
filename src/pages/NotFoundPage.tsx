import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <h1 className="font-serif text-6xl text-secondary-900 mb-4">404</h1>
        <h2 className="font-serif text-2xl text-secondary-800 mb-6">Page Not Found</h2>
        <p className="text-neutral-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary inline-flex items-center">
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;