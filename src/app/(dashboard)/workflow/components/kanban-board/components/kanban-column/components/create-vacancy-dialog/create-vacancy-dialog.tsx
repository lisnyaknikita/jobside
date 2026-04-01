'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateVacancy } from '@/hooks/use-create-vacancy'
import { Vacancy } from '@/types/kanban'
import { useRef } from 'react'

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

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)

		formData.append('columnId', columnId)
		formData.append('spaceId', spaceId)

		const result = await handleCreate(formData)

		if (result.data) {
			onSuccess(result.data)
			onOpenChange(false)
			formRef.current?.reset()
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

					{error && <p className='text-sm text-destructive'>{error}</p>}

					<DialogFooter>
						<Button type='submit' disabled={loading}>
							{loading ? 'Creating...' : 'Create'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
