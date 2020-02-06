import { get, remove } from 'js-cookie'
import jwtDecode from 'jwt-decode'

const useSession = () => {
	let session
	try {
		const token = get('Authorization')
		session = token ? jwtDecode(token) : undefined
	} catch(e) {
		console.error(e)
	}

	const clearSession = () => {
		remove('Authorization')
	}
	
	return [session, clearSession]
}

export default useSession