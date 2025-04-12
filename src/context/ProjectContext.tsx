import React, { createContext, useState, useEffect, ReactNode } from "react";
import APIService from "../services/APIService";
import { Car } from "../models/car";

interface ProjectContextProps {
  cars: Car[];
  addCar: (car: Omit<Car, "id">) => Promise<void>;
  updateCar: (id: number, carData: Partial<Car>) => Promise<Car>;
  removeCar: (id: number) => Promise<boolean>;
  fetchCars: () => Promise<void>;
}

export const CarContext = createContext<ProjectContextProps | undefined>(undefined);

export const CarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);

  const fetchCars = async () => {
    try {
      const data = await APIService.getCars(false);
      setCars(data || []);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const addCar = async (car: Omit<Car, "id">) => {
    try {
      const newCar = await APIService.createCar(car, false);
      setCars((prevCars) => [...prevCars, newCar]);
    } catch (error) {
      console.error("Failed to add car:", error);
      throw error;
    }
  };

  const updateCar = async (id: number, carData: Partial<Car>): Promise<Car> => {
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          id: id,
          brand: carData.brand,
          model: carData.model,
          pricePerDay: Number(carData.pricePerDay),
          type: carData.type,
          imageUrl: carData.imageUrl
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.title || `HTTP error ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const removeCar = async (id: number): Promise<boolean> => {
    try {
      await APIService.deleteCar(id, false);
      setCars(prev => prev.filter(car => car.id !== id));
      return true;
    } catch (error) {
      console.error("Failed to delete car:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Delete failed');
    }
  };

  return (
    <CarContext.Provider value={{ cars, addCar, updateCar, removeCar, fetchCars }}>
      {children}
    </CarContext.Provider>
  );
};