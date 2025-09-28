/**
 * @fileoverview Service for handling order-related API operations
 * (Сервис для обработки API-операций, связанных с заказами)
 * @module services/OrderService
 */
import { Order } from "../models/order";
import { authService } from "../services/AuthService";
import axios from "axios";

/**
 * @class OrderService
 * @description Service class for managing order operations
 * (Сервисный класс для управления операциями с заказами)
 */
class OrderService {
  /**
   * @private
   * @type {string} Base URL for API requests
   * (Базовый URL для API-запросов)
   */
  private baseUrl: string = "https://localhost:7154";

  /**
   * @constructor
   * @param {string} [baseUrl] Optional base URL override
   * (Опциональный базовый URL)
   */
  constructor(baseUrl?: string) {
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }
  }

  /**
   * @async
   * @method getOrders
   * @description Fetches all orders for the authenticated user
   * (Получает все заказы для аутентифицированного пользователя)
   * @returns {Promise<Order[]>} Promise resolving to array of orders
   * (Промис, разрешающийся в массив заказов)
   * @throws {Error} If authentication fails or API request fails
   * (Если аутентификация не удалась или запрос API не удался)
   */
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

  /**
   * @private
   * @method getUserIdFromToken
   * @description Extracts user ID from JWT token
   * (Извлекает ID пользователя из JWT токена)
   * @param {string} token - JWT token to decode
   * (JWT токен для декодирования)
   * @returns {string} User ID from token
   * (ID пользователя из токена)
   * @throws {Error} If token cannot be decoded
   * (Если токен не может быть декодирован)
   */
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

  /**
   * @async
   * @method completeOrder
   * @description Marks an order as completed
   * (Отмечает заказ как выполненный)
   * @param {number} orderId - ID of the order to complete
   * (ID заказа для завершения)
   * @returns {Promise<void>} Promise that resolves when order is completed
   * (Промис, который разрешается, когда заказ завершен)
   * @throws {Error} If authentication fails or API request fails
   * (Если аутентификация не удалась или запрос API не удался)
   */
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

  /**
   * @async
   * @method confirmOrder
   * @description Confirms an order
   * (Подтверждает заказ)
   * @param {number} orderId - ID of the order to confirm
   * (ID заказа для подтверждения)
   * @returns {Promise<void>} Promise that resolves when order is confirmed
   * (Промис, который разрешается, когда заказ подтвержден)
   * @throws {Error} If authentication fails or API request fails
   * (Если аутентификация не удалась или запрос API не удался)
   */
  async confirmOrder(orderId: number): Promise<void> {
    try {
      const token = authService.getToken();
      if (!token) throw new Error("Требуется авторизация");
      
      await axios.put(
        `${this.baseUrl}/api/Orders/${orderId}/confirm`,
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

  /**
   * @async
   * @method cancelOrder
   * @description Cancels an order
   * (Отменяет заказ)
   * @param {number} orderId - ID of the order to cancel
   * (ID заказа для отмены)
   * @returns {Promise<void>} Promise that resolves when order is cancelled
   * (Промис, который разрешается, когда заказ отменен)
   * @throws {Error} If authentication fails or API request fails
   * (Если аутентификация не удалась или запрос API не удался)
   */
  async cancelOrder(orderId: number): Promise<void> {
    try {
      const token = authService.getToken();
      if (!token) throw new Error("Требуется авторизация");
      
      await axios.put(
        `${this.baseUrl}/api/Orders/${orderId}/cancel`,
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

  /**
   * @async
   * @method createOrder
   * @description Creates a new order for a car
   * (Создает новый заказ на автомобиль)
   * @param {number} carId - ID of the car to order
   * (ID автомобиля для заказа)
   * @param {string} [userId] - Optional user ID, defaults to current user
   * (Опциональный ID пользователя, по умолчанию текущий пользователь)
   * @returns {Promise<Order>} Promise resolving to the created order
   * (Промис, разрешающийся в созданный заказ)
   * @throws {Error} If authentication fails or API request fails
   * (Если аутентификация не удалась или запрос API не удался)
   */
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