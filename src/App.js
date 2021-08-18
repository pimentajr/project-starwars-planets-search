import React from 'react';
import PlanetTable from './component/PlanetTable';
import FilterPlanetTable from './component/FilterPlanetTable';
import PlanetsProvider from './context/PlanetsProvider';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <div className="App">
        <h1>Planetas do universo de Star Wars</h1>
        <FilterPlanetTable />
        <PlanetTable />
      </div>
    </PlanetsProvider>
  );
}

export default App;
