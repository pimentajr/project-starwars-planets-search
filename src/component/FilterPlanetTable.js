import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function App() {
  const { setfilterByName,
    setfilterByNumericValues,
    filterByNumericValues,
  } = useContext(PlanetsContext);

  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');

  const colunmItems = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const valuesByFilter = filterByNumericValues.map((filter) => filter.column);

  const valuesSelect = colunmItems.filter((select) => !valuesByFilter.includes(select));

  const deleteFilterValue = ({ target }) => {
    const newFilter = filterByNumericValues.filter(
      (filter) => filter.column !== target.value,
    );
    setfilterByNumericValues(newFilter);
  };

  return (
    <div>
      <form>
        <label htmlFor="name-filter">
          <input
            type="text"
            id="name-filter"
            data-testid="name-filter"
            placeholder="Search"
            onChange={ (event) => setfilterByName(event.target.value) }
          />
        </label>
      </form>
      <form>
        <label htmlFor="column-filter">
          <select
            id="column-filter"
            data-testid="column-filter"
            onChange={ (event) => (setColumn(event.target.value)) }
          >
            {valuesSelect.map((option) => (
              <option value={ option } key={ option }>{option}</option>))}
          </select>
        </label>
        <label htmlFor="comparison-filter">
          <select
            id="comparison-filter"
            data-testid="comparison-filter"
            onChange={ (event) => (setComparison(event.target.value)) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          <input
            type="number"
            id="value-filter"
            data-testid="value-filter"
            onChange={ (event) => (setValue(event.target.value)) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => setfilterByNumericValues(
            [...filterByNumericValues, { column, comparison, value }],
          ) }
        >
          Filter
        </button>
      </form>
      <div>
        {filterByNumericValues.map((filter) => (
          <div key={ filter.column } data-testid="filter">
            <span>
              {`Active filter: ${filter.column} | 
              Comparison: ${filter.comparison} | 
              Value: ${filter.value}`}
            </span>
            <button
              type="button"
              value={ filter.column }
              onClick={ (event) => deleteFilterValue(event) }
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
