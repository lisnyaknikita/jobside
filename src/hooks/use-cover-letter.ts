'use client'

import { AiLabVacancy } from '@/lib/data/ai-lab'
import { useState } from 'react'

export function useCoverLetter(initialVacancy: AiLabVacancy | null, initialExperience: string) {
	const [jobDescription, setJobDescription] = useState(initialVacancy?.description ?? '')
	const [experience, setExperience] = useState(initialExperience)
	const [completion, setCompletion] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [copied, setCopied] = useState(false)

	async function handleGenerate() {
		if (!jobDescription.trim() || !experience.trim()) return
		setIsLoading(true)
		setCompletion('')
		try {
			const response = await fetch('/api/ai/cover-letter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					vacancyDescription: jobDescription,
					experience,
					position: initialVacancy?.position ?? '',
					company: initialVacancy?.company ?? '',
				}),
			})
			if (!response.ok) throw new Error('Failed to generate')
			const data = await response.json()
			setCompletion(data.text)
		} catch (error) {
			console.error('Generation failed:', error)
		} finally {
			setIsLoading(false)
		}
	}

	async function handleCopy() {
		await navigator.clipboard.writeText(completion)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return {
		jobDescription,
		setJobDescription,
		experience,
		setExperience,
		completion,
		isLoading,
		copied,
		handleGenerate,
		handleCopy,
	}
}
