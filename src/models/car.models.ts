export interface Car {
  id: number;
  brandId: number;
  brandName: string;
  fuelTypeId: number;
  fuelTypeName: string;
  driveTypeId: number;
  driveTypeName: string;
  categoryId: number;
  categoryName: string;
  bodyTypeId: number;
  bodyTypeName: string;
  featureIds: number[];
  featureNames: string[];
  model: string;
  year: number;
  mileage: number;
  color: string;
  seats: number;
  pricePerDay: number;
  latitude: number;
  longitude: number;
  imagePath: string | null;
  isLeasingAvailable: boolean;
}

export interface CarCreateDto {
  brandId: number;
  model: string;
  year: number;
  mileage: number;
  color: string;
  seats: number;
  pricePerDay: number;
  latitude: number;
  longitude: number;
  bodyTypeId: number;
  categoryId: number;
  driveTypeId: number;
  fuelTypeId: number;
  featureIds: number[];
  image: File | null;
  isLeasingAvailable: boolean;
}

export interface CarSearchResult {
  cars: Car[];
  totalCount: number;
  pageNumber?: number;
  pageSize?: number;
}

export interface CarFilterDto {
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
  pageNumber?: number;
  pageSize?: number;
}

export interface BodyType {
  id: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface CarCategory {
  id: number;
  name: string;
}

export interface CarDriveType {
  id: number;
  name: string;
}

export interface FuelType {
  id: number;
  name: string;
}

export interface CarFeature {
  id: number;
  name: string;
}

