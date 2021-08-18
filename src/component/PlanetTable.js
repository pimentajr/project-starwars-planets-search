import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function App() {
  const { headers,
    data,
    filterByName,
    filterByNumericValues,
  } = useContext(PlanetsContext);

  const filterPlanetsInput = data
    .filter((planet) => planet.name.includes(filterByName));

  let filterGeral = filterPlanetsInput;
  let filterPlanetsSelect = [];

  if (filterByNumericValues.length > 0) {
    filterByNumericValues.forEach((filter) => {
      const { column, comparison, value } = filter;
      if (comparison === 'maior que') {
        filterPlanetsSelect = filterGeral.filter((planet) => (
          Number(planet[column]) > Number(value)));
      }
      if (comparison === 'menor que') {
        filterPlanetsSelect = filterGeral.filter((planet) => (
          Number(planet[column]) < Number(value)));
      }
      if (comparison === 'igual a') {
        filterPlanetsSelect = filterGeral.filter((planet) => (
          Number(planet[column]) === Number(value)));
      }
      filterGeral = filterPlanetsSelect;
      return 0;
    });
  } else {
    filterPlanetsSelect = filterPlanetsInput;
  }

  console.log(filterPlanetsSelect);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((info) => <th key={ info }>{info.toUpperCase()}</th>)}
        </tr>
      </thead>
      <tbody>
        {filterGeral.map((planet) => {
          const infoPlanet = Object.values(planet);
          return (
            <tr key={ infoPlanet[0] }>
              {infoPlanet
                .map((info) => <td key={ info }>{info}</td>)}
            </tr>);
        })}
      </tbody>
    </table>
  );
}

export default App;
