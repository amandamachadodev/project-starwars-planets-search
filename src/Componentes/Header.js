import React, { useContext } from 'react';
import StarContext from '../Context/StarContext';

function Header() {
  const { setFilterByName } = useContext(StarContext);

  return (
    <div>
      <header>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ ({ target }) => setFilterByName({ name: target.value }) }
        />
      </header>
    </div>
  );
}

export default Header;
