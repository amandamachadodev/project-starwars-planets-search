import React, { useContext, useEffect } from 'react';
import StarContext from '../Context/StarContext';

function Planets() {
  const { getPlanets,
    data,
    filterByName,
    setFiltered,
    filtered, activeFilter } = useContext(StarContext);
  useEffect(() => {
    getPlanets();
    setFiltered(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filterByName.name.length > 0) {
      setFiltered((data.filter((item) => item.name
        .toLowerCase().includes(filterByName.name.toLowerCase()))));
    } else {
      setFiltered(data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByName, data]);

  useEffect(() => {
    activeFilter.forEach((filter) => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Pehiod</th>
            <th>Ohbital Pehiod</th>
            <th>Diameteh</th>
            <th>Climate</th>
            <th>Ghavity</th>
            <th>Tehhain</th>
            <th>Suhface Wateh</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Planets;
