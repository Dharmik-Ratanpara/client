
import React, { useState, useEffect } from 'react';
import FoodList from './components/FoodList';
import AddFood from './components/AddFood';
import { getFoods, addFood, deleteFood, updateFood } from './api';

function App() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    const response = await getFoods();
    setFoods(response.data);
  };

  const handleAddFood = async (food) => {
    await addFood(food);
    fetchFoods();
  };

  const handleDeleteFood = async (id) => {
    await deleteFood(id);
    fetchFoods();
  };

  return (
    <div className="container">
      <h1 className="my-4">Restaurant Management</h1>
      <AddFood onAdd={handleAddFood} />
      <FoodList foods={foods} onDelete={handleDeleteFood} />
    </div>
  );
}

export default App;
