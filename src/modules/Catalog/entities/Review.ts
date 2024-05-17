export  default interface Review {
    id: number;
    review: string;
    rating: number;
    carId: number;
    userId: number;
    time: Date;
  }