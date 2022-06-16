// Note: The HTML for this challenge can be found in index.html

import { fetchStarWars } from "./api";
import { StarWarItem } from "./challenge.types";

// Note: this function is run inside of src/main.tsx
let filter = '';
let multiplier = 10;
let starWars: StarWarItem[] = [];

export function runVanillaApp() {
  const apps = document.getElementById('apps');
  const filterElement = <HTMLInputElement> document.getElementById('filter');
  const multiplierElement = <HTMLInputElement> document.getElementById('multiplier');

  filterElement?.addEventListener('input', (evt) => {
    filter = (evt.target as HTMLInputElement).value;
    rebuildTable();
  });
  multiplierElement?.addEventListener('input', (evt) => {
    multiplier = Number((evt.target as HTMLInputElement).value);
    rebuildTable();
  });
  apps?.addEventListener('keydown', (evt) => {
    if (evt.key === "Escape") {
      filter = '';
      multiplier = 10;
      filterElement!.value = '';
      multiplierElement!.value = '10';
      rebuildTable();
    }
  });

  fetchData();
}

async function fetchData() {
  document.getElementById('loader')!.textContent = 'Loading...';
  starWars = await fetchStarWars();
  document.getElementById('loader')!.textContent = '';
  rebuildTable();
}

function rebuildTable() {
  const filteredData = starWars
    .filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
    .map((item) => ({
      ...item,
      power: Number.isNaN(Number(item.mass)) ? 0 : Number(item.height) * Number(item.mass) * Number(multiplier),
    }));

  let tbodyElement = document.getElementById('tbody');
  // clear tbody before adding new rows
  tbodyElement!.innerHTML = '';
  filteredData.map((item) => {
    const row = document.createElement("tr");
    ['name', 'height', 'mass', 'power'].map((key) => {
      const cell = document.createElement("td");
      cell.textContent = item[key as keyof StarWarItem].toString();
      row.appendChild(cell);
    });
    tbodyElement?.appendChild(row);
  });
}
