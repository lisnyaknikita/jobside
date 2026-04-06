'use client'

import { ConfirmDeleteModal } from '@/components/ui/confirm-delete-modal'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useVacancyModal } from '@/hooks/use-vacancy-modal'
import { Column, Vacancy } from '@/types/kanban'
import { useEffect } from 'react'
import { ModalLeftColumn } from './components/modal-left-column/modal-left-column'
import { ModalRightColumn } from './components/modal-right-column/modal-right-column'
import { NoteEditorModal } from './components/note-editor-modal/note-editor-modal'

interface VacancyModalProps {
	vacancy: Vacancy
	columns: Column[]
	open: boolean
	onOpenChange: (open: boolean) => void
	onUpdate: (updated: Partial<Vacancy>) => void
	onDelete: (id: string) => void
}

export function VacancyModal({ vacancy, columns, open, onOpenChange, onUpdate, onDelete }: VacancyModalProps) {
	const {
		notes,
		isNotesLoading,
		showDeleteConfirm,
		setShowDeleteConfirm,
		isNoteEditorOpen,
		editingNote,
		noteToDeleteId,
		setNoteToDeleteId,
		loadNotes,
		handleFieldChange,
		handleStatusChange,
		handleSaveNote,
		handleDeleteNote,
		handleDeleteVacancy,
		openNoteEditor,
		closeNoteEditor,
	} = useVacancyModal({
		vacancy,
		onUpdate,
		onDelete,
		onClose: () => onOpenChange(false),
	})

	useEffect(() => {
		if (open) loadNotes()
	}, [open, vacancy.id])

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

					<div className='flex overflow-y-auto max-h-[70vh]'>
						<ModalLeftColumn
							vacancy={vacancy}
							notes={notes}
							isNotesLoading={isNotesLoading}
							onFieldChange={handleFieldChange}
							onAddNote={() => openNoteEditor()}
							onNoteClick={openNoteEditor}
							onNoteDelete={setNoteToDeleteId}
							onDeleteVacancy={() => setShowDeleteConfirm(true)}
						/>
						<ModalRightColumn
							vacancy={vacancy}
							columns={columns}
							tags={tags}
							onFieldChange={handleFieldChange}
							onStatusChange={handleStatusChange}
						/>
					</div>
				</DialogContent>
			</Dialog>
			<ConfirmDeleteModal
				open={showDeleteConfirm}
				onOpenChange={setShowDeleteConfirm}
				onConfirm={handleDeleteVacancy}
				title='Delete Vacancy'
				description={`Are you sure you want to delete the position at ${vacancy.company}?`}
			/>
			<ConfirmDeleteModal
				open={!!noteToDeleteId}
				onOpenChange={open => !open && setNoteToDeleteId(null)}
				onConfirm={async () => {
					if (noteToDeleteId) {
						await handleDeleteNote(noteToDeleteId)
					}
				}}
				title='Delete Note'
				description='Are you sure you want to delete this note? This action cannot be undone.'
			/>
			<NoteEditorModal
				key={editingNote ? editingNote.id : isNoteEditorOpen ? 'new' : 'closed'}
				open={isNoteEditorOpen}
				onOpenChange={open => {
					if (!open) closeNoteEditor()
				}}
				onSave={handleSaveNote}
				initialValue={editingNote?.content ?? ''}
				title={editingNote ? 'Edit Note' : 'Add New Note'}
			/>
		</>
	)
}
