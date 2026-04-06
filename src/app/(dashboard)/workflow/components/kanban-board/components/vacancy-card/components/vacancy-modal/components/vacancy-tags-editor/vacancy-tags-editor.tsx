'use client'

import { TAG_COLORS } from '@/hooks/use-vacancy-tags'
import { addTagToVacancyAction, removeTagFromVacancyAction } from '@/lib/actions/vacancies'
import { Tag } from '@/types/kanban'
import { Loader2, Plus, X } from 'lucide-react'
import { useState } from 'react'

interface VacancyTagsEditorProps {
	vacancyId: string
	tags: Tag[]
}

export function VacancyTagsEditor({ vacancyId, tags: initialTags }: VacancyTagsEditorProps) {
	const [tags, setTags] = useState(initialTags)
	const [isAdding, setIsAdding] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [isPending, setIsPending] = useState(false)

	async function handleAddTag() {
		const name = inputValue.trim()
		if (!name || isPending) return

		setIsPending(true)
		const randomColor = TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]

		try {
			const result = await addTagToVacancyAction(vacancyId, name, randomColor)
			if (result.data) {
				setTags(prev => [...prev, result.data!])
				setInputValue('')
				setIsAdding(false)
			}
		} finally {
			setIsPending(false)
		}
	}

	async function handleRemoveTag(tagId: string) {
		const previousTags = tags
		setTags(prev => prev.filter(t => t.id !== tagId))

		const result = await removeTagFromVacancyAction(vacancyId, tagId)

		if (result?.error) {
			setTags(previousTags)
		}
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
				<div className='relative flex items-center'>
					<input
						autoFocus
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						onBlur={() => !inputValue && setIsAdding(false)}
						onKeyDown={e => {
							if (e.key === 'Enter') handleAddTag()
							if (e.key === 'Escape') setIsAdding(false)
						}}
						disabled={isPending}
						placeholder='Tag...'
						className='text-[11px] px-2 py-0.5 rounded-md border border-primary bg-background outline-none w-20'
					/>
					{isPending && <Loader2 className='absolute -right-5 size-3 animate-spin text-muted-foreground' />}
				</div>
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
