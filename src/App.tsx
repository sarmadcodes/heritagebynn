import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation,  } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { ModalProvider } from './contexts/ModalContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ModalContainer } from './components/ModalContainer'; 
import { ReturnsModal } from './components/modals/ReturnsModal';
import { SizeGuideModal } from './components/modals/SizeGuideModal';
import { ShippingInfoModal } from './components/modals/ShippingInfoModal';
import { CareInstructionsModal } from './components/modals/CareInstructionsModal';
import AdminDashboard from './pages/AdminDashboard';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import AdminLogin from './pages/AdminLogin';

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
  // TODO: Remove bypass (return children) after testing login
  return token ? children : children; // Bypass for testing, change to <Navigate to="/admin/login" /> after
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
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Footer-linked Modals/Pages */}
                <Route path="/returns" element={<ReturnsModal />} />
                <Route path="/size-guide" element={<SizeGuideModal />} />
                <Route path="/shipping" element={<ShippingInfoModal />} />
                <Route path="/care" element={<CareInstructionsModal />} />
                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
                <Route path="/admin/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
                <Route path="/admin/login" element={<AdminLogin />} />
              </Routes>
            </main>
            <Footer />
            <ModalContainer />
          </div>
        </Router>
      </ModalProvider>
    </AppProvider>
  );
}

export default App;
