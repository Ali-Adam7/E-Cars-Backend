export default interface CarModificationDTO {
  model?: string;
  make?: string;
  description?: string;
  type?: string;
  price?: number;
  img?: string;
  year?: number;
  history?: boolean;
  milage?: number;
  quantity?: number;
  deal?: boolean;
}
