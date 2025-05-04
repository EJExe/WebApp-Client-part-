import { Car } from "../models/car.models";

interface PaginatedResponse {
  cars: Car[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

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
      const token = localStorage.getItem("authToken") || localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  // Обновление автомобиля
  async updateCar(id: number, carData: Partial<Car>, requireAuth: boolean = true): Promise<Car> {
    const response = await fetch(`${this.baseUrl}/cars/${id}`, {
      method: "PUT",
      headers: await this.authHeaders(requireAuth),
      body: JSON.stringify({
        id: id,
        brandId: carData.brandId,
        brandName: carData.brandName,
        fuelTypeId: carData.fuelTypeId,
        fuelTypeName: carData.fuelTypeName,
        driveTypeId: carData.driveTypeId,
        driveTypeName: carData.driveTypeName,
        categoryId: carData.categoryId,
        categoryName: carData.categoryName,
        bodyTypeId: carData.bodyTypeId,
        bodyTypeName: carData.bodyTypeName,
        featureIds: carData.featureIds ?? [],
        featureNames: carData.featureNames ?? [],
        model: carData.model,
        year: carData.year,
        mileage: carData.mileage,
        color: carData.color,
        seats: carData.seats,
        pricePerDay: carData.pricePerDay ? Number(carData.pricePerDay) : undefined,
        latitude: carData.latitude,
        longitude: carData.longitude,
        imageUrl: carData.imagePath ?? undefined,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.title || `HTTP error ${response.status}`);
    }
    return data;
  }


  // Удаление автомобиля
  async deleteCar(id: number, requireAuth: boolean = true): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/cars/${id}`, {
      method: "DELETE",
      headers: await this.authHeaders(requireAuth),
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
      throw new Error(`Failed to fetch cars: ${response.status}`);
    }

    const data = await response.json();
    // Handle both paginated and non-paginated responses
    return Array.isArray(data) ? data : data.cars ?? [];
  }

  // Получение автомобилей с пагинацией
  async getCarsWithPagination(
    page: number,
    pageSize: number = 10,
    requireAuth: boolean = false
  ): Promise<PaginatedResponse> {
    const response = await fetch(
      `${this.baseUrl}/cars?pageNumber=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: await this.authHeaders(requireAuth),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch paginated cars: ${response.status}`);
    }

    const data = await response.json();
    return {
      cars: data.cars ?? [],
      totalCount: data.totalCount ?? 0,
      pageNumber: data.pageNumber ?? page,
      pageSize: data.pageSize ?? pageSize,
    };
  }

  // Создание нового автомобиля
  async createCar(car: Omit<Car, "id">, requireAuth: boolean = true): Promise<Car> {
    const response = await fetch(`${this.baseUrl}/cars`, {
      method: "POST",
      headers: await this.authHeaders(requireAuth),
      body: JSON.stringify({
        brandId: car.brandId,
        brandName: car.brandName,
        fuelTypeId: car.fuelTypeId,
        fuelTypeName: car.fuelTypeName,
        driveTypeId: car.driveTypeId,
        driveTypeName: car.driveTypeName,
        categoryId: car.categoryId,
        categoryName: car.categoryName,
        bodyTypeId: car.bodyTypeId,
        bodyTypeName: car.bodyTypeName,
        featureIds: car.featureIds ?? [],
        featureNames: car.featureNames ?? [],
        model: car.model,
        year: car.year,
        mileage: car.mileage,
        color: car.color,
        seats: car.seats,
        pricePerDay: Number(car.pricePerDay),
        latitude: car.latitude,
        longitude: car.longitude,
        imageUrl: car.imagePath ?? "",
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.title || `Failed to create car: ${response.status}`);
    }
    return data;
  }
}

// Экспортируем экземпляр класса APIService
export default new APIService("/api");