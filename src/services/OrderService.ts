import { Order } from "../models/order";
import { authService } from "../services/AuthService"
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

  async cancelOrder(orderId: number): Promise<void> {
    try {
      const token = authService.getToken();
      if (!token) throw new Error("Требуется авторизация");
      
      await axios.put(`${this.baseUrl}/api/orders/cancel/${orderId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error("Ошибка авторизации: недействительный токен");
      }
      throw new Error(error.response?.data?.title || "Ошибка отмены заказа");
    }
  }

  async confirmOrder(orderId: number): Promise<Order> {
    try {
      const token = authService.getToken();
      if (!token) throw new Error("Требуется авторизация");
      
      const response = await axios.put(`${this.baseUrl}/api/orders/confirm/${orderId}`, {}, {
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
      throw new Error(error.response?.data?.title || "Ошибка подтверждения заказа");
    }
  }

  async completeOrder(orderId: number): Promise<boolean> {
    try {
      // Получаем токен из authService вместо localStorage напрямую
      const token = authService.getToken();
      if (!token) throw new Error("Требуется авторизация");
      
      console.log(`Отправка запроса на завершение заказа ${orderId}`);
      console.log(`Используемый токен: ${token}`);
      
      // Добавляем withCredentials: true для передачи cookies
      const response = await axios.post(
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
      
      console.log("Ответ сервера:", response);
      return true;
    } catch (error: any) {
      console.error("Ошибка при завершении заказа:", error);
      
      if (error.response?.status === 401) {
        throw new Error("Ошибка авторизации: недействительный токен");
      }
      throw new Error(error.response?.data?.title || "Ошибка завершения аренды");
    }
  }
}

export default new OrderService("https://localhost:7154");