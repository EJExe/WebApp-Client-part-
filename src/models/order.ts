export interface Order {
  orderId: number;
  userId: string;
  carId: number;
  startDate: string;
  status: string;
  isActive?: boolean;
}

export interface CreateOrderRequest {
  carId: number;
  userId: string;
}