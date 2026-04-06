'use client'

import { createVacancyAction } from '@/lib/actions/vacancies'
import { useState } from 'react'

export function useCreateVacancy() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	async function handleCreate(formData: FormData) {
		setLoading(true)
		setError(null)

		const result = await createVacancyAction(formData)

		if (result.error) {
			setError(result.error)
			setLoading(false)
			return { error: result.error }
		}

		setLoading(false)
		return { data: result.data }
	}

	return { handleCreate, loading, error }
}
