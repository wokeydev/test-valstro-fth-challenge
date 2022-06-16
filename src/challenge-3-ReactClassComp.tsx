import { ChangeEvent, Component, KeyboardEvent } from "react";
import { fetchStarWars } from "./api";
import { StarWarItem } from "./challenge.types";

interface State {
  loading: boolean,
  filter: string,
  multiplier: number,
  starWars: Array<StarWarItem>,
};

class ClassComp extends Component {
   state: State = {
    loading: false,
    filter: '',
    multiplier: 10,
    starWars: [],
  };

  componentDidMount() {
    const fetchData = async () => {
      const result = await fetchStarWars();
      this.setState((state) => ({
        ...state,
        starWars: result,
        loading: false,
      }));
    }
    this.setState((state) => ({
      ...state,
      loading: true,
    }));
    fetchData();
  }

  handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => ({
      ...state,
      filter: e.target.value,
    }));
  };

  handleChangeMultiplier = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => ({
      ...state,
      multiplier: Number(e.target.value),
    }));
  };

  handleEsc = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      this.setState((state) => ({
        ...state,
        filter: '',
        multiplier: 10,
      }))
    }
  };

  render() {
    const filteredStarWars = this.state.starWars
      .filter((item) => item.name.toLowerCase().includes(this.state.filter.toLowerCase()))
      .map((item) => ({
        ...item,
        power: Number.isNaN(Number(item.mass)) ? 0 : Number(item.height) * Number(item.mass) * Number(this.state.multiplier),
      }));

    return (
      <div id="class-comp" tabIndex={1} onKeyDown={this.handleEsc}>
        <h2>React Class Component</h2>
        Filter:&nbsp;
        <input placeholder="Filter by name" value={this.state.filter} onChange={this.handleChangeFilter} />&nbsp;
        Multiplier:&nbsp;
        <input
          placeholder="Multiplier"
          type="number"
          min="1"
          max="20"
          value={this.state.multiplier}
          onChange={this.handleChangeMultiplier}
        />&nbsp;
        Press "Escape" to reset fields
        <div className="loader">{this.state.loading && 'Loading...'}</div>
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
              <tr key={`class-tr-${index}`}>
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
}

export default ClassComp;
