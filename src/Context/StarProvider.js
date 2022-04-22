import React, { useState } from 'react';
import StarContext from './StarContext';
import fetchPlanets from '../api/planetsApi';

function StarProvider({ children }) {
  const [data, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getPlanets() {
    setLoading(true);
    const planetsResult = await fetchPlanets();
    setPlanets(planetsResult);
    setLoading(false);
  }

  const contextValue = {
    data, getPlanets, loading,
  };

  return (
    <main>
      <StarContext.Provider value={ contextValue }>
        { children }
      </StarContext.Provider>
    </main>
  );
}

export default StarProvider;
