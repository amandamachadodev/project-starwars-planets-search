import React from 'react';

function Planets({ name }) {
  return (
    <div>
      <tr>
        <td>{name}</td>
        {/* <td>{planet.rotation_period}</td>
        <td>{planet.orbital_period}</td>
        <td>{planet.diameter}</td>
        <td>{planet.climate}</td>
        <td>{planet.gravity}</td>
        <td>{planet.terrain}</td>
        <td>{planet.surface_water}</td>
        <td>{planet.population}</td> */}
      </tr>
    </div>
  );
}

export default Planets;
