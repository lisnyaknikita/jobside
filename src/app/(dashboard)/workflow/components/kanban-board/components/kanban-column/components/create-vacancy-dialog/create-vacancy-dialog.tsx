'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateVacancy } from '@/hooks/use-create-vacancy'
import { VacancyFormValues, vacancySchema } from '@/lib/validations/vacancy'
import { Vacancy } from '@/types/kanban'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
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
	const { handleCreate, loading, error: serverError } = useCreateVacancy()

	const form = useForm<VacancyFormValues>({
		resolver: zodResolver(vacancySchema),
		defaultValues: {
			company: '',
			position: '',
			url: '',
			salary: '',
			location: '',
			columnId,
			spaceId,
			tags: [],
		},
	})

	const {
		fields: tags,
		append,
		remove,
	} = useFieldArray({
		control: form.control,
		name: 'tags',
	})

	const onSubmit: SubmitHandler<VacancyFormValues> = async (values: VacancyFormValues) => {
		const formData = new FormData()
		Object.entries(values).forEach(([key, value]) => {
			if (key === 'tags') {
				formData.append(key, JSON.stringify(value))
			} else {
				formData.append(key, value as string)
			}
		})

		const result = await handleCreate(formData)

		if (result.data) {
			onSuccess(result.data)
			onOpenChange(false)
			form.reset()
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-106.25'>
				<DialogHeader>
					<DialogTitle>Add New Vacancy</DialogTitle>
				</DialogHeader>
				<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
					<div className='grid gap-2'>
						<Label htmlFor='company'>Company</Label>
						<Input {...form.register('company')} placeholder='Google, Meta...' disabled={loading} />
						{form.formState.errors.company && (
							<p className='text-xs text-destructive'>{form.formState.errors.company.message}</p>
						)}
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='position'>Position</Label>
						<Input {...form.register('position')} placeholder='Frontend Developer...' disabled={loading} />
						{form.formState.errors.position && (
							<p className='text-xs text-destructive'>{form.formState.errors.position.message}</p>
						)}
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='url'>URL (Optional)</Label>
						<Input {...form.register('url')} type='url' placeholder='https://...' disabled={loading} />
						{form.formState.errors.url && (
							<p className='text-xs text-destructive'>{form.formState.errors.url.message}</p>
						)}
					</div>
					<div className='grid gap-2'>
						<div className='grid grid-cols-2 gap-3'>
							<div className='grid gap-2'>
								<Label htmlFor='salary'>Salary (Optional)</Label>
								<Input {...form.register('salary')} placeholder='$120k/year, 3000$/month' disabled={loading} />
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='location'>Location (Optional)</Label>
								<Input {...form.register('location')} placeholder='Remote, Kyiv...' disabled={loading} />
							</div>
						</div>
						<p className='text-xs text-muted-foreground'>Any format for salary — yearly, monthly, range</p>
					</div>
					<TagSelector
						tags={tags}
						onAdd={newTag => append(newTag)}
						onRemove={index => remove(index)}
						disabled={loading}
					/>
					{(serverError || form.formState.errors.tags) && (
						<p className='text-sm text-destructive'>{serverError || form.formState.errors.tags?.message}</p>
					)}
					<DialogFooter className='bg-transparent pr-4 pt-2 pb-0'>
						<Button type='submit' disabled={loading || !form.formState.isDirty}>
							{loading ? 'Creating...' : 'Create'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
