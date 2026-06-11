export interface Event {
  id?: string;
  title: string;
  description?: string;
  date: Date;
  time?: string;
  image?: string;
  location?: string;
  dresscode?: string;
  price?: number;
  tickets?: number;
}
