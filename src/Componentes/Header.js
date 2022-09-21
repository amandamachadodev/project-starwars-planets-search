import React, { useContext, useEffect, useState } from 'react';
import StarContext from '../Context/StarContext';

function Header() {
  const { setFilterByName, setFilterByNumericValues, filterColumn, setFilterColumn,
    filterByNumericValues, activeFilter, setActiveFilter, removeFilter, columns, filtered,
    setFiltered, data, setRemoveFilter, removeFilterNumeric,
    setRemoveFilterNumeric } = useContext(StarContext);

  const [order, setOrder] = useState({ name: 'population', direction: '' });
  const [activeOrder, setActiveOrder] = useState([]);
  const [removeColumn, setRemoveColumn] = useState([]);

  useEffect(() => {
    const ord = [...filtered];
    if (order.direction === 'asc') {
      setFiltered(ord.sort((a, b) => b[order.name] - a[order.name]));
    } else {
      setFiltered(ord.sort((a, b) => a[order.name] - b[order.name]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOrder]);

  useEffect(() => {
    if (removeColumn.length !== 0) {
      setFilterColumn(columns.filter((item) => !removeColumn.includes(item)));
    } else {
      setFilterColumn(columns);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeColumn]);

  useEffect(() => {
    setFilterByNumericValues({
      column: filterColumn[0],
      comparison: 'maior que',
      value: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterColumn]);

  useEffect(() => {
    const remove = activeFilter;
    const removed = remove.filter((item) => item.column !== removeFilter);
    setActiveFilter(remove.filter((item) => item.column !== removeFilter));
    console.log('remove', removed);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeFilter]);

  return (
    <div>
      <header>
        <div>
          <input
            placeholder="Buscar"
            className="Name"
            type="text"
            data-testid="name-filter"
            onChange={ ({ target }) => setFilterByName({ name: target.value }) }
          />
        </div>
        <div className="Content-1">
          <label htmlFor="column">
            Column
            <select
              data-testid="column-filter"
              name="column"
              onChange={ ({ target }) => {
                setFilterByNumericValues({
                  ...filterByNumericValues, column: target.value });
              } }
            >
              {filterColumn
                .map((column, index) => (
                  <option key={ index } value={ column }>{column}</option>))}
            </select>
          </label>
        </div>
        <div className="Content-1">
          <label htmlFor="comparison">
            Operator
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
        <div className="Content-1">
          <input
            type="number"
            data-testid="value-filter"
            min="0"
            value={ filterByNumericValues.value }
            onChange={ ({ target }) => setFilterByNumericValues({
              ...filterByNumericValues, value: target.value }) }
          />
        </div>
        <button
          className="Content-1"
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            setActiveFilter([...activeFilter, filterByNumericValues]);
            setRemoveColumn([...removeColumn, filterByNumericValues.column]);
          } }
        >
          FILTRATE
        </button>
        <div className="Content-2">
          <label htmlFor="sort">
            Sort
            <select
              data-testid="column-sort"
              name="sort"
              onChange={ ({ target }) => {
                setOrder({
                  ...order, name: target.value });
              } }
            >
              {columns
                .map((column, index) => (
                  <option key={ index } value={ column }>{column}</option>))}
            </select>
          </label>
          <label htmlFor="asc">
            Ascending
            <input
              type="radio"
              value="asc"
              data-testid="column-sort-input-asc"
              name="order"
              onChange={ ({ target }) => {
                setOrder({
                  ...order, direction: target.value });
              } }
            />
          </label>
          <label htmlFor="desc">
            Descendant
            <input
              value="desc"
              type="radio"
              data-testid="column-sort-input-desc"
              name="order"
              onChange={ ({ target }) => {
                setOrder({
                  ...order, direction: target.value });
              } }
            />
          </label>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ () => {
              setActiveOrder([order]);
            } }
          >
            SORT
          </button>
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => {
              setActiveFilter([]);
              setFilterColumn(columns);
              setRemoveFilter([]);
            } }
          >
            REMOVE FILTERS

          </button>
        </div>
        {activeFilter.map((item, index) => (
          <div key={ index } data-testid="filter">
            <p>
              {`${item.column} ${item.comparison} ${item.value}`}
            </p>
            <button
              className="delete"
              type="button"
              onClick={ () => {
                setRemoveFilter(item.column);
                setRemoveFilterNumeric([...removeFilterNumeric, item.column]);
                if (removeColumn.filter((e) => item.column.includes(e))) {
                  setFilterColumn([...filterColumn, item.column]);
                }
              } }
            >
              X
            </button>
          </div>))}
      </header>
    </div>
  );
}

export default Header;
