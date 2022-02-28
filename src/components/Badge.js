
export const Badge = ({statusSeverityDescription}) => {
	return statusSeverityDescription && <span className='badge'>{statusSeverityDescription}</span>
}