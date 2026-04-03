'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateVacancy } from '@/hooks/use-create-vacancy'
import { Vacancy } from '@/types/kanban'
import { X } from 'lucide-react'
import { useRef, useState } from 'react'

export const TAG_COLORS = ['#818cf8', '#34d399', '#fbbf24', '#f472b6', '#22d3ee', '#60a5fa', '#fb923c', '#a78bfa']

interface CreateVacancyDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	columnId: string
	spaceId: string
	onSuccess: (vacancy: Vacancy) => void
}

export function CreateVacancyDialog({ open, onOpenChange, columnId, spaceId, onSuccess }: CreateVacancyDialogProps) {
	const { handleCreate, loading, error } = useCreateVacancy()
	const formRef = useRef<HTMLFormElement>(null)
	const [tags, setTags] = useState<{ name: string; color: string }[]>([])
	const [tagInput, setTagInput] = useState('')
	const [selectedColor, setSelectedColor] = useState(TAG_COLORS[0])

	function addTag() {
		const name = tagInput.trim()
		if (!name || tags.find(t => t.name === name)) return
		setTags(prev => [...prev, { name, color: selectedColor }])
		setTagInput('')
	}

	function removeTag(name: string) {
		setTags(prev => prev.filter(t => t.name !== name))
	}

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault()
			addTag()
		}
	}

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)

		formData.append('columnId', columnId)
		formData.append('spaceId', spaceId)
		formData.append('tags', JSON.stringify(tags))

		const result = await handleCreate(formData)

		if (result.data) {
			onSuccess(result.data)
			onOpenChange(false)
			formRef.current?.reset()
			setTags([])
			setTagInput('')
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Add New Vacancy</DialogTitle>
				</DialogHeader>
				<form ref={formRef} onSubmit={onSubmit} className='grid gap-4 py-4'>
					<div className='grid gap-2'>
						<Label htmlFor='company'>Company</Label>
						<Input id='company' name='company' placeholder='Google, Meta...' required disabled={loading} />
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='position'>Position</Label>
						<Input id='position' name='position' placeholder='Frontend Developer...' required disabled={loading} />
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='url'>URL (Optional)</Label>
						<Input id='url' name='url' type='url' placeholder='https://...' disabled={loading} />
					</div>
					<div className='grid gap-2'>
						<div className='grid grid-cols-2 gap-3'>
							<div className='grid gap-2'>
								<Label htmlFor='salary'>Salary (Optional)</Label>
								<Input id='salary' name='salary' placeholder='$120k/year, 3000$/month' disabled={loading} />
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='location'>Location (Optional)</Label>
								<Input id='location' name='location' placeholder='Remote, Kyiv...' disabled={loading} />
							</div>
						</div>
						<p className='text-xs text-muted-foreground'>Any format for salary — yearly, monthly, range</p>
					</div>
					<div className='grid gap-2'>
						<Label>Tags</Label>
						{tags.length > 0 && (
							<div className='flex flex-wrap gap-1.5'>
								{tags.map(tag => (
									<span
										key={tag.name}
										className='flex items-center gap-1 text-xs px-2 py-1 rounded-md font-medium'
										style={{
											backgroundColor: tag.color + '22',
											color: tag.color,
											borderColor: tag.color + '44',
										}}
									>
										{tag.name}
										<button
											type='button'
											onClick={() => removeTag(tag.name)}
											className='hover:opacity-70 transition-opacity'
										>
											<X className='size-3' />
										</button>
									</span>
								))}
							</div>
						)}
						<div className='flex gap-1.5'>
							{TAG_COLORS.map(color => (
								<button
									key={color}
									type='button'
									onClick={() => setSelectedColor(color)}
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
								onChange={e => setTagInput(e.target.value)}
								onKeyDown={handleKeyDown}
								disabled={loading}
							/>
							<Button type='button' variant='outline' onClick={addTag} disabled={!tagInput.trim() || loading}>
								Add
							</Button>
						</div>
						<p className='text-xs text-muted-foreground'>Press Enter or click Add to create a tag</p>
					</div>
					{error && <p className='text-sm text-destructive'>{error}</p>}
					<DialogFooter className='bg-transparent pr-4 pt-2 pb-0'>
						<Button type='submit' disabled={loading}>
							{loading ? 'Creating...' : 'Create'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
