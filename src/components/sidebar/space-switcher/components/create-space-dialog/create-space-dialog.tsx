'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ICON_MAP, IconOption } from '@/lib/constants/icons'
import { SpaceFormValues, spaceSchema } from '@/lib/validations/space'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface CreateSpaceDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onSubmit: (values: SpaceFormValues) => void
	loading: boolean
	serverError: string | null
}

export function CreateSpaceDialog({ open, onOpenChange, onSubmit, loading, serverError }: CreateSpaceDialogProps) {
	const form = useForm<SpaceFormValues>({
		resolver: zodResolver(spaceSchema),
		defaultValues: {
			name: '',
			icon: 'briefcase',
		},
	})

	const selectedIcon = form.watch('icon')

	const handleClose = (isOpen: boolean) => {
		onOpenChange(isOpen)
		if (!isOpen) form.reset()
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className='sm:max-w-sm'>
				<DialogHeader>
					<DialogTitle>New Space</DialogTitle>
				</DialogHeader>
				<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
					{(serverError || form.formState.errors.name) && (
						<p className='text-sm text-destructive'>{serverError || form.formState.errors.name?.message}</p>
					)}
					<Input {...form.register('name')} placeholder='e.g. Frontend' autoFocus disabled={loading} />
					<div className='flex flex-col gap-2'>
						<span className='text-sm text-muted-foreground'>Icon</span>
						<div className='grid grid-cols-5 gap-2 justify-items-center'>
							{(Object.entries(ICON_MAP) as [IconOption, React.ElementType][]).map(([key, Icon]) => (
								<button
									key={key}
									type='button'
									onClick={() => form.setValue('icon', key, { shouldDirty: true })}
									className={`flex items-center justify-center size-10 rounded-lg border transition-all hover:scale-105
                    ${
											selectedIcon === key
												? 'bg-primary text-primary-foreground border-primary'
												: 'hover:bg-muted border-transparent'
										}`}
								>
									<Icon className='size-4' />
								</button>
							))}
						</div>
					</div>
					<Button type='submit' disabled={loading || !form.formState.isDirty}>
						{loading ? 'Creating...' : 'Create Space'}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
