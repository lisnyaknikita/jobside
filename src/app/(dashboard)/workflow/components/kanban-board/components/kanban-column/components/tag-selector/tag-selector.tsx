import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TAG_COLORS } from '@/hooks/use-vacancy-tags'
import { X } from 'lucide-react'

interface TagSelectorProps {
	tags: { name: string; color: string }[]
	tagInput: string
	selectedColor: string
	onTagInputChange: (val: string) => void
	onColorSelect: (color: string) => void
	onAdd: () => void
	onRemove: (name: string) => void
	disabled?: boolean
}

export function TagSelector({
	tags,
	tagInput,
	selectedColor,
	onTagInputChange,
	onColorSelect,
	onAdd,
	onRemove,
	disabled,
}: TagSelectorProps) {
	return (
		<div className='grid gap-2'>
			<Label>Tags</Label>
			<div className='flex flex-wrap gap-1.5'>
				{tags.map(tag => (
					<span
						key={tag.name}
						className='flex items-center gap-1 text-xs px-2 py-1 rounded-md font-medium border'
						style={{ backgroundColor: `${tag.color}22`, color: tag.color, borderColor: `${tag.color}44` }}
					>
						{tag.name}
						<button type='button' onClick={() => onRemove(tag.name)} className='hover:opacity-70'>
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
						onClick={() => onColorSelect(color)}
						className='size-5 rounded-full transition-transform hover:scale-110'
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
					onChange={e => onTagInputChange(e.target.value)}
					onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), onAdd())}
					disabled={disabled}
				/>
				<Button type='button' variant='outline' onClick={onAdd} disabled={!tagInput.trim() || disabled}>
					Add
				</Button>
			</div>
		</div>
	)
}
