import axios from 'axios';

const tlfUrl = 'https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true';

export const getTlfData = () => {
	return axios.get(tlfUrl)
			.then(response => {
				console.log(response.data);
				return response.data;
			})
			.catch(error => {
				console.log('ERROR', error)
				return error;
			})
}