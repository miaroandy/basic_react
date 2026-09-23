import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/ui'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { CartPage } from './pages/CartPage'
import { HomePage } from './pages/HomePage'
import { LessonDetailPage, LessonsPage } from './pages/LessonsPage'
import { LoginPage } from './pages/LoginPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { ProductsPage } from './pages/ProductsPage'
import { ProfilePage } from './pages/ProfilePage'
import { RecipesPage } from './pages/RecipesPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lecons" element={<LessonsPage />} />
              <Route path="/lecons/:slug" element={<LessonDetailPage />} />
              <Route path="/produits" element={<ProductsPage />} />
              <Route path="/produits/:id" element={<ProductDetailPage />} />
              <Route path="/recettes" element={<RecipesPage />} />
              <Route path="/panier" element={<CartPage />} />
              <Route path="/connexion" element={<LoginPage />} />
              <Route
                path="/profil"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
