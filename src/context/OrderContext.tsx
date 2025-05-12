import React, { createContext, useContext, ReactNode, useState, useCallback } from "react";
import OrderService from "../services/OrderService";
import { Order } from "../models/order";

interface OrderContextType {
  orders: Order[];
  createOrder: (carId: number) => Promise<void>;
  fetchOrders: () => Promise<void>;
  completeOrder: (orderId: number) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = useCallback(async () => {
    const data = await OrderService.getOrders();
    setOrders(data);
  }, []);

  const completeOrder = useCallback(async (orderId: number) => {
    await OrderService.completeOrder(orderId);
    await fetchOrders(); // Обновляем список заказов после изменения
  }, [fetchOrders]);

  const createOrder = useCallback(async (carId: number) => {
    // We don't need to pass userId as the OrderService will extract it from the token
    const newOrder = await OrderService.createOrder(carId);
    setOrders(prev => [...prev, newOrder]);
  }, []);

  return (
    <OrderContext.Provider
      value={{ orders, createOrder, fetchOrders, completeOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within OrderProvider");
  }
  return context;
};