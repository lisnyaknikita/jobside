'use client'

import { Note } from '@/types/kanban'
import { Trash2 } from 'lucide-react'

interface NotesListProps {
	notes: Note[]
	onDelete: (id: string) => void
	onNoteClick: (note: Note) => void
}

export function NotesList({ notes, onDelete, onNoteClick }: NotesListProps) {
	if (notes.length === 0) {
		return <p className='text-sm text-muted-foreground/50 py-1'>No notes yet...</p>
	}

	return (
		<div className='flex flex-col gap-1.5 max-h-32.5 overflow-y-auto'>
			{notes.map(note => (
				<div
					key={note.id}
					onClick={() => onNoteClick(note)}
					className='flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 group cursor-pointer'
				>
					<p className='flex-1 text-sm leading-relaxed truncate'>{note.content}</p>
					<div className='flex items-center gap-2 shrink-0'>
						<span className='text-xs text-muted-foreground'>
							{new Date(note.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
						</span>
						<button
							onClick={e => {
								e.stopPropagation()
								onDelete(note.id)
							}}
							className='opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive'
						>
							<Trash2 className='size-3.5' />
						</button>
					</div>
				</div>
			))}
		</div>
	)
}
