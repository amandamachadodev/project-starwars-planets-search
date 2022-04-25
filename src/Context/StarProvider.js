import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import fetchPlanets from '../api/planetsApi';

function StarProvider({ children }) {
  const [data, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterByName, setFilterByName] = useState('');

  async function getPlanets() {
    setLoading(true);
    const planetsResult = await fetchPlanets();
    setPlanets(planetsResult);
    setLoading(false);
  }

  const contextValue = {
    data, getPlanets, loading, filterByName, setFilterByName,
  };

  return (
    <main>
      <StarContext.Provider value={ contextValue }>
        { children }
      </StarContext.Provider>
    </main>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;
