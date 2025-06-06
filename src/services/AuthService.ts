import { LoginRequest, RegisterRequest, LoginResponse, ApiError } from "../models/auth.models"

class AuthService {
  private baseUrl: string
  // `baseUrl` — базовый URL API, передается при создании экземпляра класса.

  private tokenKey = "jwtToken"
  // `tokenKey` — ключ для хранения токена в `localStorage`.

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    // Конструктор принимает базовый URL для API.
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Асинхронный метод для выполнения запроса входа (логина).

    const response = await fetch(`${this.baseUrl}/api/Account/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      // Отправляем запрос с данными пользователя в теле запроса.
    })

    if (!response.ok) {
      // Если ответ не успешный (HTTP-код не 2xx), обрабатываем ошибку.
      const errorData: ApiError = await response.json().catch(() => ({}))
      // Пытаемся извлечь сообщение об ошибке из ответа. Если не удается, возвращаем пустой объект.
      throw new Error(errorData.message || "Login failed")
      // Бросаем исключение с сообщением об ошибке.
    }

    return (await response.json()) as LoginResponse
    // Если запрос успешен, возвращаем данные пользователя, приведённые к типу `LoginResponse`.
  }

  async register(credentials: RegisterRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.baseUrl}/api/Account/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Registration failed")
    }

    return (await response.json()) as LoginResponse
  }

  storeToken(token: string): void {
    // Метод для сохранения токена в `localStorage`.
    localStorage.setItem(this.tokenKey, token)
  }

  getToken(): string | null {
    // Метод для получения токена из `localStorage`.
    return localStorage.getItem(this.tokenKey)
  }

  getCurrentUserId(): string | null {
    const token = this.getToken(); // Ваш метод получения токена
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Look for the nameidentifier claim which contains the user ID
      return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
             payload.sub ||
             payload.userId; // Fallback to other common claims
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  removeToken(): void {
    // Метод для удаления токена из `localStorage`.
    localStorage.removeItem(this.tokenKey)
  }

  isAuthenticated(): boolean {
    // Метод для проверки аутентификации пользователя.
    return !!this.getToken()
    // Если токен существует, возвращаем `true`, иначе — `false`.
  }
}

export const authService = new AuthService("https://localhost:7154")
// Экспортируем экземпляр класса `AuthService` с корректным базовым URL.
