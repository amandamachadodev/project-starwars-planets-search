/* eslint-disable indent */
import React, { useContext, useEffect } from 'react';
import StarContext from '../Context/StarContext';

function Header() {
  const { setFilterByName, setFilterByNumericValues, filterColumn, setFilterColumn,
    filterByNumericValues, activeFilter, setActiveFilter, removeFilter, columns, filtered,
    setFiltered, data, setRemoveFilter, removeFilterNumeric,
    setRemoveFilterNumeric } = useContext(StarContext);
  useEffect(() => {
    const removeColumn = filterColumn;
    if (activeFilter.length !== 0) {
      setFilterColumn(activeFilter
        .map((item) => removeColumn.filter((e) => item.column !== e))[0]);
    } else {
      setFilterColumn(removeColumn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  useEffect(() => {
    const remove = activeFilter;
    const removed = remove.filter((item) => item.column !== removeFilter);
    setActiveFilter(remove.filter((item) => item.column !== removeFilter));
    console.log(removed);
    const magicNumber = 3;
    if (removed.length === 0) {
      setFiltered(data);
      setFilterColumn(columns);
    } else if (removed.length === magicNumber) {
      removed.forEach((filter) => {
        switch (filter.comparison) {
        case 'maior que':
          setFiltered(filtered.filter((item) => Number(item[filter.column])
            > Number(filter.value)));
          break;
        case 'menor que':
          setFiltered(filtered.filter((item) => Number(item[filter.column])
            < Number(filter.value)));
          break;
        case 'igual a':
          setFiltered(filtered.filter((item) => Number(item[filter.column])
            === Number(filter.value)));
          break;
        default:
          setFiltered(data);
        }
      });
    } else {
      console.log('não');
      removed.forEach((filter) => {
        switch (filter.comparison) {
        case 'maior que':
          setFiltered(data.filter((item) => Number(item[filter.column])
            > Number(filter.value)));
          break;
        case 'menor que':
          setFiltered(data.filter((item) => Number(item[filter.column])
            < Number(filter.value)));
          break;
        case 'igual a':
          setFiltered(data.filter((item) => Number(item[filter.column])
            === Number(filter.value)));
          break;
        default:
          setFiltered(data);
        }
      });
    }
    // console.log(activeFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeFilter]);

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
              {filterColumn
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
                column: filterColumn[0],
                comparison: 'maior que',
                value: 0,
              });
            } }
          >
            FITLRAR
          </button>
          {activeFilter.map((item, index) => (
            <div key={ index }>
              <p
                data-testid="filter"
              >
                {`${item.column} ${item.comparison} ${item.value}`}
              </p>
              <button
                type="button"
                onClick={ () => {
                  setRemoveFilter(item.column);
                  setRemoveFilterNumeric([...removeFilterNumeric, item.column]);
                } }
              >
                x
              </button>
            </div>))}
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => {
              setActiveFilter([]);
              setFilterColumn(columns);
            } }
          >
            REMOVER FILTROS

          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
