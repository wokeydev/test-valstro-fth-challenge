import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { fetchStarWars } from './api';
import { StarWarItem } from './challenge.types';

function FunctionalComp() {
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');
  const [multiplier, setMultiplier] = useState<number>(10);
  const [starWars, setStarWars] = useState<StarWarItem[]>([]);

  const handleChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleChangeMultiplier = (event: ChangeEvent<HTMLInputElement>) => {
    setMultiplier(Number(event.target.value));
  };

  const handleEsc = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setFilter('');
      setMultiplier(10);
    }
  };

  useEffect(() => {
    // Handle fetch data
    const fetchData = async () => {
      const result = await fetchStarWars();
      setStarWars(result);
      setLoading(false);
    }
    setLoading(true);
    fetchData();
  }, []);

  const filteredStarWars: StarWarItem[] = useMemo(() => {
    return starWars
      .filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
      .map((item) => ({
        ...item,
        power: Number.isNaN(Number(item.mass)) ? 0 : Number(item.height) * Number(item.mass) * Number(multiplier),
      }));
  }, [starWars, filter, multiplier]);

  return (
    <div id="functional-comp" tabIndex={0} onKeyDown={handleEsc}>
      <h2>React Functional Component</h2>
      Filter:&nbsp;
      <input placeholder="Filter by name" value={filter} onChange={handleChangeFilter} />&nbsp;
      Multiplier:&nbsp;
      <input
        placeholder="Multiplier"
        type="number"
        min="1"
        max="20"
        value={multiplier}
        onChange={handleChangeMultiplier}
      />&nbsp;
      Press "Escape" to reset fields
      <div className="loader">{loading && 'Loading...'}</div>
      <table width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Power</th>
          </tr>
        </thead>
        <tbody>
          {filteredStarWars.map((item, index) => (
            <tr key={`function-tr-${index}`}>
              <td>{item.name}</td>
              <td>{item.height}</td>
              <td>{item.mass}</td>
              <td>{item.power}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FunctionalComp;
