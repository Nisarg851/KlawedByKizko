import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import ArtistPage from './pages/ArtistPage';
// import BookingPage from './pages/BookingPage';
import InquiryPage from './pages/InquiryPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminGallery from './pages/admin/AdminGallery';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Admin routes */}
        <Route path="/admin" element={
          <PrivateRoute>
            <Layout isAdmin={true} />
          </PrivateRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="gallery" element={<AdminGallery />} />
        </Route>

        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="artist" element={<ArtistPage />} />
          {/* <Route path="booking" element={<BookingPage />} /> */}
          <Route path="inquiry" element={<InquiryPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;