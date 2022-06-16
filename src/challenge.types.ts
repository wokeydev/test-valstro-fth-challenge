export interface StarWarItem {
  name: string;
  height: string;
  mass: string;
  power?: number;
}

export interface StarWars {
  next: string | null;
  results: Array<StarWarItem>;
};
