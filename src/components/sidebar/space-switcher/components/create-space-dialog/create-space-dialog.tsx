'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ICON_MAP, IconOption } from '@/lib/constants/icons'

interface CreateSpaceDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	selectedIcon: IconOption
	onSelectIcon: (icon: IconOption) => void
	onSubmit: (formData: FormData) => void
	loading: boolean
	error: string | null
}

export function CreateSpaceDialog({
	open,
	onOpenChange,
	selectedIcon,
	onSelectIcon,
	onSubmit,
	loading,
	error,
}: CreateSpaceDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-sm'>
				<DialogHeader>
					<DialogTitle>New Space</DialogTitle>
				</DialogHeader>
				<form action={onSubmit} className='flex flex-col gap-4'>
					{error && <p className='text-sm text-destructive'>{error}</p>}
					<Input name='name' placeholder='e.g. Frontend' required autoFocus />
					<div className='flex flex-col gap-2'>
						<span className='text-sm text-muted-foreground'>Icon</span>
						<div className='grid grid-cols-5 gap-2 justify-items-center'>
							{(Object.entries(ICON_MAP) as [IconOption, React.ElementType][]).map(([key, Icon]) => (
								<button
									key={key}
									type='button'
									onClick={() => onSelectIcon(key)}
									className={`flex items-center justify-center size-10 rounded-lg border transition-colors
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
					<Button type='submit' disabled={loading}>
						{loading ? 'Creating...' : 'Create Space'}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
