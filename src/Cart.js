import React from 'react';
import PropTypes from 'prop-types';


export default function Cart({
  open,
  setOpen,
  currencies,
  setCurrency,
  requery,
  currency,
  product,
  randomKey
  }) {
  const reQuery = (val) => {
    setCurrency(val)
    requery()
  }
  const [cartItems, setItems] = React.useState([]);


  function addToCart() {
    console.log('product');

    const existing = cartItems.findIndex(element => element.id === product.id);
    if (existing === -1) {
      setItems([...cartItems, {...product, quantity: 1, total: product.price}]);
    } else {      
      let copy = [...cartItems];
      const qty = ++cartItems[existing].quantity;
      copy.splice(existing, 1, {...cartItems[existing], quantity: qty, total: product.price * qty})
      setItems(copy)
    }
  }

  React.useEffect(() => {
    if (randomKey > 0) {
      addToCart()
    }
  }, [randomKey, currency])
  
  console.log(cartItems);
  return (
    <div className={open ? "modal-container" : "modal-closed"}>
      <div className="overlay" />
      <div className="modal">
        <div>
          <div onClick={() => setOpen(false)}> &gt; </div>
          <h6>Your Cart</h6>
        </div>
        <select onChange={(e) => reQuery(e.target.value)}>
          {
            currencies?.map((c) => {
              return (
                <option selected={currency===c} key={c} value={c}>{c}</option>
              )
            })
          }
        </select>
        <div className="cart">
          {
            cartItems?.map((item) => {
              return (
                <div className="cart-card" key={item.id}>
                  <div>
                    <h6>{item.title}</h6>
                    <div className="quantity">
                      <div>
                        <span className="selector">-</span>
                        <span className="count">{item?.quantity}</span>
                        <span className="selector">+</span>
                      </div>
                      <div>{`${currency} ${'\u00A0'} ${(item?.total)?.toFixed(2)}`}</div>
                    </div>
                  </div>
                  <div>
                    <img src={item.image_url} alt={''} />
                  </div>
                </div>
              )
            })
          }
        </div>
        <hr style={{ color: '#1e2d2b', width: '100%', marginTop: 15 }} />
        <div className="total">
          <span>Subtotal</span>
          <span>{`${currency} ${cartItems?.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.total
          }, 0).toFixed(2)}`}
          </span>
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  open: PropTypes.bool.isRequired
}