import { useState, useEffect } from 'react'

const useInStuck = (element, positionAttribute = 'top', threshold = 0) => {
	const [isStuck, setIsStuck] = useState(false)
	useEffect(() => {
		const elem = element.current
		const checkIfStuck = () => {
			if (!elem) { return false }
			const pos = elem.getBoundingClientRect()[positionAttribute]
			const computedStyle = getComputedStyle(elem)
			const stickyPoint = parseInt(computedStyle[positionAttribute], 10) || 0

			let isStuck = false
			
			if (positionAttribute === 'top') {
				isStuck = pos <= (stickyPoint + threshold)
			} else if (positionAttribute === 'bottom') {
				isStuck = pos + stickyPoint >= (window.innerHeight - threshold)
			}
			
			setIsStuck(isStuck)
		}
		window.addEventListener('scroll', checkIfStuck)
		window.addEventListener('resize', checkIfStuck)
		return () => {
			window.removeEventListener('scroll', checkIfStuck)
			window.removeEventListener('resize', checkIfStuck)
		};
	}, [element, positionAttribute, threshold])
	return isStuck
}

export default useInStuck
