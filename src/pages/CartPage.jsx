import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export function CartPage() {
  const { items, total, remove, clear } = useCart()

  if (items.length === 0) {
    return (
      <div className="page-intro">
        <h1>Panier vide</h1>
        <p>
          Le panier vit dans un Context + useReducer. Ajoute un produit depuis le
          catalogue.
        </p>
        <Link className="btn-primary" to="/produits">
          Aller aux produits
        </Link>
      </div>
    )
  }

  return (
    <div className="stack-lg">
      <h1>Panier</h1>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-row">
            <img src={item.thumbnail} alt="" />
            <div>
              <strong>{item.title}</strong>
              <p className="muted">
                {item.quantity} × {item.price} €
              </p>
            </div>
            <button type="button" className="btn-ghost" onClick={() => remove(item.id)}>
              Retirer
            </button>
          </li>
        ))}
      </ul>
      <p className="price">Total : {total.toFixed(2)} €</p>
      <button type="button" onClick={clear}>
        Vider le panier
      </button>
    </div>
  )
}
