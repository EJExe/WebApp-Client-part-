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
      const newCar = await APIService.createCar(car, true);
      setCars((prevCars) => [...prevCars, newCar]);
    } catch (error) {
      console.error("Failed to add car:", error);
      throw error;
    }
  };

  const updateCar = async (id: number, carData: Partial<Car>): Promise<Car> => {
    try {
      const updatedCar = await APIService.updateCar(id, {
        id: id,
        brandId: carData.brandId,
        brandName: carData.brandName,
        fuelTypeId: carData.fuelTypeId,
        fuelTypeName: carData.fuelTypeName,
        driveTypeId: carData.driveTypeId,
        driveTypeName: carData.driveTypeName,
        categoryId: carData.categoryId,
        categoryName: carData.categoryName,
        bodyTypeId: carData.bodyTypeId,
        bodyTypeName: carData.bodyTypeName,
        featureIds: carData.featureIds ?? [],
        featureNames: carData.featureNames ?? [],
        model: carData.model,
        year: carData.year,
        mileage: carData.mileage,
        color: carData.color,
        seats: carData.seats,
        pricePerDay: carData.pricePerDay ? Number(carData.pricePerDay) : undefined,
        latitude: carData.latitude,
        longitude: carData.longitude,
        imageUrl: carData.imageUrl ?? undefined,
      }, true); // Set requireAuth: true for admin action
      setCars((prev) =>
        prev.map((car) => (car.id === id ? { ...car, ...updatedCar } : car))
      );
      return updatedCar;
    } catch (error) {
      console.error("Failed to update car:", error);
      throw error;
    }
  };

  const removeCar = async (id: number): Promise<boolean> => {
    try {
      await APIService.deleteCar(id, true);
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