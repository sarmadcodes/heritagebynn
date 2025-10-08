import { useEffect } from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
=======
import { BrowserRouter as Router, Routes, Route, useLocation,  } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
import { ModalProvider } from './contexts/ModalContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
<<<<<<< HEAD
import ProductPage from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ModalContainer } from './components/ModalContainer';
=======
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ModalContainer } from './components/ModalContainer'; 
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
import { ReturnsModal } from './components/modals/ReturnsModal';
import { SizeGuideModal } from './components/modals/SizeGuideModal';
import { ShippingInfoModal } from './components/modals/ShippingInfoModal';
import { CareInstructionsModal } from './components/modals/CareInstructionsModal';
import AdminDashboard from './pages/AdminDashboard';
<<<<<<< HEAD
import { ManageOrdersPage } from './pages/ManageOrdersPage';
import ManageProductsPage from './pages/ManageProductsPage';
import { AdminLogin } from './pages/AdminLogin';
=======
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import AdminLogin from './pages/AdminLogin';
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972

// ScrollToTop component to handle scroll behavior on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// ProtectedRoute component to secure admin routes
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token');
<<<<<<< HEAD
  return token ? children : <Navigate to="/admin/login" replace />;
}

// Notification component
function Notification() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { notification } = state;

  useEffect(() => {
    if (notification?.show) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 3000); // Notification disappears after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification?.show) return null;

  return (
    <div 
      className="fixed bottom-4 right-4 max-w-sm bg-white border-l-4 border-[#3E0309] p-4 rounded-lg shadow-lg z-50 animate-slide-in"
    >
      <div className="flex items-center justify-between">
        <p className="font-serif text-sm" style={{ color: '#3E0309' }}>{notification.message}</p>
        {notification.action && (
          <button
            onClick={() => {
              dispatch({ type: 'HIDE_NOTIFICATION' });
              navigate('/cart');
            }}
            className="ml-4 text-sm font-semibold underline transition-colors hover:text-[#5A0711]"
            style={{ color: '#3E0309' }}
          >
            {notification.action.label}
          </button>
        )}
      </div>
    </div>
  );
=======
  // TODO: Remove bypass (return children) after testing login
  return token ? children : children; // Bypass for testing, change to <Navigate to="/admin/login" /> after
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
}

function App() {
  useEffect(() => {
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Update document title
    document.title = 'HeritageByNN';
  }, []);

  return (
    <AppProvider>
      <ModalProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-white">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
<<<<<<< HEAD
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
=======
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Footer-linked Modals/Pages */}
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
                <Route path="/returns" element={<ReturnsModal />} />
                <Route path="/size-guide" element={<SizeGuideModal />} />
                <Route path="/shipping" element={<ShippingInfoModal />} />
                <Route path="/care" element={<CareInstructionsModal />} />
<<<<<<< HEAD
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/orders" element={<ProtectedRoute><ManageOrdersPage /></ProtectedRoute>} />
                <Route path="/admin/products" element={<ProtectedRoute><ManageProductsPage /></ProtectedRoute>} />
=======
                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
                <Route path="/admin/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
                <Route path="/admin/login" element={<AdminLogin />} />
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
              </Routes>
            </main>
            <Footer />
            <ModalContainer />
<<<<<<< HEAD
            <Notification />
=======
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
          </div>
        </Router>
      </ModalProvider>
    </AppProvider>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
