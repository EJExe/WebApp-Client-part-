import { Car, CarSearchResult, CarCreateDto, CarFilterDto } from "../models/car.models";

export class CarService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getCars(filters?: CarFilterDto): Promise<CarSearchResult> {
        const params = new URLSearchParams();
        let endpoint = '/api/Cars';
    
        if (filters?.brandId || filters?.minPrice || filters?.maxPrice) {
            endpoint = '/api/Cars/search';
            if (filters.brandId) params.append('brandId', filters.brandId.toString());
            if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
        }
    
        if (filters?.pageNumber) params.append('pageNumber', filters.pageNumber.toString());
        if (filters?.pageSize) params.append('pageSize', filters.pageSize.toString());
    
        const response = await fetch(`${this.baseUrl}${endpoint}?${params}`, {
            headers: {
                'Cache-Control': 'no-cache',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch cars');
        }
        const result = await response.json();
        console.log("Server response for getCars:", JSON.stringify(result, null, 2));
        return {
            ...result,
            cars: result.cars.map((car: any) => ({
                ...car,
                isLeasingAvailable: car.isAvailable ?? false,
            })),
        };
    }

    async getById(id: number): Promise<Car> {
        const token = localStorage.getItem("jwtToken");
        console.log("Token for getById:", token);
        const response = await fetch(`${this.baseUrl}/api/Cars/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                'Cache-Control': 'no-cache',
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch car");
        }
        const car = await response.json();
        console.log("Server response for getById:", JSON.stringify(car, null, 2));
        return {
            ...car,
            isLeasingAvailable: car.isAvailable ?? false,
        };
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
        formData.append("IsLeasingDisabled", (!car.isLeasingAvailable).toString());
        formData.append("imagePath", "/images/cars/default.jpg");
        if (car.image) {
            formData.append("image", car.image);
        }
        car.featureIds.forEach((id, index) => {
            formData.append(`featureIds[${index}]`, id.toString());
        });

        Array.from(formData.entries()).forEach(([key, value]) => {
            console.log(`FormData: ${key} = ${value}`);
        });

        const token = localStorage.getItem("jwtToken");
        console.log("Token for create:", token);
        const response = await fetch(`${this.baseUrl}/api/Cars`, {
            method: "POST",
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
            body: formData,
        });

        if (!response.ok) {
            let errorMessage = "Failed to create car";
            try {
                const error = await response.json();
                errorMessage = error.message || 
                    (error.errors
                        ? Object.entries(error.errors)
                            .map(([key, value]) => `${key}: ${(value as string[]).join(", ")}`)
                            .join("; ")
                        : errorMessage);
            } catch (jsonError) {
                errorMessage = "Failed to parse error response";
            }
            throw new Error(errorMessage);
        }
    }

    async update(id: number, data: CarCreateDto): Promise<void> {
        const formData = new FormData();
        formData.append("Id", id.toString());
        formData.append("brandId", data.brandId.toString());
        formData.append("model", data.model);
        formData.append("year", data.year.toString());
        formData.append("mileage", data.mileage.toString());
        formData.append("color", data.color);
        formData.append("seats", data.seats.toString());
        formData.append("pricePerDay", data.pricePerDay.toString());
        formData.append("latitude", data.latitude.toString());
        formData.append("longitude", data.longitude.toString());
        formData.append("bodyTypeId", data.bodyTypeId.toString());
        formData.append("categoryId", data.categoryId.toString());
        formData.append("driveTypeId", data.driveTypeId.toString());
        formData.append("fuelTypeId", data.fuelTypeId.toString());
        formData.append("IsLeasingDisabled", (!data.isLeasingAvailable).toString());
        formData.append("imagePath", "/images/cars/default.jpg");
        if (data.image) {
            formData.append("image", data.image);
        }
        data.featureIds.forEach((id, index) => {
            formData.append(`featureIds[${index}]`, id.toString());
        });

        Array.from(formData.entries()).forEach(([key, value]) => {
            console.log(`FormData: ${key} = ${value}`);
        });

        const token = localStorage.getItem("jwtToken");
        console.log("Token for update:", token);
        const response = await fetch(`${this.baseUrl}/api/Cars/${id}`, {
            method: "PUT",
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
            body: formData,
        });

        if (!response.ok) {
            let errorMessage = "Failed to update car";
            try {
                const error = await response.json();
                errorMessage = error.message || 
                    (error.errors
                        ? Object.entries(error.errors)
                            .map(([key, value]) => `${key}: ${(value as string[]).join(", ")}`)
                            .join("; ")
                        : errorMessage);
            } catch (jsonError) {
                errorMessage = "Failed to parse error response";
            }
            throw new Error(errorMessage);
        }

        const contentType = response.headers.get("content-type");
        let responseData = null;
        if (contentType && contentType.includes("application/json")) {
            responseData = await response.json();
            console.log("Server response for update:", JSON.stringify(responseData, null, 2));
        } else {
            console.log("Server response for update: No JSON content (status:", response.status, ")");
        }
    }

    async updateWithImage(id: number, formData: FormData): Promise<void> {
        const token = localStorage.getItem("jwtToken");
        console.log("Token for updateWithImage:", token);
        formData.append("Id", id.toString());
        const response = await fetch(`${this.baseUrl}/api/Cars/${id}/with-image`, {
            method: "PUT",
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
            body: formData,
        });
        if (!response.ok) {
            let errorMessage = "Failed to update car with image";
            try {
                const error = await response.json();
                errorMessage = error.message || 
                    (error.errors
                        ? Object.entries(error.errors)
                            .map(([key, value]) => `${key}: ${(value as string[]).join(", ")}`)
                            .join("; ")
                        : errorMessage);
            } catch (jsonError) {
                errorMessage = "Failed to parse error response";
            }
            throw new Error(errorMessage);
        }
        const contentType = response.headers.get("content-type");
        let responseData = null;
        if (contentType && contentType.includes("application/json")) {
            responseData = await response.json();
            console.log("Server response for updateWithImage:", JSON.stringify(responseData, null, 2));
        } else {
            console.log("Server response for updateWithImage: No JSON content (status:", response.status, ")");
        }
    }

    async delete(id: number): Promise<void> {
        const token = localStorage.getItem("jwtToken");
        console.log("Token for delete:", token);
        const response = await fetch(`${this.baseUrl}/api/Cars/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        });

        if (!response.ok) {
            let errorMessage = "Failed to delete car";
            try {
                const error = await response.json();
                errorMessage = error.message || 
                    (error.errors
                        ? Object.entries(error.errors)
                            .map(([key, value]) => `${key}: ${(value as string[]).join(", ")}`)
                            .join("; ")
                        : errorMessage);
            } catch (jsonError) {
                errorMessage = "Failed to parse error response";
            }
            throw new Error(errorMessage);
        }
    }
}

export const carService = new CarService("https://localhost:7154");