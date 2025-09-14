
import React, { useState } from 'react';

function FoodList({ foods, onDelete }) {
  const [billItems, setBillItems] = useState([]);

  const addToBill = (food) => {
    setBillItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === food.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...food, quantity: 1 }];
      }
    });
  };

  const removeFromBill = (food) => {
    setBillItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === food.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item => 
          item.id === food.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevItems.filter(item => item.id !== food.id);
      }
    });
  };

  const total = billItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const categories = [...new Set(foods.map(food => food.category))];

  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          {categories.map(category => (
            <div key={category} className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{category}</h5>
                <ul className="list-group">
                  {foods.filter(food => food.category === category).map(food => (
                    <li key={food.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{food.name}</strong> - ${food.price}
                        <p>{food.description}</p>
                      </div>
                      <div>
                        <button className="btn btn-primary btn-sm me-2" onClick={() => addToBill(food)}>+</button>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => removeFromBill(food)}>-</button>
                        <button className="btn btn-secondary btn-sm me-2">Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => onDelete(food.id)}>Delete</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Bill</h5>
              <ul className="list-group">
                {billItems.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.name} x{item.quantity}
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <hr />
              <h5>Total: ${total.toFixed(2)}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodList;
