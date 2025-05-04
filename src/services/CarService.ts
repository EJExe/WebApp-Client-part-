import { Car,CarSearchResult, CarCreateDto, CarFilterDto } from "../models/car.models";

export class CarService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // async getCars(filters?: CarFilterDto): Promise<Car[]> {
    //     const query = filters
    //         ? `?${new URLSearchParams({
    //               brandId: filters.brandId?.toString() || "",
    //               minPrice: filters.minPrice?.toString() || "",
    //               maxPrice: filters.maxPrice?.toString() || "",
    //           }).toString()}`
    //         : "";
    //     const response = await fetch(`${this.baseUrl}/api/Cars${query}`);
    //     if (!response.ok) {
    //         throw new Error("Failed to fetch cars");
    //     }
    //     return await response.json();
    // }

    async getCars(filters?: CarFilterDto): Promise<CarSearchResult> {
        const params = new URLSearchParams();
        
        if (filters?.brandId) params.append('brandId', filters.brandId.toString());
        if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
        if (filters?.pageNumber) params.append('pageNumber', filters.pageNumber.toString());
        if (filters?.pageSize) params.append('pageSize', filters.pageSize.toString());
    
        const response = await fetch(`${this.baseUrl}/api/Cars?${params}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch cars');
        }
        
        return await response.json();
    }
    
    async getById(id: number): Promise<Car> {
        const response = await fetch(`${this.baseUrl}/api/Cars/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch car");
        }

        return await response.json();
    }

    async create(car: CarCreateDto): Promise<void> {
        const formData = new FormData();
        formData.append("brandId", car.brandId.toString());
        formData.append("model", car.model);
        formData.append("year", car.year.toString());
        formData.append("mileage", car.mileage.toString());
        formData.append("color", car.color);
        formData.append("seats", car.seats.toString());
        formData.append("pricePerDay", car.pricePerDay.toString());
        formData.append("latitude", car.latitude.toString());
        formData.append("longitude", car.longitude.toString());
        formData.append("bodyTypeId", car.bodyTypeId.toString());
        formData.append("categoryId", car.categoryId.toString());
        formData.append("driveTypeId", car.driveTypeId.toString());
        formData.append("fuelTypeId", car.fuelTypeId.toString());
        formData.append("isLeasingDisabled", car.isLeasingDisabled.toString());
        formData.append("imagePath", "/images/cars/default.jpg");
        if (car.image) {
            formData.append("image", car.image);
        }
        car.featureIds.forEach((id, index) => {
            formData.append(`featureIds[${index}]`, id.toString());
        });

        // Логирование содержимого FormData для отладки
        Array.from(formData.entries()).forEach(([key, value]) => {
            console.log(`FormData: ${key} = ${value}`);
        });

        const response = await fetch(`${this.baseUrl}/api/Cars`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(
                error.errors
                    ? Object.entries(error.errors)
                          .map(([key, value]) => `${key}: ${(value as string[]).join(", ")}`)
                          .join("; ")
                    : error.message || "Failed to create car"
            );
        }
    }

    async update(id: number, car: CarCreateDto): Promise<void> {
        const formData = new FormData();
        formData.append("brandId", car.brandId.toString());
        formData.append("model", car.model);
        formData.append("year", car.year.toString());
        formData.append("mileage", car.mileage.toString());
        formData.append("color", car.color);
        formData.append("seats", car.seats.toString());
        formData.append("pricePerDay", car.pricePerDay.toString());
        formData.append("latitude", car.latitude.toString());
        formData.append("longitude", car.longitude.toString());
        formData.append("bodyTypeId", car.bodyTypeId.toString());
        formData.append("categoryId", car.categoryId.toString());
        formData.append("driveTypeId", car.driveTypeId.toString());
        formData.append("fuelTypeId", car.fuelTypeId.toString());
        formData.append("isLeasingDisabled", car.isLeasingDisabled.toString());
        formData.append("imagePath", car.image ? "" : "/images/cars/default.jpg");
        if (car.image) {
            formData.append("image", car.image);
        }
        car.featureIds.forEach((id, index) => {
            formData.append(`featureIds[${index}]`, id.toString());
        });

        // Логирование содержимого FormData для отладки
        Array.from(formData.entries()).forEach(([key, value]) => {
            console.log(`FormData: ${key} = ${value}`);
        });

        const response = await fetch(`${this.baseUrl}/api/Cars/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(
                error.errors
                    ? Object.entries(error.errors)
                          .map(([key, value]) => `${key}: ${(value as string[]).join(", ")}`)
                          .join("; ")
                    : error.message || "Failed to update car"
            );
        }
    }

    async delete(id: number): Promise<void> {
        const token = localStorage.getItem("jwtToken"); // Получаем токен
        console.log("Токен:", token);
        const response = await fetch(`${this.baseUrl}/api/Cars/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
          },
        });
      
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to delete car");
        }
      }
}

export const carService = new CarService("https://localhost:7154");