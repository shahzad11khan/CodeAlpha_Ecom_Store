import React, { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const placeOrder = () => {
    fetch("http://localhost:5000/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setCart([]);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Simple E-commerce Store</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p className="font-bold">${product.price}</p>
            <button
              className="bg-blue-500 text-white px-2 py-1 mt-2"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mt-8">Shopping Cart</h2>
      <div>
        {cart.map((item, index) => (
          <div key={index} className="border p-4 mb-2">
            <h4 className="font-bold">{item.name}</h4>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 mt-4"
        onClick={placeOrder}
      >
        Place Order
      </button>
    </div>
  );
}

export default App;
