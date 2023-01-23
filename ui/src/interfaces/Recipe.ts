import { Ingredients } from "./Ingredients";
import { Steps } from "./Steps";

export interface Recipe {
  name: string;
  id: string;
  time_to_make: string;
  prep_time: string;
  ingredients: Ingredients[];
  steps: Steps[];
}
