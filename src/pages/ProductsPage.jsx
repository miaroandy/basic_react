import { useMemo, useState } from 'react'
import { api } from '../api/client'
import { ErrorBanner, ProductCard, Spinner } from '../components/ui'
import { useCart } from '../context/CartContext'
import { useDebounce } from '../hooks/useDebounce'
import { useFetch } from '../hooks/useFetch'

const PAGE_SIZE = 8

export function ProductsPage() {
  const { add } = useCart()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [created, setCreated] = useState(null)
  const [newProduct, setNewProduct] = useState({ title: '', price: '' })
  const debouncedQuery = useDebounce(query)

  const skip = (page - 1) * PAGE_SIZE

  const { data: categories } = useFetch(() => api.getCategories(), [])

  const { data, loading, error } = useFetch(
    () =>
      api.getProducts({
        limit: PAGE_SIZE,
        skip,
        q: debouncedQuery,
        category,
      }),
    [debouncedQuery, category, skip],
  )

  const totalPages = useMemo(() => {
    if (!data?.total) return 1
    return Math.max(1, Math.ceil(data.total / PAGE_SIZE))
  }, [data])

  async function handleCreate(e) {
    e.preventDefault()
    try {
      const result = await api.addProduct({
        title: newProduct.title,
        price: Number(newProduct.price) || 0,
      })
      setCreated(result)
    } catch (err) {
      setCreated({ id: 'erreur', title: err.message })
    }
  }

  function handleQuery(value) {
    setQuery(value)
    setCategory('')
    setPage(1)
  }

  function handleCategory(value) {
    setCategory(value)
    setQuery('')
    setPage(1)
  }

  return (
    <div className="stack-lg">
      <header className="page-intro">
        <p className="eyebrow">Catalogue</p>
        <h1>Produits DummyJSON</h1>
        <p>
          Recherche (debounce), filtre par catégorie, pagination, états loading /
          erreur, listes + keys, et Context panier.
        </p>
      </header>

      <div className="filters">
        <input
          value={query}
          onChange={(e) => handleQuery(e.target.value)}
          placeholder="Rechercher un produit…"
          aria-label="Recherche produits"
        />
        <select
          value={category}
          onChange={(e) => handleCategory(e.target.value)}
          aria-label="Catégorie"
        >
          <option value="">Toutes les catégories</option>
          {(categories ?? []).map((item) => {
            const slug = typeof item === 'string' ? item : item.slug
            const name = typeof item === 'string' ? item : item.name
            return (
              <option key={slug} value={slug}>
                {name}
              </option>
            )
          })}
        </select>
      </div>

      {loading && <Spinner />}
      {error && <ErrorBanner error={error} />}
      {data && data.products.length === 0 && <p>Aucun produit.</p>}
      <form className="card auth-card" onSubmit={handleCreate}>
        <h2>POST /products/add</h2>
        <p className="muted">DummyJSON simule la création : tu reçois un id, rien n’est vraiment sauvé.</p>
        <label>
          Titre
          <input
            value={newProduct.title}
            onChange={(e) => setNewProduct((p) => ({ ...p, title: e.target.value }))}
            required
          />
        </label>
        <label>
          Prix
          <input
            value={newProduct.price}
            onChange={(e) => setNewProduct((p) => ({ ...p, price: e.target.value }))}
            required
          />
        </label>
        <button type="submit" className="btn-primary">
          Créer (simulé)
        </button>
        {created && (
          <p className="ok">
            Réponse API : #{created.id} — {created.title}
          </p>
        )}
      </form>

      {data && data.products.length > 0 && (
        <>
          <p className="muted">
            {data.total} résultat(s) · page {page}/{totalPages}
          </p>
          <div className="product-grid">
            { data.products.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={add} />
            ))}
          </div>
          <div className="row">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Précédent
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  )
}
