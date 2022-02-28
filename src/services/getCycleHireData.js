import axios from 'axios';

const cycleHireUrl = 'https://api.tfl.gov.uk/BikePoint/Search?query=';

export const getCycleHireData = query => {
	console.log({query});
	return axios.get(cycleHireUrl+query)
			.then(response => {
				console.log(response.data);
				return response.data;
			})
			.catch(error => {
				console.log('ERROR', error)
				return error;
			})
}