import React, { useContext, useEffect } from 'react';
import StarContext from '../Context/StarContext';

function Planets() {
  const { getPlanets,
    data,
    filterByName,
    setFilteredData,
    filteredData } = useContext(StarContext);
  useEffect(() => {
    getPlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
  }, [data]);

  useEffect(() => {
    if (filterByName.name.length > 0) {
      setFilteredData((data.filter((item) => item.name
        .toLowerCase().includes(filterByName.name.toLowerCase()))));
    } else {
      setFilteredData(data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByName, data]);

  // const filtered = () => {
  //   if (filterByName.length > 0) {
  //     const filteredByName = [];
  //     filteredByName.push(data.filter((item) => item.name
  //       .toLowerCase().includes(filterByName.toLowerCase())));
  //     console.log(filteredByName);
  //   }
  //   return true;
  // };

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
          {filteredData.map((planet) => (
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
