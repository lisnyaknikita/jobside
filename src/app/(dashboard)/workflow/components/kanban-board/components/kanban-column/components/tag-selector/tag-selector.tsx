'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TAG_COLORS } from '@/hooks/use-vacancy-tags'
import { X } from 'lucide-react'
import { useState } from 'react'

interface TagSelectorProps {
	tags: Array<{ name: string; color: string }>
	onAdd: (tag: { name: string; color: string }) => void
	onRemove: (index: number) => void
	disabled?: boolean
}

export function TagSelector({ tags, onAdd, onRemove, disabled }: TagSelectorProps) {
	const [tagInput, setTagInput] = useState('')
	const [selectedColor, setSelectedColor] = useState(TAG_COLORS[0])

	const handleInternalAdd = () => {
		const name = tagInput.trim()
		if (!name || tags.find(t => t.name === name)) return
		onAdd({ name, color: selectedColor })
		setTagInput('')
	}

	return (
		<div className='grid gap-2'>
			<Label>Tags</Label>
			<div className='flex flex-wrap gap-1.5'>
				{tags.map((tag, index) => (
					<span
						key={`${tag.name}-${index}`}
						className='flex items-center gap-1 text-xs px-2 py-1 rounded-md font-medium border animate-in fade-in zoom-in duration-200'
						style={{ backgroundColor: `${tag.color}22`, color: tag.color, borderColor: `${tag.color}44` }}
					>
						{tag.name}
						<button type='button' onClick={() => onRemove(index)} className='hover:opacity-70 transition-opacity'>
							<X className='size-3' />
						</button>
					</span>
				))}
			</div>
			<div className='flex gap-1.5'>
				{TAG_COLORS.map(color => (
					<button
						key={color}
						type='button'
						onClick={() => setSelectedColor(color)}
						className='size-5 rounded-full transition-all hover:scale-125 active:scale-95'
						style={{
							backgroundColor: color,
							outline: selectedColor === color ? `2px solid ${color}` : 'none',
							outlineOffset: '2px',
						}}
					/>
				))}
			</div>
			<div className='flex gap-2'>
				<Input
					placeholder='React, TypeScript...'
					value={tagInput}
					onChange={e => setTagInput(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							e.preventDefault()
							handleInternalAdd()
						}
					}}
					disabled={disabled}
				/>
				<Button type='button' variant='outline' onClick={handleInternalAdd} disabled={!tagInput.trim() || disabled}>
					Add
				</Button>
			</div>
		</div>
	)
}
