import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import fetchPlanets from '../api/planetsApi';

function StarProvider({ children }) {
  const [data, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filtered, setFiltered] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0 });
  const [activeFilter, setActiveFilter] = useState([]);

  async function getPlanets() {
    setLoading(true);
    const planetsResult = await fetchPlanets();
    setPlanets(planetsResult);
    setLoading(false);
  }

  const contextValue = {
    data,
    getPlanets,
    loading,
    filterByName,
    setFilterByName,
    setFiltered,
    filtered,
    filterByNumericValues,
    setFilterByNumericValues,
    activeFilter,
    setActiveFilter,
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
