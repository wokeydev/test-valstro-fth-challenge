import { StarWarItem, StarWars } from "./challenge.types";

export const fetchStarWars = async () => {
  // initialize data for fetching
  let data: StarWars = {
    next: 'https://swapi.dev/api/people/',
    results: [],
  }
  let results: Array<StarWarItem> = [];
  while (data.next) {
    const response = await fetch(data.next);
    data = await response.json();
    results = [...results, ...data.results];
  }
  return results;
};
