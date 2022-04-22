const PLANETS_ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

async function fetchPlanets() {
  const response = await fetch(PLANETS_ENDPOINT);
  const data = await response.json();
  return data.results;
}

export default fetchPlanets;
