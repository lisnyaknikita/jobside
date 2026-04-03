'use client'

import { ConfirmDeleteModal } from '@/components/ui/confirm-delete-modal'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { NotesSkeleton } from '@/components/ui/notes-skeleton'
import {
	createNoteAction,
	deleteNoteAction,
	deleteVacancyAction,
	updateNoteAction,
	updateVacancyAction,
} from '@/lib/actions/vacancies'
import { cn } from '@/lib/utils'
import { Column, Note, Vacancy } from '@/types/kanban'
import { ExternalLink, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { NoteEditorModal } from './components/note-editor-modal/note-editor-modal'
import { NotesList } from './components/notes-list/notes-list'
import { VacancyTagsEditor } from './components/vacancy-tags-editor/vacancy-tags-editor'

interface VacancyModalProps {
	vacancy: Vacancy
	columns: Column[]
	open: boolean
	onOpenChange: (open: boolean) => void
	onUpdate: (updated: Partial<Vacancy>) => void
	onDelete: (id: string) => void
}

export function VacancyModal({ vacancy, columns, open, onOpenChange, onUpdate, onDelete }: VacancyModalProps) {
	const [notes, setNotes] = useState<Note[]>([])
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
	const [isNoteEditorOpen, setIsNoteEditorOpen] = useState(false)
	const [editingNote, setEditingNote] = useState<Note | null>(null)
	const [noteToDeleteId, setNoteIdToDelete] = useState<string | null>(null)
	const [isNotesLoading, setIsNotesLoading] = useState(true)

	const descriptionRef = useRef<HTMLTextAreaElement>(null)
	const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(() => {
		if (!open) return
		fetch(`/api/notes?vacancy_id=${vacancy.id}`)
			.then(r => r.json())
			.then(data => setNotes(data ?? []))
			.finally(() => setIsNotesLoading(false))
	}, [open, vacancy.id])

	function handleFieldChange(field: keyof Vacancy, value: string) {
		onUpdate({ [field]: value })
		clearTimeout(saveTimer.current!)
		saveTimer.current = setTimeout(() => {
			updateVacancyAction(vacancy.id, { [field]: value })
		}, 600)
	}

	async function handleSaveNote(content: string) {
		if (editingNote) {
			const result = await updateNoteAction(editingNote.id, content)
			if (result.data) {
				setNotes(prev => prev.map(n => (n.id === editingNote.id ? result.data! : n)))
			}
		} else {
			const result = await createNoteAction(vacancy.id, content)
			if (result.data) setNotes(prev => [...prev, result.data!])
		}
		setEditingNote(null)
		setIsNoteEditorOpen(false)
	}

	function initiateNoteDelete(id: string) {
		setNoteIdToDelete(id)
	}

	async function handleDeleteNote(noteId: string) {
		await deleteNoteAction(noteId)
		setNotes(prev => prev.filter(n => n.id !== noteId))
	}

	async function handleDelete() {
		await deleteVacancyAction(vacancy.id)
		onDelete(vacancy.id)
		onOpenChange(false)
	}

	async function handleStatusChange(columnId: string) {
		onUpdate({ column_id: columnId })
		await updateVacancyAction(vacancy.id, { column_id: columnId })
	}

	const tags = vacancy.vacancy_tags?.flatMap(vt => vt.tags) ?? []

	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className='sm:max-w-2xl p-0 gap-0 overflow-hidden'>
					<DialogTitle className='px-10 py-4 border-b'>
						<div className='flex-1 min-w-0'>
							<input
								defaultValue={vacancy.position}
								onChange={e => handleFieldChange('position', e.target.value)}
								className='w-full text-lg font-medium bg-transparent border-none outline-none focus:ring-0 p-0'
							/>
							<input
								defaultValue={vacancy.company}
								onChange={e => handleFieldChange('company', e.target.value)}
								className='w-full text-sm text-muted-foreground bg-transparent border-none outline-none focus:ring-0 p-0 mt-0.5'
							/>
						</div>
					</DialogTitle>

					{/* Body */}
					<div className='flex overflow-y-auto max-h-[70vh]'>
						{/* Left */}
						<div className='flex-1 px-6 py-5 flex flex-col gap-6 min-w-0 border-r'>
							{/* Description */}
							<div>
								<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2'>Description</p>
								<textarea
									ref={descriptionRef}
									defaultValue={vacancy.description ?? ''}
									onChange={e => handleFieldChange('description', e.target.value)}
									placeholder='Add description...'
									rows={4}
									className='w-full text-sm bg-muted/40 rounded-lg p-3 border border-transparent focus:border-border focus:outline-none resize-none placeholder:text-muted-foreground/50'
								/>
							</div>

							{/* Notes */}
							<div>
								<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2'>Notes</p>
								{isNotesLoading ? (
									<NotesSkeleton />
								) : (
									<NotesList
										notes={notes}
										onDelete={initiateNoteDelete}
										onNoteClick={note => {
											setEditingNote(note)
											setIsNoteEditorOpen(true)
										}}
									/>
								)}
								<div className='mt-2'>
									<button
										onClick={() => setIsNoteEditorOpen(true)}
										className={cn(
											'w-full text-left px-3 py-2 rounded-lg border border-transparent bg-muted/40 transition-all hover:bg-muted group',
											'flex items-center gap-2'
										)}
									>
										<span
											className={cn(
												'text-sm truncate flex-1 line-clamp-1',
												notes.length === 0 ? 'text-muted-foreground/50' : 'text-muted-foreground'
											)}
										>
											Add a note
										</span>
										<Plus className='size-3.5 text-muted-foreground/50 group-hover:text-muted-foreground shrink-0' />
									</button>
								</div>
							</div>

							{/* Cover Letter */}
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
							<div className='flex items-center gap-1 shrink-0 mt-auto'>
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
									onClick={() => setShowDeleteConfirm(true)}
									className='p-1.5 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors'
								>
									<Trash2 className='size-4 text-muted-foreground' />
								</button>
							</div>
						</div>

						{/* Right */}
						<div className='w-52 shrink-0 px-5 py-5 flex flex-col gap-5'>
							{/* Status */}
							<div>
								<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2'>Status</p>
								<select
									value={vacancy.column_id ?? ''}
									onChange={e => handleStatusChange(e.target.value)}
									className='w-full text-sm bg-muted/40 rounded-lg px-3 py-2 border border-transparent focus:border-border focus:outline-none'
								>
									{columns.map(col => (
										<option key={col.id} value={col.id}>
											{col.name}
										</option>
									))}
								</select>
							</div>

							{/* Tags */}
							<div>
								<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2'>Tags</p>
								<VacancyTagsEditor vacancyId={vacancy.id} tags={tags} />
							</div>

							{/* Salary */}
							<div>
								<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2'>Salary</p>
								<input
									defaultValue={vacancy.salary ?? ''}
									onChange={e => handleFieldChange('salary', e.target.value)}
									placeholder='Add salary...'
									className='w-full text-sm bg-muted/40 rounded-lg px-3 py-2 border border-transparent focus:border-border focus:outline-none placeholder:text-muted-foreground/50'
								/>
							</div>

							{/* Location */}
							<div>
								<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2'>Location</p>
								<input
									defaultValue={vacancy.location ?? ''}
									onChange={e => handleFieldChange('location', e.target.value)}
									placeholder='Add location...'
									className='w-full text-sm bg-muted/40 rounded-lg px-3 py-2 border border-transparent focus:border-border focus:outline-none placeholder:text-muted-foreground/50'
								/>
							</div>

							{/* Contact */}
							<div>
								<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2'>Contact</p>
								<input
									defaultValue={vacancy.contact ?? ''}
									onChange={e => handleFieldChange('contact', e.target.value)}
									placeholder='Add recruiter contact...'
									className='w-full text-sm bg-muted/40 rounded-lg px-3 py-2 border border-transparent focus:border-border focus:outline-none placeholder:text-muted-foreground/50'
								/>
							</div>

							{/* Created */}
							<div className='mt-auto pt-4 border-t'>
								<p className='text-xs text-muted-foreground'>
									Added{' '}
									{new Date(vacancy.created_at).toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
										year: 'numeric',
									})}
								</p>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
			<ConfirmDeleteModal
				open={showDeleteConfirm}
				onOpenChange={setShowDeleteConfirm}
				onConfirm={handleDelete}
				title='Delete Vacancy'
				description={`Are you sure you want to delete the position at ${vacancy.company}?`}
			/>
			<ConfirmDeleteModal
				open={!!noteToDeleteId}
				onOpenChange={open => !open && setNoteIdToDelete(null)}
				onConfirm={async () => {
					if (noteToDeleteId) {
						await handleDeleteNote(noteToDeleteId)
						setNoteIdToDelete(null)
					}
				}}
				title='Delete Note'
				description='Are you sure you want to delete this note? This action cannot be undone.'
			/>
			<NoteEditorModal
				key={editingNote ? editingNote.id : isNoteEditorOpen ? 'new' : 'closed'}
				open={isNoteEditorOpen}
				onOpenChange={open => {
					setIsNoteEditorOpen(open)
					if (!open) setEditingNote(null)
				}}
				onSave={handleSaveNote}
				initialValue={editingNote?.content ?? ''}
				title={editingNote ? 'Edit Note' : 'Add New Note'}
			/>
		</>
	)
}
