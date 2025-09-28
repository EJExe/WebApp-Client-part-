/**
 * @fileoverview Service for handling reference data API operations
 * (Сервис для обработки API-операций со справочными данными)
 * @module services/ReferenceService
 */
import { BodyType, Brand, CarCategory, CarDriveType, CarFeature, FuelType} from "../models/car.models";

/**
 * @class ReferenceService
 * @description Service class for managing reference data operations
 * (Сервисный класс для управления операциями со справочными данными)
 */
export class ReferenceService {
    /**
     * @private
     * @type {string} Base URL for API requests
     * (Базовый URL для API-запросов)
     */
    private baseUrl: string;

    /**
     * @constructor
     * @param {string} baseUrl - Base URL for API requests
     * (Базовый URL для API-запросов)
     */
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * @async
     * @method getBodyTypes
     * @description Fetches all body types
     * (Получает все типы кузова)
     * @returns {Promise<BodyType[]>} Promise resolving to array of body types
     * (Промис, разрешающийся в массив типов кузова)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
    async getBodyTypes(): Promise<BodyType[]> {
        const response = await fetch(`${this.baseUrl}/api/BodyTypes`);
        if (!response.ok) {
            throw new Error("Failed to fetch body types");
        }
        return await response.json();
    }

    /**
     * @async
     * @method createBodyType
     * @description Creates a new body type
     * (Создает новый тип кузова)
     * @param {BodyType} bodyType - Body type data
     * (Данные типа кузова)
     * @returns {Promise<void>} Promise that resolves when body type is created
     * (Промис, который разрешается, когда тип кузова создан)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

    /**
     * @async
     * @method updateBodyType
     * @description Updates an existing body type
     * (Обновляет существующий тип кузова)
     * @param {number} id - ID of the body type to update
     * (ID типа кузова для обновления)
     * @param {BodyType} bodyType - Updated body type data
     * (Обновленные данные типа кузова)
     * @returns {Promise<void>} Promise that resolves when body type is updated
     * (Промис, который разрешается, когда тип кузова обновлен)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

    /**
     * @async
     * @method deleteBodyType
     * @description Deletes a body type
     * (Удаляет тип кузова)
     * @param {number} id - ID of the body type to delete
     * (ID типа кузова для удаления)
     * @returns {Promise<void>} Promise that resolves when body type is deleted
     * (Промис, который разрешается, когда тип кузова удален)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

    /**
     * @async
     * @method getBrands
     * @description Fetches all brands
     * (Получает все бренды)
     * @returns {Promise<Brand[]>} Promise resolving to array of brands
     * (Промис, разрешающийся в массив брендов)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
    async getBrands(): Promise<Brand[]> {
        const response = await fetch(`${this.baseUrl}/api/brands`);
        if (!response.ok) {
            throw new Error("Failed to fetch brands");
        }
        return await response.json();
    }

    /**
     * @async
     * @method createBrand
     * @description Creates a new brand
     * (Создает новый бренд)
     * @param {Brand} brand - Brand data
     * (Данные бренда)
     * @returns {Promise<void>} Promise that resolves when brand is created
     * (Промис, который разрешается, когда бренд создан)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

    /**
     * @async
     * @method updateBrand
     * @description Updates an existing brand
     * (Обновляет существующий бренд)
     * @param {number} id - ID of the brand to update
     * (ID бренда для обновления)
     * @param {Brand} brand - Updated brand data
     * (Обновленные данные бренда)
     * @returns {Promise<void>} Promise that resolves when brand is updated
     * (Промис, который разрешается, когда бренд обновлен)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

    /**
     * @async
     * @method deleteBrand
     * @description Deletes a brand
     * (Удаляет бренд)
     * @param {number} id - ID of the brand to delete
     * (ID бренда для удаления)
     * @returns {Promise<void>} Promise that resolves when brand is deleted
     * (Промис, который разрешается, когда бренд удален)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

    /**
     * @async
     * @method getCategories
     * @description Fetches all car categories
     * (Получает все категории автомобилей)
     * @returns {Promise<CarCategory[]>} Promise resolving to array of car categories
     * (Промис, разрешающийся в массив категорий автомобилей)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
    async getCategories(): Promise<CarCategory[]> {
        const response = await fetch(`${this.baseUrl}/api/CarCategories`);
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        return await response.json();
    }

    /**
     * @async
     * @method createCategory
     * @description Creates a new car category
     * (Создает новую категорию автомобиля)
     * @param {CarCategory} category - Category data
     * (Данные категории)
     * @returns {Promise<void>} Promise that resolves when category is created
     * (Промис, который разрешается, когда категория создана)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

    /**
     * @async
     * @method updateCategory
     * @description Updates an existing car category
     * (Обновляет существующую категорию автомобиля)
     * @param {number} id - ID of the category to update
     * (ID категории для обновления)
     * @param {CarCategory} category - Updated category data
     * (Обновленные данные категории)
     * @returns {Promise<void>} Promise that resolves when category is updated
     * (Промис, который разрешается, когда категория обновлена)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

    /**
     * @async
     * @method deleteCategory
     * @description Deletes a car category
     * (Удаляет категорию автомобиля)
     * @param {number} id - ID of the category to delete
     * (ID категории для удаления)
     * @returns {Promise<void>} Promise that resolves when category is deleted
     * (Промис, который разрешается, когда категория удалена)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

    /**
     * @async
     * @method getDriveTypes
     * @description Fetches all drive types
     * (Получает все типы привода)
     * @returns {Promise<CarDriveType[]>} Promise resolving to array of drive types
     * (Промис, разрешающийся в массив типов привода)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
    async getDriveTypes(): Promise<CarDriveType[]> {
        const response = await fetch(`${this.baseUrl}/api/DriveType`);
        if (!response.ok) {
            throw new Error("Failed to fetch drive types");
        }
        return await response.json();
    }

    /**
     * @async
     * @method createDriveType
     * @description Creates a new drive type
     * (Создает новый тип привода)
     * @param {CarDriveType} driveType - Drive type data
     * (Данные типа привода)
     * @returns {Promise<void>} Promise that resolves when drive type is created
     * (Промис, который разрешается, когда тип привода создан)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

    /**
     * @async
     * @method updateDriveType
     * @description Updates an existing drive type
     * (Обновляет существующий тип привода)
     * @param {number} id - ID of the drive type to update
     * (ID типа привода для обновления)
     * @param {CarDriveType} driveType - Updated drive type data
     * (Обновленные данные типа привода)
     * @returns {Promise<void>} Promise that resolves when drive type is updated
     * (Промис, который разрешается, когда тип привода обновлен)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

    /**
     * @async
     * @method deleteDriveType
     * @description Deletes a drive type
     * (Удаляет тип привода)
     * @param {number} id - ID of the drive type to delete
     * (ID типа привода для удаления)
     * @returns {Promise<void>} Promise that resolves when drive type is deleted
     * (Промис, который разрешается, когда тип привода удален)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

    /**
     * @async
     * @method getFuelTypes
     * @description Fetches all fuel types
     * (Получает все типы топлива)
     * @returns {Promise<FuelType[]>} Promise resolving to array of fuel types
     * (Промис, разрешающийся в массив типов топлива)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
    async getFuelTypes(): Promise<FuelType[]> {
        const response = await fetch(`${this.baseUrl}/api/FuelTypes`);
        if (!response.ok) {
            throw new Error("Failed to fetch fuel types");
        }
        return await response.json();
    }

    /**
     * @async
     * @method createFuelType
     * @description Creates a new fuel type
     * (Создает новый тип топлива)
     * @param {FuelType} fuelType - Fuel type data
     * (Данные типа топлива)
     * @returns {Promise<void>} Promise that resolves when fuel type is created
     * (Промис, который разрешается, когда тип топлива создан)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

    /**
     * @async
     * @method updateFuelType
     * @description Updates an existing fuel type
     * (Обновляет существующий тип топлива)
     * @param {number} id - ID of the fuel type to update
     * (ID типа топлива для обновления)
     * @param {FuelType} fuelType - Updated fuel type data
     * (Обновленные данные типа топлива)
     * @returns {Promise<void>} Promise that resolves when fuel type is updated
     * (Промис, который разрешается, когда тип топлива обновлен)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

    /**
     * @async
     * @method deleteFuelType
     * @description Deletes a fuel type
     * (Удаляет тип топлива)
     * @param {number} id - ID of the fuel type to delete
     * (ID типа топлива для удаления)
     * @returns {Promise<void>} Promise that resolves when fuel type is deleted
     * (Промис, который разрешается, когда тип топлива удален)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

    /**
     * @async
     * @method getFeatures
     * @description Fetches all car features
     * (Получает все особенности автомобилей)
     * @returns {Promise<CarFeature[]>} Promise resolving to array of car features
     * (Промис, разрешающийся в массив особенностей автомобилей)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
    async getFeatures(): Promise<CarFeature[]> {
        const response = await fetch(`${this.baseUrl}/api/CarFeatures`);
        if (!response.ok) {
            throw new Error("Failed to fetch features");
        }
        return await response.json();
    }

    /**
     * @async
     * @method createFeature
     * @description Creates a new car feature
     * (Создает новую особенность автомобиля)
     * @param {CarFeature} feature - Feature data
     * (Данные особенности)
     * @returns {Promise<void>} Promise that resolves when feature is created
     * (Промис, который разрешается, когда особенность создана)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

    /**
     * @async
     * @method updateFeature
     * @description Updates an existing car feature
     * (Обновляет существующую особенность автомобиля)
     * @param {number} id - ID of the feature to update
     * (ID особенности для обновления)
     * @param {CarFeature} feature - Updated feature data
     * (Обновленные данные особенности)
     * @returns {Promise<void>} Promise that resolves when feature is updated
     * (Промис, который разрешается, когда особенность обновлена)
     * @throws {Error} If API request fails
     * (Если запрос API не удался)
     */
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

/**
 * @constant {ReferenceService} referenceService - Singleton instance of ReferenceService
 * (Синглтон-экземпляр ReferenceService)
 */
export const referenceService = new ReferenceService("");