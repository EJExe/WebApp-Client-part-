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
  imageUrl: string;
}