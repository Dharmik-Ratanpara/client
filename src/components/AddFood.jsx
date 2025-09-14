import React, { useState } from 'react';

function AddFood({ onAdd }) {
  const [food, setFood] = useState({ name: '', price: '', description: '', category_id: '' });
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!food.name || !food.price || !food.category_id) {
      setError('Name, Price and Category ID are required');
      return;
    }
    onAdd(food);
    setFood({ name: '', price: '', description: '', category_id: '' });
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Add New Food</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" name="name" className="form-control" placeholder="Name" onChange={handleChange} value={food.name} />
          </div>
          <div className="mb-3">
            <input type="number" name="price" className="form-control" placeholder="Price" onChange={handleChange} value={food.price} />
          </div>
          <div className="mb-3">
            <input type="text" name="description" className="form-control" placeholder="Description" onChange={handleChange} value={food.description} />
          </div>
          <div className="mb-3">
            <select name="category_id" className="form-control" onChange={handleChange} value={food.category_id}>
              <option value="">Select Category</option>
              <option value="1">Italian</option>
              <option value="2">American</option>
              <option value="3">Mexican</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Add Food</button>
        </form>
      </div>
    </div>
  );
}

export default AddFood;