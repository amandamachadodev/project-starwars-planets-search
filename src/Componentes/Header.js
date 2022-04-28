import React, { useContext } from 'react';
import StarContext from '../Context/StarContext';

function Header() {
  const { setFilterByName, setFilterByNumericValues,
    filterByNumericValues, activeFilter, setActiveFilter } = useContext(StarContext);

  return (
    <div>
      <header>
        <div>
          <input
            type="text"
            data-testid="name-filter"
            onChange={ ({ target }) => setFilterByName({ name: target.value }) }
          />
        </div>
        <div>
          <label htmlFor="column">
            Coluna
            <select
              data-testid="column-filter"
              name="column"
              value={ filterByNumericValues.column }
              onChange={ ({ target }) => setFilterByNumericValues({
                ...filterByNumericValues, column: target.value }) }
            >
              {['population', 'orbital_period', 'diameter',
                'rotation_period', 'surface_water']
                .map((column, index) => (
                  <option key={ index } value={ column }>{column}</option>))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="comparison">
            Operador
            <select
              data-testid="comparison-filter"
              name="comparison"
              value={ filterByNumericValues.comparison }
              onChange={ ({ target }) => setFilterByNumericValues({
                ...filterByNumericValues, comparison: target.value }) }
            >
              {['maior que', 'menor que', 'igual a']
                .map((item, index) => (
                  <option key={ index } value={ item }>{item}</option>))}
            </select>
          </label>
        </div>
        <div>
          <input
            type="number"
            data-testid="value-filter"
            min="0"
            value={ filterByNumericValues.value }
            onChange={ ({ target }) => setFilterByNumericValues({
              ...filterByNumericValues, value: target.value }) }
          />
        </div>
        <div>
          <button
            type="button"
            data-testid="button-filter"
            onClick={ () => {
              setActiveFilter([...activeFilter, filterByNumericValues]);
              setFilterByNumericValues({
                column: 'population',
                comparison: 'maior que',
                value: 0,
              });
            } }
          >
            FITLRAR
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
