'use client'

import { createSpaceAction } from '@/lib/actions/spaces'
import { type IconOption } from '@/lib/constants/icons'
import { useState } from 'react'

export function useCreateSpace() {
	const [selectedIcon, setSelectedIcon] = useState<IconOption>('briefcase')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	async function handleCreate(formData: FormData) {
		setLoading(true)
		setError(null)
		formData.set('icon', selectedIcon)
		const result = await createSpaceAction(formData)
		if (result?.error) {
			setError(result.error)
			setLoading(false)
		}
	}

	return { selectedIcon, setSelectedIcon, error, loading, handleCreate }
}
