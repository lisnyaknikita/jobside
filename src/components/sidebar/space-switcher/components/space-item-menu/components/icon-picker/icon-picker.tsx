'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ICON_MAP, IconOption } from '@/lib/constants/icons'

interface IconPickerProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onSelect: (icon: IconOption) => void
	current: string
}

export function IconPicker({ open, onOpenChange, onSelect, current }: IconPickerProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='max-w-[320px] p-4 h-auto'>
				<DialogHeader className='text-left mb-2'>
					<DialogTitle className='text-sm font-medium'>Select an icon</DialogTitle>
					<DialogDescription className='sr-only'>Choose a new icon for this space.</DialogDescription>
				</DialogHeader>
				<div className='grid grid-cols-5 gap-1.5'>
					{(Object.entries(ICON_MAP) as [IconOption, React.ElementType][]).map(([key, Icon]) => (
						<button
							key={key}
							type='button'
							onClick={() => onSelect(key)}
							className={`flex items-center justify-center size-10 rounded-md transition-colors
                ${current === key ? 'bg-primary text-primary-foreground' : 'hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring'}`}
						>
							<Icon className='size-5' />
						</button>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}
