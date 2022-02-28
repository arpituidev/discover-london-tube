export const BikePoint = ({ bikePoint }) => {
	const { id, commonName, lat, lon } = bikePoint;
	const no = id.split('_')[1];
  
	return (
	  <li>
		  {no} {commonName} {lat}, {lon}
	  </li>
	);
};