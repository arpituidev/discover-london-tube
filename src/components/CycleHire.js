import React, { useState } from 'react';
import { Results } from './Results';
import { getCycleHireData } from '../services/getCycleHireData';

let cachedQuery;

const CycleHire = () => {
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState(null);


  const searchBikePoints = () => {
		if(query === '') {
			return <Results results={[]} query={''} />
		}

    if (cachedQuery !== query) {
      setLoading(true); // would probably show a loader
			
    	getCycleHireData(query).then(data => {
				console.log(data);
				setLoading(false);
				cachedQuery = query;
				setResults(data);
      });
    } else {
     	setLoading(false);
    }
	};
	
	return (
		<div>
			<h4>Cycle Hire</h4>
			<div>
				<input
					type='text'
					placeholder='Location'
					className='bike-location'
					onChange={event => setQuery(event.target.value)}
					onKeyPress={event => {
						if (event.key === 'Enter') {
							searchBikePoints();
						}
					}}
					value={query}
				/>
				<input type='button' value='Search' onClick={searchBikePoints} />
			</div>
			{results ? (
				<Results results={results} query={query} />
			) : null}
		</div>
	);
};

export default CycleHire;
