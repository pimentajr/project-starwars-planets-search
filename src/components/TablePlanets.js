import React, { useContext, useEffect } from 'react';
import planetContext from '../Context/planetContext';
import FilterComparison from './FilterComparison';

// import planetAPI from '../services/planetAPI';

const TablePlanets = () => {
  const {
    data,
    numberValue,
    filters: { filterByName: { name } },
    clicked,
  } = useContext(planetContext);
  console.log(numberValue);
  const { column, comparison, value } = numberValue[0];
  useEffect(() => {
    console.log(clicked);
  }, [clicked]);

  if (clicked === true) {
    console.log('entrou');
    const planetsFilter = data
      .filter((planets) => FilterComparison(planets[column], comparison, value));
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Climate</th>
              <th>Created</th>
              <th>Diameter</th>
              <th>Edited</th>
              <th>Films</th>
              <th>Gravity</th>
              <th>Name</th>
              <th>Orbital Period PopulatioN</th>
              <th>Population</th>
              <th>Rotation Period</th>
              <th>Surface Water</th>
              <th>Terrain</th>
              <th>URL</th>
            </tr>
            {planetsFilter.map((planets) => (
              <tr key={ planets.name }>
                <td>{planets.climate}</td>
                <td>{planets.created}</td>
                <td>{planets.diameter}</td>
                <td>{planets.edited}</td>
                <td>{planets.films}</td>
                <td>{planets.gravity}</td>
                <td>{planets.name}</td>
                <td>{planets.orbital_period}</td>
                <td>{planets.population}</td>
                <td>{planets.rotation_period}</td>
                <td>{planets.surface_water}</td>
                <td>{planets.terrain}</td>
                <td>{planets.url}</td>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    );
  }
  if (name !== '') {
    const planetsName = data.filter((planets) => planets.name.includes(name));

    return (
      <table>
        <thead>
          <tr>
            <th>Climate</th>
            <th>Created</th>
            <th>Diameter</th>
            <th>Edited</th>
            <th>Films</th>
            <th>Gravity</th>
            <th>Name</th>
            <th>Orbital Period PopulatioN</th>
            <th>Population</th>
            <th>Rotation Period</th>
            <th>Surface Water</th>
            <th>Terrain</th>
            <th>URL</th>
          </tr>
          {planetsName.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.climate}</td>
              <td>{planet.created}</td>
              <td>{planet.diameter}</td>
              <td>{planet.edited}</td>
              <td>{planet.films}</td>
              <td>{planet.gravity}</td>
              <td>{planet.name}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.population}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.terrain}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </thead>
      </table>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Climate</th>
          <th>Created</th>
          <th>Diameter</th>
          <th>Edited</th>
          <th>Films</th>
          <th>Gravity</th>
          <th>Name</th>
          <th>Orbital Period PopulatioN</th>
          <th>Population</th>
          <th>Rotation Period</th>
          <th>Surface Water</th>
          <th>Terrain</th>
          <th>URL</th>
        </tr>
        {data.length && data.map((planets) => (
          <tr key={ planets.name }>
            <td>{planets.climate}</td>
            <td>{planets.created}</td>
            <td>{planets.diameter}</td>
            <td>{planets.edited}</td>
            <td>
              {
                planets.films.map((film, index) => (<ul key={ index }>{film}</ul>))
              }
            </td>
            <td>{planets.gravity}</td>
            <td>{planets.name}</td>
            <td>{planets.orbital_period}</td>
            <td>{planets.population}</td>
            <td>{planets.rotation_period}</td>
            <td>{planets.surface_water}</td>
            <td>{planets.terrain}</td>
            <td>{planets.url}</td>
          </tr>
        ))}
      </thead>
    </table>
  );
};

export default TablePlanets;
