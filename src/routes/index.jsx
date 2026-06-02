import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import SplashScreen from '../components/layout/SplashScreen';
import Loading from '../components/ui/Loading';
import { getStorage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants';

const HomePage = lazy(() => import('../pages/HomePage'));
const CategoriesPage = lazy(() => import('../pages/CategoriesPage'));
const CategoryProductsPage = lazy(() => import('../pages/CategoryProductsPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const OrdersPage = lazy(() => import('../pages/OrdersPage'));
const OrderTrackingPage = lazy(() => import('../pages/OrderTrackingPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const EditProfilePage = lazy(() => import('../pages/EditProfilePage'));
const AddressesPage = lazy(() => import('../pages/AddressesPage'));
const WishlistPage = lazy(() => import('../pages/WishlistPage'));
const NotificationsPage = lazy(() => import('../pages/NotificationsPage'));
const OffersPage = lazy(() => import('../pages/OffersPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const FAQPage = lazy(() => import('../pages/FAQPage'));

function PageLoader({ children }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}

function SplashGate() {
  const seen = getStorage(STORAGE_KEYS.SPLASH_SEEN, false);
  if (!seen) return <SplashScreen />;
  return <Navigate to="/" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/splash" element={<SplashGate />} />

      <Route element={<AppLayout />}>
        <Route
          index
          element={
            <PageLoader>
              <HomePage />
            </PageLoader>
          }
        />
        <Route
          path="categories"
          element={
            <PageLoader>
              <CategoriesPage />
            </PageLoader>
          }
        />
        <Route
          path="categories/:slug"
          element={
            <PageLoader>
              <CategoryProductsPage />
            </PageLoader>
          }
        />
        <Route
          path="product/:id"
          element={
            <PageLoader>
              <ProductDetailPage />
            </PageLoader>
          }
        />
        <Route
          path="search"
          element={
            <PageLoader>
              <SearchPage />
            </PageLoader>
          }
        />
        <Route
          path="cart"
          element={
            <PageLoader>
              <CartPage />
            </PageLoader>
          }
        />
        <Route
          path="checkout"
          element={
            <PageLoader>
              <CheckoutPage />
            </PageLoader>
          }
        />
        <Route
          path="orders"
          element={
            <PageLoader>
              <OrdersPage />
            </PageLoader>
          }
        />
        <Route
          path="orders/:orderId/track"
          element={
            <PageLoader>
              <OrderTrackingPage />
            </PageLoader>
          }
        />
        <Route
          path="offers"
          element={
            <PageLoader>
              <OffersPage />
            </PageLoader>
          }
        />
        <Route
          path="profile"
          element={
            <PageLoader>
              <ProfilePage />
            </PageLoader>
          }
        />
        <Route
          path="profile/login"
          element={
            <PageLoader>
              <LoginPage />
            </PageLoader>
          }
        />
        <Route
          path="profile/edit"
          element={
            <PageLoader>
              <EditProfilePage />
            </PageLoader>
          }
        />
        <Route
          path="profile/addresses"
          element={
            <PageLoader>
              <AddressesPage />
            </PageLoader>
          }
        />
        <Route
          path="wishlist"
          element={
            <PageLoader>
              <WishlistPage />
            </PageLoader>
          }
        />
        <Route
          path="notifications"
          element={
            <PageLoader>
              <NotificationsPage />
            </PageLoader>
          }
        />
        <Route
          path="about"
          element={
            <PageLoader>
              <AboutPage />
            </PageLoader>
          }
        />
        <Route
          path="contact"
          element={
            <PageLoader>
              <ContactPage />
            </PageLoader>
          }
        />
        <Route
          path="faq"
          element={
            <PageLoader>
              <FAQPage />
            </PageLoader>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
