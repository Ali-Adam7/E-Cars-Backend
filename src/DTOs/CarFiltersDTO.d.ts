import Car from "../entities/Car";

export default interface CarFiltersDTO {
  model?: string;
  make?: string[];
  type?: string[];
  price?: number;
  year?: number;
  milage?: number;
  deal?: boolean;
  yeargt?: number;
  yearlt?: number;
}
