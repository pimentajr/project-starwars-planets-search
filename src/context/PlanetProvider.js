import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparision: '',
        value: '',
      },
    ],
  });

  const [availableColumns, setAvailableColumns] = useState([]);
  const [searchByName, setSearchByName] = useState(false);
  const [searchByNumeric, setSearchByNumeric] = useState(false);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const context = {
    availableColumns,
    filters,
    filteredPlanets,
    setAvailableColumns,
    setFilters,
    setSearchByName,
    setSearchByNumeric,
  };

  useEffect(() => {
    async function fetchPlanets() {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const resInJSON = await response.json();
      const { results } = resInJSON;
      setData(results);
      const innitialColumns = Object.keys(results[0]);
      const firstUnnusedColumns = 0;
      const moreUnnusedColumns = 3;
      const lastUnnusedColumns = 5;
      innitialColumns.splice(firstUnnusedColumns, 1);
      innitialColumns.splice(moreUnnusedColumns, moreUnnusedColumns);
      innitialColumns.splice(lastUnnusedColumns, lastUnnusedColumns);
      /*
      delete innitialColumns[0];
      delete innitialColumns[4];
      delete innitialColumns[5];
      delete innitialColumns[6];
      delete innitialColumns[9];
      delete innitialColumns[10];
      delete innitialColumns[11];
      delete innitialColumns[12];
      delete innitialColumns[13];
      */
      setAvailableColumns(innitialColumns);
    }
    fetchPlanets();
  }, []);
  //-------------------------------------------------------------------

  useEffect(() => {
    let planetsFiltered = [];

    if (searchByName) {
      const { filterByName: { name } } = filters;
      planetsFiltered = data.filter((planet) => (
        planet.name.toLowerCase().includes(name.toLowerCase())
      ));
      setFilteredPlanets(planetsFiltered);
    } else if (searchByNumeric) {
      const { filterByNumericValues: [{ column, comparision, value }] } = filters;

      if (comparision === 'maior que') {
        planetsFiltered = data.filter(
          (planet) => parseInt(planet[column], 10) > parseInt(value, 10),
        );
        setFilteredPlanets(planetsFiltered);
      } else if (comparision === 'menor que') {
        planetsFiltered = data.filter(
          (planet) => parseInt(planet[column], 10) < parseInt(value, 10),
        );
        setFilteredPlanets(planetsFiltered);
      } else {
        planetsFiltered = data.filter(
          (planet) => parseInt(planet[column], 10) === parseInt(value, 10),
        );
        setFilteredPlanets(planetsFiltered);
      }
    } else {
      setFilteredPlanets(data);
    }
  }, [filters, data, searchByNumeric, searchByName]);

  //---------------------------------------------------------------------

  return (
    <PlanetContext.Provider value={ context }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default PlanetProvider;
