import { Link, useParams } from 'react-router-dom'
import { api } from '../api/client'
import { ErrorBanner, Spinner } from '../components/ui'
import { useCart } from '../context/CartContext'
import { useFetch } from '../hooks/useFetch'

export function ProductDetailPage() {
  const { id } = useParams();
  const { add } = useCart()
  const { data: product, loading, error } = useFetch(() => api.getProduct(id), [id])

  if (loading) return <Spinner />
  if (error) return <ErrorBanner error={error} />
  if (!product) return null

  return (
    <article className="detail">
      <Link to="/produits" className="back">
        ← Catalogue
      </Link>
      <div className="detail-grid">
        <img src={product.images?.[0] ?? product.thumbnail} alt={product.title} />
        <div>
          <p className="eyebrow">{product.brand} · {product.category}</p>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p className="price">{product.price} €</p>
          <p className="muted">Note {product.rating} · stock {product.stock}</p>
          <button type="button" className="btn-primary" onClick={() => add(product)}>
            Ajouter au panier
          </button>
        </div>
      </div>
    </article>
  )
}
