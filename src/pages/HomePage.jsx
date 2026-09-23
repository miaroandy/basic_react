import { Link } from 'react-router-dom'
import { api } from '../api/client'
import { ProductCard, Spinner, ErrorBanner } from '../components/ui'
import { useCart } from '../context/CartContext'
import { useFetch } from '../hooks/useFetch'
import { lessons } from '../lessons/catalog'

export function HomePage() {
  const { add } = useCart()
  const { data, loading, error } = useFetch(() => api.getProducts({ limit: 4 }), [])

  return (
    <div className="stack-lg">
      <section className="hero">
        <p className="eyebrow">Atelier d’apprentissage</p>
        <h1>Apprendre React en consommant DummyJSON</h1>
        <p className="lede">
          Cette application n’est pas un tutoriel figé : chaque écran est un vrai
          composant React. Les leçons expliquent le concept, le catalogue, le panier
          et la connexion le mettent en pratique avec l’API DummyJSON.
        </p>
        <div className="row">
          <Link className="btn-primary" to="/lecons">
            Commencer les leçons
          </Link>
          <Link className="btn-ghost" to="/produits">
            Voir le catalogue
          </Link>
        </div>
      </section>

      <section>
        <h2>Ce que tu vas maîtriser</h2>
        <div className="concept-grid">
          {lessons.map((lesson) => (
            <Link key={lesson.slug} className="concept-chip" to={`/lecons/${lesson.slug}`}>
              <span>{lesson.level}</span>
              {lesson.title}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <h2>Aperçu DummyJSON</h2>
          <Link to="/produits">Tout le catalogue →</Link>
        </div>
        {loading && <Spinner />}
        {error && <ErrorBanner error={error} />}
        {data && (
          <div className="product-grid">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={add} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
