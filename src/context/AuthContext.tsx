import React, { createContext, useContext, useState, useEffect } from "react"
import { authService } from "../services/AuthService"
import { LoginResponse, RegisterRequest } from "../models/auth.models"

interface AuthContextType {
  user: LoginResponse | null
  // Данные авторизованного пользователя или `null`, если пользователь не авторизован.

  login: (userName: string, password: string) => Promise<void>
  // Функция для выполнения входа. Возвращает промис.

  register: (userName: string, email: string, password: string) => Promise<void>

  logout: () => void
  // Функция для выхода из системы.

  isAdmin: boolean
  // Флаг, указывающий, является ли пользователь администратором.
}

enum UserRole {
  Admin = "admin",
  Client  = "Client",
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null)

  useEffect(() => {
    const token = authService.getToken()
    if (token) {
      const storedUser = localStorage.getItem('user')
      if (storedUser) setUser(JSON.parse(storedUser))
    }
  }, [])
  // Пустой массив зависимостей (`[]`) означает, что этот эффект выполнится только один раз — при монтировании компонента.

  const login = async (userName: string, password: string) => {
    try {
      // Функция входа в систему. Отправляет данные на сервер и сохраняет ответ.
      const response = await authService.login({ userName, password })
      authService.storeToken(response.token)
      // Сохраняем токен авторизации в локальном хранилище через `authService`.

      localStorage.setItem("user", JSON.stringify(response))
      // Сохраняем данные пользователя в локальном хранилище.
      setUser(response)
      
      // Обновляем состояние пользователя.
    } catch (error) {
      console.error("Ошибка входа:", error)
      throw error // Или вернуть пользовательское сообщение об ошибке.
    }
  }

  const register = async (userName: string, email: string, password: string) => {
    try {
      const response = await authService.register({ userName, email, password})
      authService.storeToken(response.token)
      localStorage.setItem("user", JSON.stringify(response))
      setUser(response)
    } catch (error) {
      console.error("Ошибка регистрации:", error)
      throw error
    }
  }

  const logout = () => {
    // Функция для выхода из системы.
    authService.removeToken()
    // Удаляем токен из хранилища.

    localStorage.removeItem("user")
    // Удаляем данные пользователя из локального хранилища.
    setUser(null)
    // Сбрасываем состояние пользователя.
  }

  const isAdmin = user?.userRole === UserRole.Admin
  // Проверяем, является ли пользователь администратором (определяется по полю `userRole`).

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin }}>
      {/* Передаем данные о пользователе и методы авторизации в контекст. */}
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  // Кастомный хук для доступа к данным контекста.
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
    // Генерируем ошибку, если хук используется вне провайдера контекста.
  }
  return context
  // Возвращаем данные контекста.
}
