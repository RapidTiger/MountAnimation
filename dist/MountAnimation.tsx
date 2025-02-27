import {Ref, JSX, useCallback, useEffect, useRef, useState} from 'react'

export type MountAnimationType<T> = {
	children: (animation: MountChildrenType<T>) => JSX.Element | false | null
	mount: boolean
	duration?: number
	params: {
		init?: T
		open: T
		close: T
	}
}

export type MountStateType = 'init' | 'open' | 'close';

type MountChildrenType<T> = {
	state: MountStateType
	ref: Ref<any>
} & T

const MountAnimation = <T, >({children, mount, params, duration = 0}: MountAnimationType<T>) => {
	const [load, setLoad] = useState(0)
	const [element, setElement] = useState<JSX.Element | null>(null)
	const memoElement = useCallback((param: MountChildrenType<T>) => children(param), [mount])
	const elementRef = useRef<HTMLElement>(null)
	const timeOutRef = useRef<NodeJS.Timeout | number>()

	const enEvent = useCallback(() => setElement(null), [])

	const listener = (e: AnimationEvent | TransitionEvent) => e.target === elementRef.current && enEvent()

	useEffect(() => {
		if (mount && params?.init && !element) {
			const initChildren = children({
				state: 'init',
				ref: elementRef,
				...params?.init
			})
			if (initChildren) {
				setElement(initChildren)
				setTimeout(() => setLoad(v => ++v), 50)
			}
		} else if (mount) {
			const openChildren = children({
				state: 'open',
				ref: elementRef,
				...params.open
			})
			if (openChildren) {
				setElement(openChildren)
				if (elementRef.current) {
					elementRef.current.removeEventListener('animationend', listener)
					elementRef.current.removeEventListener('transitionend', listener)
				}
				timeOutRef.current && clearTimeout(timeOutRef.current)
			}
		} else if (element) {
			const closeChildren = memoElement({
				state: 'close',
				ref: elementRef,
				...params?.close
			})
			if (closeChildren) {
				setElement(closeChildren)
				if (elementRef.current) {
					elementRef.current.addEventListener('animationend', listener)
					elementRef.current.addEventListener('transitionend', listener)
				}
				if (duration) timeOutRef.current = setTimeout(enEvent, duration)
			}
		}
	}, [children, mount, load])

	return element
}

export default MountAnimation