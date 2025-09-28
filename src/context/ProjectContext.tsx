/**
 * @fileoverview Context provider for car-related operations
 * (Провайдер контекста для операций, связанных с автомобилями)
 * @module context/ProjectContext
 */
import React, { createContext, useState, useEffect, ReactNode } from "react";
import APIService from "../services/APIService";
import { Car } from "../models/car.models";

/**
 * @interface ProjectContextProps
 * @description Interface defining the shape of the car context
 * (Интерфейс, определяющий форму контекста автомобилей)
 */
interface ProjectContextProps {
  /**
   * @type {Car[]} Array of car objects
   * (Массив объектов автомобилей)
   */
  cars: Car[];
  /**
   * @function addCar
   * @description Adds a new car to the system
   * (Добавляет новый автомобиль в систему)
   * @param {Omit<Car, "id">} car - Car data without ID
   * (Данные автомобиля без ID)
   * @returns {Promise<void>} Promise that resolves when car is added
   * (Промис, который разрешается, когда автомобиль добавлен)
   */
  addCar: (car: Omit<Car, "id">) => Promise<void>;
  /**
   * @function updateCar
   * @description Updates an existing car
   * (Обновляет существующий автомобиль)
   * @param {number} id - ID of the car to update
   * (ID автомобиля для обновления)
   * @param {Partial<Car>} carData - Partial car data to update
   * (Частичные данные автомобиля для обновления)
   * @returns {Promise<Car>} Promise that resolves with the updated car
   * (Промис, который разрешается обновленным автомобилем)
   */
  updateCar: (id: number, carData: Partial<Car>) => Promise<Car>;
  /**
   * @function removeCar
   * @description Removes a car from the system
   * (Удаляет автомобиль из системы)
   * @param {number} id - ID of the car to remove
   * (ID автомобиля для удаления)
   * @returns {Promise<boolean>} Promise that resolves with success status
   * (Промис, который разрешается статусом успеха)
   */
  removeCar: (id: number) => Promise<boolean>;
  /**
   * @function fetchCars
   * @description Fetches all cars from the API
   * (Получает все автомобили из API)
   * @returns {Promise<void>} Promise that resolves when cars are fetched
   * (Промис, который разрешается, когда автомобили получены)
   */
  fetchCars: () => Promise<void>;
}

/**
 * @type {React.Context<ProjectContextProps | undefined>} Context for car operations
 * (Контекст для операций с автомобилями)
 */
export const CarContext = createContext<ProjectContextProps | undefined>(undefined);

/**
 * @component
 * @description Provider component for car context
 * (Компонент-провайдер для контекста автомобилей)
 * @param {Object} props - Component props
 * (Свойства компонента)
 * @param {ReactNode} props.children - Child components
 * (Дочерние компоненты)
 * @returns {JSX.Element} Context provider with car functionality
 * (Провайдер контекста с функциональностью автомобилей)
 */
export const CarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  /**
   * @type {[Car[], React.Dispatch<React.SetStateAction<Car[]>>]} State for storing car data
   * (Состояние для хранения данных автомобилей)
   */
  const [cars, setCars] = useState<Car[]>([]);

  /**
   * @async
   * @function fetchCars
   * @description Fetches all cars from the API
   * (Получает все автомобили из API)
   */
  const fetchCars = async () => {
    try {
      const data = await APIService.getCars(false);
      setCars(data || []);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  /**
   * @description Effect hook to fetch cars on component mount
   * (Хук эффекта для получения автомобилей при монтировании компонента)
   */
  useEffect(() => {
    fetchCars();
  }, []);

  /**
   * @async
   * @function addCar
   * @description Adds a new car to the system
   * (Добавляет новый автомобиль в систему)
   * @param {Omit<Car, "id">} car - Car data without ID
   * (Данные автомобиля без ID)
   */
  const addCar = async (car: Omit<Car, "id">) => {
    try {
      const newCar = await APIService.createCar(car, true);
      setCars((prevCars) => [...prevCars, newCar]);
    } catch (error) {
      console.error("Failed to add car:", error);
      throw error;
    }
  };

  /**
   * @async
   * @function updateCar
   * @description Updates an existing car
   * (Обновляет существующий автомобиль)
   * @param {number} id - ID of the car to update
   * (ID автомобиля для обновления)
   * @param {Partial<Car>} carData - Partial car data to update
   * (Частичные данные автомобиля для обновления)
   * @returns {Promise<Car>} Promise that resolves with the updated car
   * (Промис, который разрешается обновленным автомобилем)
   */
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
        imagePath: carData.imagePath ?? undefined,
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

  /**
   * @async
   * @function removeCar
   * @description Removes a car from the system
   * (Удаляет автомобиль из системы)
   * @param {number} id - ID of the car to remove
   * (ID автомобиля для удаления)
   * @returns {Promise<boolean>} Promise that resolves with success status
   * (Промис, который разрешается статусом успеха)
   */
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