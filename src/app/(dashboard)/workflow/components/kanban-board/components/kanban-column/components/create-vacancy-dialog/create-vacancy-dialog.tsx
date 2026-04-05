'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateVacancy } from '@/hooks/use-create-vacancy'
import { useVacancyTags } from '@/hooks/use-vacancy-tags'
import { Vacancy } from '@/types/kanban'
import { useRef } from 'react'
import { TagSelector } from '../tag-selector/tag-selector'

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
	const { tags, tagInput, setTagInput, selectedColor, setSelectedColor, addTag, removeTag, resetTags } =
		useVacancyTags()
	const formRef = useRef<HTMLFormElement>(null)

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
			resetTags()
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
					<TagSelector
						tags={tags}
						tagInput={tagInput}
						selectedColor={selectedColor}
						onTagInputChange={setTagInput}
						onColorSelect={setSelectedColor}
						onAdd={addTag}
						onRemove={removeTag}
						disabled={loading}
					/>
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
