/**
 * @fileoverview Context provider for order-related operations
 * (Провайдер контекста для операций, связанных с заказами)
 * @module context/OrderContext
 */
import React, { createContext, useContext, ReactNode, useState, useCallback } from "react";
import OrderService from "../services/OrderService";
import { Order } from "../models/order";

/**
 * @interface OrderContextType
 * @description Interface defining the shape of the order context
 * (Интерфейс, определяющий форму контекста заказов)
 */
interface OrderContextType {
  /**
   * @type {Order[]} Array of order objects
   * (Массив объектов заказов)
   */
  orders: Order[];
  /**
   * @function createOrder
   * @description Creates a new order for a car
   * (Создает новый заказ на автомобиль)
   * @param {number} carId - ID of the car to order
   * (ID автомобиля для заказа)
   * @returns {Promise<void>} Promise that resolves when order is created
   * (Промис, который разрешается, когда заказ создан)
   */
  createOrder: (carId: number) => Promise<void>;
  /**
   * @function fetchOrders
   * @description Fetches all orders for the current user
   * (Получает все заказы для текущего пользователя)
   * @returns {Promise<void>} Promise that resolves when orders are fetched
   * (Промис, который разрешается, когда заказы получены)
   */
  fetchOrders: () => Promise<void>;
  /**
   * @function completeOrder
   * @description Marks an order as completed
   * (Отмечает заказ как выполненный)
   * @param {number} orderId - ID of the order to complete
   * (ID заказа для завершения)
   * @returns {Promise<void>} Promise that resolves when order is completed
   * (Промис, который разрешается, когда заказ завершен)
   */
  completeOrder: (orderId: number) => Promise<void>;
  /**
   * @function confirmOrder
   * @description Confirms an order
   * (Подтверждает заказ)
   * @param {number} orderId - ID of the order to confirm
   * (ID заказа для подтверждения)
   * @returns {Promise<void>} Promise that resolves when order is confirmed
   * (Промис, который разрешается, когда заказ подтвержден)
   */
  confirmOrder: (orderId: number) => Promise<void>;
  /**
   * @function cancelOrder
   * @description Cancels an order
   * (Отменяет заказ)
   * @param {number} orderId - ID of the order to cancel
   * (ID заказа для отмены)
   * @returns {Promise<void>} Promise that resolves when order is cancelled
   * (Промис, который разрешается, когда заказ отменен)
   */
  cancelOrder: (orderId: number) => Promise<void>;
}

/**
 * @type {React.Context<OrderContextType | undefined>} Context for order operations
 * (Контекст для операций с заказами)
 */
const OrderContext = createContext<OrderContextType | undefined>(undefined);

/**
 * @component
 * @description Provider component for order context
 * (Компонент-провайдер для контекста заказов)
 * @param {Object} props - Component props
 * (Свойства компонента)
 * @param {ReactNode} props.children - Child components
 * (Дочерние компоненты)
 * @returns {JSX.Element} Context provider with order functionality
 * (Провайдер контекста с функциональностью заказов)
 */
export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  /**
   * @type {[Order[], React.Dispatch<React.SetStateAction<Order[]>>]} State for storing order data
   * (Состояние для хранения данных заказов)
   */
  const [orders, setOrders] = useState<Order[]>([]);

  /**
   * @async
   * @function fetchOrders
   * @description Fetches all orders for the current user
   * (Получает все заказы для текущего пользователя)
   */
  const fetchOrders = useCallback(async () => {
    const data = await OrderService.getOrders();
    setOrders(data);
  }, []);

  /**
   * @async
   * @function confirmOrder
   * @description Confirms an order
   * (Подтверждает заказ)
   * @param {number} orderId - ID of the order to confirm
   * (ID заказа для подтверждения)
   */
  const confirmOrder = useCallback(async (orderId: number) => {
    await OrderService.confirmOrder(orderId);
    await fetchOrders();
  }, [fetchOrders]);

  /**
   * @async
   * @function cancelOrder
   * @description Cancels an order
   * (Отменяет заказ)
   * @param {number} orderId - ID of the order to cancel
   * (ID заказа для отмены)
   */
  const cancelOrder = useCallback(async (orderId: number) => {
    await OrderService.cancelOrder(orderId);
    await fetchOrders();
  }, [fetchOrders]);

  /**
   * @async
   * @function completeOrder
   * @description Marks an order as completed
   * (Отмечает заказ как выполненный)
   * @param {number} orderId - ID of the order to complete
   * (ID заказа для завершения)
   */
  const completeOrder = useCallback(async (orderId: number) => {
    await OrderService.completeOrder(orderId);
    await fetchOrders(); 
  }, [fetchOrders]);

  /**
   * @async
   * @function createOrder
   * @description Creates a new order for a car
   * (Создает новый заказ на автомобиль)
   * @param {number} carId - ID of the car to order
   * (ID автомобиля для заказа)
   */
  const createOrder = useCallback(async (carId: number) => {
    const newOrder = await OrderService.createOrder(carId);
    setOrders(prev => [...prev, newOrder]);
  }, []);

  return (
    <OrderContext.Provider
      value={{ orders, createOrder, fetchOrders, completeOrder, confirmOrder, cancelOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

/**
 * @function useOrderContext
 * @description Custom hook to access the order context
 * (Пользовательский хук для доступа к контексту заказов)
 * @returns {OrderContextType} Order context value
 * (Значение контекста заказов)
 * @throws {Error} If used outside of OrderProvider
 * (Если используется вне OrderProvider)
 */
export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within OrderProvider");
  }
  return context;
};