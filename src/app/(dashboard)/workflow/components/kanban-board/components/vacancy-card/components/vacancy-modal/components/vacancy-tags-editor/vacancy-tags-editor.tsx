'use client'

import { addTagToVacancyAction, removeTagFromVacancyAction } from '@/lib/actions/vacancies'
import { Tag } from '@/types/kanban'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { TAG_COLORS } from '../../../../../kanban-column/components/create-vacancy-dialog/create-vacancy-dialog'

interface VacancyTagsEditorProps {
	vacancyId: string
	tags: Tag[]
}

export function VacancyTagsEditor({ vacancyId, tags: initialTags }: VacancyTagsEditorProps) {
	const [tags, setTags] = useState(initialTags)
	const [isAdding, setIsAdding] = useState(false)
	const [inputValue, setInputValue] = useState('')

	async function handleAddTag() {
		const name = inputValue.trim()
		if (!name) return

		const randomColor = TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]

		const result = await addTagToVacancyAction(vacancyId, name, randomColor)

		if (result.data) {
			setTags(prev => [...prev, result.data!])
			setInputValue('')
			setIsAdding(false)
		}
	}

	async function handleRemoveTag(tagId: string) {
		setTags(prev => prev.filter(t => t.id !== tagId))
		await removeTagFromVacancyAction(vacancyId, tagId)
	}

	return (
		<div className='flex flex-wrap gap-1.5'>
			{tags.map(tag => (
				<span
					key={tag.id}
					className='flex items-center gap-1 text-xs px-2 py-0.5 rounded-md font-medium border'
					style={{
						backgroundColor: tag.color + '22',
						color: tag.color,
						borderColor: tag.color + '44',
					}}
				>
					{tag.name}
					<button
						onClick={() => handleRemoveTag(tag.id)}
						className='hover:bg-black/10 rounded-full p-0.5 transition-colors'
					>
						<X className='size-3' />
					</button>
				</span>
			))}
			{isAdding ? (
				<input
					autoFocus
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					onBlur={() => {
						if (!inputValue) setIsAdding(false)
					}}
					onKeyDown={e => {
						if (e.key === 'Enter') handleAddTag()
						if (e.key === 'Escape') setIsAdding(false)
					}}
					placeholder='Tag name...'
					className='text-xs px-2 py-0.5 rounded-md border border-primary bg-background outline-none w-24'
				/>
			) : (
				<button
					onClick={() => setIsAdding(true)}
					className='flex items-center gap-1 text-xs px-2 py-0.5 rounded-md border border-dashed border-border text-muted-foreground hover:bg-muted transition-colors'
				>
					<Plus className='size-3' />
					Add
				</button>
			)}
		</div>
	)
}
