'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

interface NoteEditorModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onSave: (content: string) => Promise<void>
	initialValue?: string
	title?: string
}

export function NoteEditorModal({
	open,
	onOpenChange,
	onSave,
	initialValue = '',
	title = 'Note',
}: NoteEditorModalProps) {
	const [content, setContent] = useState(initialValue)
	const [isSaving, setIsSaving] = useState(false)

	const handleSave = async () => {
		if (!content.trim()) return
		setIsSaving(true)
		await onSave(content)
		setIsSaving(false)
		onOpenChange(false)
		setContent('')
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[525px]'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<div className='py-4'>
					<Textarea
						value={content}
						onChange={e => setContent(e.target.value)}
						placeholder='Write your thoughts here...'
						className='min-h-[200px] resize-none focus-visible:ring-1'
						autoFocus
					/>
				</div>
				<DialogFooter>
					<Button variant='ghost' onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={handleSave} disabled={isSaving || !content.trim()}>
						{isSaving ? 'Saving...' : 'Save Note'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
