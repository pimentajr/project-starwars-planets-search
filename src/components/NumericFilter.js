import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function NumericFilter() {
  const [state, setState] = useState({});
  const {
    availableColumns,
    filters,
    setAvailableColumns,
    setFilters,
    setSearchByNumeric,
    setSearchByName,
  } = useContext(PlanetContext);

  function handleChange({ target: { name, value } }) {
    setState({
      ...state,
      [name]: value,
    });
  }

  function handleClick() {
    const { column, comparison, value } = state;

    const filtersAreSelected = column && comparison && value;

    function deleteAvailableColumns(selectedColumn) {
      const newAvailableColumns = [];
      availableColumns.map(
        (existingColumn) => {
          if (existingColumn !== selectedColumn) newAvailableColumns.push(existingColumn);
          return existingColumn;
        },
      );
      setAvailableColumns(newAvailableColumns);
    }

    if (filtersAreSelected) {
      if (filters.filterByNumericValues[0].column === '') {
        setFilters({
          filterByName: {
            name: '',
          },
          filterByNumericValues: [
            {
              column,
              comparison,
              value,
            },
          ],
        });
        deleteAvailableColumns(column);
      } else {
        setFilters({
          filterByName: {
            name: '',
          },
          filterByNumericValues: [
            ...filters.filterByNumericValues,
            {
              column,
              comparison,
              value,
            },
          ],
        });
        deleteAvailableColumns(column);
      }
      setSearchByNumeric(true);
      setSearchByName(false);
    }
  }

  return (
    <div>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleChange }
      >
        <option defaultValue>Escolha uma opção</option>
        {
          availableColumns.map((columnName, index) => (
            <option key={ index } value={ columnName }>{columnName}</option>
          ))
        }
        {/*
        <option value="population">population</option>
        <option value="orbital period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
        */}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChange }
      >
        <option defaultValue>Escolha uma opção</option>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>

  );
}

export default NumericFilter;
