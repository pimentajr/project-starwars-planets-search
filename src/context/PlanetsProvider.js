import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const PlanetsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [filterByName, setfilterByName] = useState([]);
  const [filterByNumericValues, setfilterByNumericValues] = useState([]);
  const valuesProvider = { data,
    headers,
    filterByName,
    setfilterByName,
    filterByNumericValues,
    setfilterByNumericValues,
  };

  useEffect(() => {
    const getPlanets = async () => {
      const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endPoint).then((dataFetch) => dataFetch.json());
      results.map((planet) => delete planet.residents);
      setData(results);
      setHeaders(Object.keys(results[0]));
    };

    getPlanets();
  }, []);

  return (
    <PlanetsContext.Provider value={ valuesProvider }>
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf.isRequired,
};

export default PlanetsProvider;
