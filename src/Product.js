import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Cart from './Cart';

const AllProducts = (currency) => {
  return gql`
 {
  products {
    title
    image_url
    price(currency: ${currency})
    id
  }
  currency
 }
 `}

export default function Products() {
  const [open, setOpen] = React.useState(false);
  const [currency, setCurrency] = React.useState('USD');
  const { data, loading, refetch } = useQuery(AllProducts(currency))
  const [selected, setSelected] = React.useState({});
  const [randomKey, setRandomKey] = React.useState(0)
  const handleAddToCart = (product) => {
    setSelected(product)
    setRandomKey(randomKey + 1)
    setOpen(true)
  };

  return (
    <>
    <Cart 
      open={open} 
      setOpen={setOpen} 
      currencies={data?.currency}
      currency={currency} 
      setCurrency={setCurrency} 
      requery={refetch}
      product={selected}
      randomKey={randomKey}
    />

    <div className="container">
      <div className="header">
        <h1>All Products</h1>
      </div>
      <div className={`content ${open ? "open" : ""}`}>
        {loading ? <h5>Fetching products...</h5> :
        (
          data.products.map((product) => {
            return(
              <div key={product.id}>
                <img src={product.image_url} alt={product.title} />
                <h6>{product.title}</h6>
                <h6>{`From ${currency} ${'\u00A0'} ${(product.price).toFixed(2)}`}</h6>
                <button className="btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            )
          })
        )
      }
      </div>    
    </div>
    </>
  )
}