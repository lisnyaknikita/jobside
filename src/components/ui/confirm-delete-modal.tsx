'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

interface ConfirmDeleteModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onConfirm: () => Promise<void>
	title?: string
	description?: string
	confirmText?: string
}

export function ConfirmDeleteModal({
	open,
	onOpenChange,
	onConfirm,
	title = 'Are you absolutely sure?',
	description = 'This action cannot be undone. This will permanently delete the item.',
	confirmText = 'Delete',
}: ConfirmDeleteModalProps) {
	const [isLoading, setIsLoading] = useState(false)

	const handleConfirm = async () => {
		setIsLoading(true)
		try {
			await onConfirm()
			onOpenChange(false)
		} catch (error) {
			console.error('Delete failed:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter className='gap-2 sm:gap-0'>
					<Button variant='ghost' onClick={() => onOpenChange(false)} disabled={isLoading}>
						Cancel
					</Button>
					<Button variant='destructive' onClick={handleConfirm} disabled={isLoading}>
						{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
						{confirmText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
