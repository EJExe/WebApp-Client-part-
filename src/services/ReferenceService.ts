import { BodyType, Brand, CarCategory, CarDriveType, CarFeature, FuelType} from "../models/car.models";

export class ReferenceService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getBodyTypes(): Promise<BodyType[]> {
        const response = await fetch(`${this.baseUrl}/api/BodyTypes`);
        if (!response.ok) {
            throw new Error("Failed to fetch body types");
        }
        return await response.json();
    }

    async createBodyType(bodyType: BodyType): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/BodyTypes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify(bodyType),
        });

        if (!response.ok) {
            throw new Error("Failed to create body type");
        }
    }

    async updateBodyType(id: number, bodyType: BodyType): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/BodyTypes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify(bodyType),
        });

        if (!response.ok) {
            throw new Error("Failed to update body type");
        }
    }

    async deleteBodyType(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/BodyTypes/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete body type");
        }
    }

    async getBrands(): Promise<Brand[]> {
        const response = await fetch(`${this.baseUrl}/api/brands`);
        if (!response.ok) {
            throw new Error("Failed to fetch brands");
        }
        return await response.json();
    }

    async createBrand(brand: Brand): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/brands`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify(brand),
        });

        if (!response.ok) {
            throw new Error("Failed to create brand");
        }
    }

    async updateBrand(id: number, brand: Brand): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/brands/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify(brand),
        });

        if (!response.ok) {
            throw new Error("Failed to update brand");
        }
    }

    async deleteBrand(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/brands/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete brand");
        }
    }

    async getCategories(): Promise<CarCategory[]> {
        const response = await fetch(`${this.baseUrl}/api/CarCategories`);
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        return await response.json();
    }

    async createCategory(category: CarCategory): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/CarCategories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify(category),
        });

        if (!response.ok) {
            throw new Error("Failed to create category");
        }
    }

    async updateCategory(id: number, category: CarCategory): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/CarCategories/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify(category),
        });

        if (!response.ok) {
            throw new Error("Failed to update category");
        }
    }

    async deleteCategory(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/CarCategories/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete category");
        }
    }

    async getDriveTypes(): Promise<CarDriveType[]> {
        const response = await fetch(`${this.baseUrl}/api/DriveType`);
        if (!response.ok) {
            throw new Error("Failed to fetch drive types");
        }
        return await response.json();
    }

    async createDriveType(driveType: CarDriveType): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/DriveType`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify(driveType),
        });

        if (!response.ok) {
            throw new Error("Failed to create drive type");
        }
    }

    async updateDriveType(id: number, driveType: CarDriveType): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/DriveType/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify(driveType),
        });

        if (!response.ok) {
            throw new Error("Failed to update drive type");
        }
    }

    async deleteDriveType(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/DriveType/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete drive type");
        }
    }

    async getFuelTypes(): Promise<FuelType[]> {
        const response = await fetch(`${this.baseUrl}/api/FuelTypes`);
        if (!response.ok) {
            throw new Error("Failed to fetch fuel types");
        }
        return await response.json();
    }

    async createFuelType(fuelType: FuelType): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/FuelTypes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify(fuelType),
        });

        if (!response.ok) {
            throw new Error("Failed to create fuel type");
        }
    }

    async updateFuelType(id: number, fuelType: FuelType): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/FuelTypes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify(fuelType),
        });

        if (!response.ok) {
            throw new Error("Failed to update fuel type");
        }
    }

    async deleteFuelType(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/FuelTypes/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete fuel type");
        }
    }

    async getFeatures(): Promise<CarFeature[]> {
        const response = await fetch(`${this.baseUrl}/api/CarFeatures`);
        if (!response.ok) {
            throw new Error("Failed to fetch features");
        }
        return await response.json();
    }

    async createFeature(feature: CarFeature): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/CarFeatures`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify(feature),
        });

        if (!response.ok) {
            throw new Error("Failed to create feature");
        }
    }

    async updateFeature(id: number, feature: CarFeature): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/CarFeatures/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify(feature),
        });

        if (!response.ok) {
            throw new Error("Failed to update feature");
        }
    }
}

export const referenceService = new ReferenceService("");