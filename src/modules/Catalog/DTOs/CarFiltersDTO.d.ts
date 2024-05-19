import Car from "../entities/Car";

export default interface CarFiltersDTO {
  model?: string;
  make?: string[];
  type?: string[];
  price?: number;
  year?: number;
  history?: boolean;
  milage?: number;
  deal?: boolean;
  yeargt?: number;
  yearlt?: number;
  page: number;
  sort: { [x: string]: "desc" | "asc" };
}
