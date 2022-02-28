import React from 'react';
import { BikePoint } from './BikePoint';

export const Results = ({ results, query }) => {
  if (Array.isArray(results) && !results.length) {
	return <p>No results found for '{query}'</p>;
  }

  return (
    <ul>
      {results && results.map(bikePoint => (
        <BikePoint bikePoint={bikePoint} key={results.indexOf(bikePoint)} />
      ))}
    </ul>
  );
};

export default Results;
