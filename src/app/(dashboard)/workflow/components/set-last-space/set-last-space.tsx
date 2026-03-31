'use client'

import { useEffect } from 'react'

export function SetLastSpace({ spaceId }: { spaceId: string }) {
	useEffect(() => {
		document.cookie = `last_space_id=${spaceId}; path=/; max-age=${60 * 60 * 24 * 30}`
	}, [spaceId])

	return null
}
