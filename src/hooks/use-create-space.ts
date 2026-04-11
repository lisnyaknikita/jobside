'use client'

import { createSpaceAction } from '@/lib/actions/spaces'
import { SpaceFormValues } from '@/lib/validations/space'
import { useState } from 'react'

export function useCreateSpace() {
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	async function handleCreate(values: SpaceFormValues) {
		setLoading(true)
		setError(null)

		const formData = new FormData()
		formData.append('name', values.name)
		formData.append('icon', values.icon)

		const result = await createSpaceAction(formData)

		if (result?.error) {
			setError(result.error)
			setLoading(false)
			return { error: result.error }
		}

		setLoading(false)
		return { data: result.data }
	}

	return { error, loading, handleCreate }
}
