'use client'

import { NotesSkeleton } from '@/components/ui/notes-skeleton'
import { cn } from '@/lib/utils'
import { Note, Vacancy } from '@/types/kanban'
import { ExternalLink, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { NotesList } from '../notes-list/notes-list'

interface ModalLeftColumnProps {
	vacancy: Vacancy
	notes: Note[]
	isNotesLoading: boolean
	onFieldChange: (field: keyof Vacancy, value: string) => void
	onAddNote: () => void
	onNoteClick: (note: Note) => void
	onNoteDelete: (id: string) => void
	onDeleteVacancy: () => void
}

export function ModalLeftColumn({
	vacancy,
	notes,
	isNotesLoading,
	onFieldChange,
	onAddNote,
	onNoteClick,
	onNoteDelete,
	onDeleteVacancy,
}: ModalLeftColumnProps) {
	const descriptionRef = useRef<HTMLTextAreaElement>(null)

	return (
		<div className='flex-1 px-6 py-5 flex flex-col gap-6 min-w-0 border-r'>
			<div>
				<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2'>Description</p>
				<textarea
					ref={descriptionRef}
					defaultValue={vacancy.description ?? ''}
					onChange={e => onFieldChange('description', e.target.value)}
					placeholder='Add description...'
					rows={4}
					className='w-full text-sm bg-muted/40 rounded-lg p-3 border border-transparent focus:border-border focus:outline-none resize-none placeholder:text-muted-foreground/50'
				/>
			</div>

			<div>
				<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2'>Notes</p>
				{isNotesLoading ? (
					<NotesSkeleton />
				) : (
					<NotesList notes={notes} onDelete={onNoteDelete} onNoteClick={onNoteClick} />
				)}
				<div className='mt-2'>
					<button
						onClick={onAddNote}
						className={cn(
							'w-full text-left px-3 py-2 rounded-lg border border-transparent bg-muted/40',
							'transition-all hover:bg-muted flex items-center gap-2 group'
						)}
					>
						<span
							className={cn(
								'text-sm truncate flex-1',
								notes.length === 0 ? 'text-muted-foreground/50' : 'text-muted-foreground'
							)}
						>
							Add a note
						</span>
						<Plus className='size-3.5 text-muted-foreground/50 group-hover:text-muted-foreground shrink-0' />
					</button>
				</div>
			</div>

			<div>
				<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2'>Cover letter</p>
				<Link
					href={`/ai-lab?vacancy=${vacancy.id}`}
					className='flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border hover:bg-muted transition-colors text-sm text-muted-foreground'
				>
					<ExternalLink className='size-3.5' />
					Generate with AI Lab
				</Link>
			</div>

			<div className='flex items-center gap-1 mt-auto'>
				{vacancy.url && (
					<Link
						href={vacancy.url}
						target='_blank'
						rel='noopener noreferrer'
						className='p-1.5 rounded-md hover:bg-muted transition-colors'
					>
						<ExternalLink className='size-4 text-muted-foreground' />
					</Link>
				)}
				<button
					onClick={onDeleteVacancy}
					className='p-1.5 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors'
				>
					<Trash2 className='size-4 text-muted-foreground' />
				</button>
			</div>
		</div>
	)
}
