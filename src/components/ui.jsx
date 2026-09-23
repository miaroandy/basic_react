import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/lecons', label: 'Leçons' },
  { to: '/produits', label: 'Produits' },
  { to: '/recettes', label: 'Recettes' },
  { to: '/panier', label: 'Panier' },
]

export function Header() {
  const { count } = useCart()
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="site-header">
      <NavLink to="/" className="brand">
        <span className="brand-mark">R</span>
        React Atelier
      </NavLink>
      <nav className="nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {link.label}
            {link.to === '/panier' && count > 0 ? (
              <span className="cart-count">{count}</span>
            ) : null}
          </NavLink>
        ))}
        {isAuthenticated ? (
          <>
            <NavLink
              to="/profil"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {user.firstName}
            </NavLink>
            <button type="button" className="btn-ghost" onClick={logout}>
              Sortir
            </button>
          </>
        ) : (
          <NavLink to="/connexion" className="btn-primary nav-cta">
            Connexion
          </NavLink>
        )}
      </nav>
    </header>
  )
}

export function Layout({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="page">{children}</main>
      <footer className="site-footer">
        Données : DummyJSON · App d’apprentissage React
      </footer>
    </div>
  )
}

export function Spinner({ label = 'Chargement…' }) {
  return (
    <div className="spinner-wrap" role="status">
      <span className="spinner" />
      {label}
    </div>
  )
}

export function ErrorBanner({ error, onRetry }) {
  return (
    <div className="error-banner" role="alert">
      <p>{error?.message ?? 'Une erreur est survenue.'}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry}>
          Réessayer
        </button>
      ) : null}
    </div>
  )
}

export function ProductCard({ product, onAdd }) {
  return (
    <article className="card product-card">
      <NavLink to={`/produits/${product.id}`} className="card-media">
        <img src={product.thumbnail} alt="" />
      </NavLink>
      <div className="card-body">
        <p className="eyebrow">{product.category}</p>
        <h3>
          <NavLink to={`/produits/${product.id}`}>{product.title}</NavLink>
        </h3>
        <p className="price">{product.price} €</p>
        {onAdd ? (
          <button type="button" className="btn-primary" onClick={() => onAdd(product)}>
            Ajouter au panier
          </button>
        ) : null}
      </div>
    </article>
  )
}
