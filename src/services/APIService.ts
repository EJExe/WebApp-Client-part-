import { Car } from "../models/car";


// Класс для работы с API
class APIService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Метод для формирования заголовков с опциональной авторизацией
  private async authHeaders(requireAuth: boolean = false): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (requireAuth) {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  async updateCar(id: number, carData: Partial<Car>): Promise<Car> {
    const response = await fetch(`${this.baseUrl}/cars/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        brand: carData.brand,
        model: carData.model,
        pricePerDay: Number(carData.pricePerDay),
        type: carData.type,
        imageUrl: carData.imageUrl || undefined
      })
    });
  
    const data = await response.json();
    
    if (!response.ok) {
      console.error("Full error response:", data);
      throw new Error(data.title || `HTTP error ${response.status}`);
    }
  
    return data;
  }
  
  async deleteCar(id: number, requireAuth: boolean = true): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/cars/${id}`, {
      method: 'DELETE',
      headers: {
        ...(requireAuth && { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      }
    });
  
    if (!response.ok) {
      throw new Error(`Delete failed with status ${response.status}`);
    }
    return true;
  }

  // Получение списка всех автомобилей
  async getCars(requireAuth: boolean = false): Promise<Car[]> {
    const response = await fetch(`${this.baseUrl}/cars`, {
      method: "GET",
      headers: await this.authHeaders(requireAuth),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }

    return await response.json();
  }

  // Создание нового автомобиля
  async createCar(car: Omit<Car, "id">, requireAuth: boolean = false): Promise<Car> {
    const response = await fetch(`${this.baseUrl}/cars`, {
      method: "POST",
      headers: await this.authHeaders(requireAuth),
      body: JSON.stringify(car),
    });

    if (!response.ok) {
      throw new Error("Failed to create car");
    }

    return await response.json();
  }
}

// Экспортируем экземпляр класса APIService
export default new APIService("/api");