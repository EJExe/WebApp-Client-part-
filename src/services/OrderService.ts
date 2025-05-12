import { Order } from "../models/order";
import { authService } from "../services/AuthService";
import axios from "axios";

class OrderService {
  private baseUrl: string = "https://localhost:7154";

  constructor(baseUrl?: string) {
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }
  }

  async getOrders(): Promise<Order[]> {
    try {
      const token = authService.getToken();
      if (!token) throw new Error("Требуется авторизация");
      
      const response = await axios.get(`${this.baseUrl}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error("Ошибка авторизации: недействительный токен");
      }
      throw new Error(error.response?.data?.title || "Ошибка загрузки заказов");
    }
  }

  private getUserIdFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Look for the nameidentifier claim which contains the user ID
      return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
             payload.sub ||
             payload.userId; // Fallback to other common claims
    } catch (error) {
      console.error('Error decoding token:', error);
      throw new Error("Could not extract user ID from token");
    }
  }

  async completeOrder(orderId: number): Promise<void> {
    try {
      const token = authService.getToken();
      if (!token) throw new Error("Требуется авторизация");
      
      await axios.post(
        `${this.baseUrl}/api/orders/${orderId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error("Ошибка авторизации: недействительный токен");
      }
      throw new Error(error.response?.data?.title || error.message);
    }
  }

  async confirmOrder(orderId: number): Promise<void> {
    try {
      const token = authService.getToken();
      if (!token) throw new Error("Требуется авторизация");
      
      await axios.put(
        `${this.baseUrl}/api/orders/${orderId}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );
    } catch (error: any) {
      Error(error);
    }
  }

  async cancelOrder(orderId: number): Promise<void> {
    try {
      const token = authService.getToken();
      if (!token) throw new Error("Требуется авторизация");
      
      await axios.put(
        `${this.baseUrl}/api/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );
    } catch (error: any) {
      Error(error);
    }
  }

  async createOrder(carId: number, userId?: string) {
    try {
      const token = authService.getToken();
      
      console.log("Creating order with token:", token);
      
      if (!token) throw new Error("Требуется авторизация");
      
      // Create a new Date for today
      const today = new Date();
      // Format as ISO string
      const startDate = today.toISOString();
      
      // Create OrderDto matching what the server expects
      const orderDto = {
        carId: carId,
        startDate: startDate,
        userId: userId || this.getUserIdFromToken(token),
        orderId: 0, // This will be assigned by the server
        isActive: true
      };
      
      console.log("Sending order data:", JSON.stringify(orderDto));
      
      const response = await axios.post(
        `${this.baseUrl}/api/orders`,
        orderDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );
      
      return response.data;
    } catch (error: any) {
      // Обрабатываем 401 ошибку отдельно
      if (error.response?.status === 401) {
        throw new Error("Ошибка авторизации: недействительный токен");
      }
      throw new Error(error.response?.data?.title || error.message);
    }
  }
}

export default new OrderService("https://localhost:7154");