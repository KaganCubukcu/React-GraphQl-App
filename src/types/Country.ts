import { Language } from "./Language";

export interface Country {
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
  languages: Language[];
}
