import Car from "../entities/Car";

export default interface CarDataDTO extends Omit<Car, "reviews" | "id"> {}
