import React, { createContext, useContext, ReactNode, useState, useCallback } from "react";
import OrderService from "../services/OrderService";
import { Order } from "../models/order";

interface OrderContextType {
  orders: Order[];
  createOrder: (carId: number) => Promise<void>;
  cancelOrder: (orderId: number) => Promise<void>;
  confirmOrder: (orderId: number) => Promise<void>;
  completeOrder: (orderId: number) => Promise<void>;
  fetchOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = useCallback(async () => {
    const data = await OrderService.getOrders();
    setOrders(data);
  }, []);

  const createOrder = useCallback(async (carId: number) => {
    // We don't need to pass userId as the OrderService will extract it from the token
    const newOrder = await OrderService.createOrder(carId);
    setOrders(prev => [...prev, newOrder]);
  }, []);

  const cancelOrder = useCallback(async (orderId: number) => {
    await OrderService.cancelOrder(orderId);
    setOrders(prev => prev.filter(order => order.orderId !== orderId));
  }, []);

  const confirmOrder = useCallback(async (orderId: number) => {
    const updatedOrder = await OrderService.confirmOrder(orderId);
    setOrders(prev =>
      prev.map(order =>
        order.orderId === orderId ? updatedOrder : order
      )
    );
  }, []);

  const completeOrder = useCallback(async (orderId: number) => {
    try {
      const success = await OrderService.completeOrder(orderId);
      
      if (success) {
        // Remove the completed order from the state
        setOrders(prev =>
          prev.filter(order => order.orderId !== orderId)
        );
      }
    } catch (error) {
      console.error("Error completing order:", error);
      throw error;
    }
  }, []);

  return (
    <OrderContext.Provider
      value={{ orders, createOrder, cancelOrder, confirmOrder, completeOrder, fetchOrders }}
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