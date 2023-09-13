import { Language } from "./Language";
import { Meta } from "./Meta";
export interface Country {
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
  languages: Language[];
  _meta: Meta;
}
