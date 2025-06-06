// Модель для запроса на вход
export interface LoginRequest {
    userName: string
    password: string
  }
  
  // Модель для успешного ответа на вход
  export interface LoginResponse {
    token: string
    userName: string
    userRole: string
  }
  
  export interface RegisterRequest {
    userName: string
    email: string
    password: string
}

  // Модель для ошибки API
  export interface ApiError {
    message?: string
    errors?: Record<string, string[]>
  }

  export interface RegisterResponse {
  token: string
  userName: string
  userRole: string
}
  