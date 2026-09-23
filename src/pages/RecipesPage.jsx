import { api } from '../api/client'
import { ErrorBanner, Spinner } from '../components/ui'
import { useFetch } from '../hooks/useFetch'

export function RecipesPage() {
  const { data, loading, error } = useFetch(() => api.getRecipes({ limit: 9 }), [])

  return (
    <div className="stack-lg">
      <header className="page-intro">
        <p className="eyebrow">Deuxième ressource API</p>
        <h1>Recettes</h1>
        <p>
          Même schéma que les produits : useFetch, listes, rendu conditionnel.
          DummyJSON expose aussi /recipes.
        </p>
      </header>
      {loading && <Spinner />}
      {error && <ErrorBanner error={error} />}
      {data && (
        <div className="product-grid">
          {data.recipes.map((recipe) => (
            <article key={recipe.id} className="card">
              <div className="card-media">
                <img src={recipe.image} alt="" />
              </div>
              <div className="card-body">
                <p className="eyebrow">{recipe.cuisine}</p>
                <h3>{recipe.name}</h3>
                <p className="muted">
                  {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min · {recipe.difficulty}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
