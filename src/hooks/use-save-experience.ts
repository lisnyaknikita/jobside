'use client'

import { updateUserExperienceAction } from '@/lib/actions/user'
import { useState } from 'react'

export function useSaveExperience(initial: string) {
	const [experience, setExperience] = useState(initial)
	const [saving, setSaving] = useState(false)
	const [saved, setSaved] = useState(false)

	async function handleSave() {
		try {
			setSaving(true)
			setSaved(false)
			const result = await updateUserExperienceAction(experience)
			if (result?.error) {
				console.error(result.error)
				return
			}
			setSaved(true)
			setTimeout(() => setSaved(false), 2000)
		} catch (error) {
			console.error('Failed to save experience:', error)
		} finally {
			setSaving(false)
		}
	}

	return { experience, setExperience, saving, saved, handleSave }
}
