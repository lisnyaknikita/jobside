import { useState } from 'react'

export const TAG_COLORS = ['#818cf8', '#34d399', '#fbbf24', '#f472b6', '#22d3ee', '#60a5fa', '#fb923c', '#a78bfa']

export function useVacancyTags() {
	const [tags, setTags] = useState<{ name: string; color: string }[]>([])
	const [tagInput, setTagInput] = useState('')
	const [selectedColor, setSelectedColor] = useState(TAG_COLORS[0])

	const addTag = () => {
		const name = tagInput.trim()
		if (!name || tags.find(t => t.name === name)) return
		setTags(prev => [...prev, { name, color: selectedColor }])
		setTagInput('')
	}

	const removeTag = (name: string) => {
		setTags(prev => prev.filter(t => t.name !== name))
	}

	const resetTags = () => {
		setTags([])
		setTagInput('')
	}

	return { tags, tagInput, setTagInput, selectedColor, setSelectedColor, addTag, removeTag, resetTags }
}
