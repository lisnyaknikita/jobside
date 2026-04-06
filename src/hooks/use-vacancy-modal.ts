'use client'

import {
	createNoteAction,
	deleteNoteAction,
	deleteVacancyAction,
	updateNoteAction,
	updateVacancyAction,
} from '@/lib/actions/vacancies'
import { Note, Vacancy } from '@/types/kanban'
import { useRef, useState } from 'react'

interface UseVacancyModalProps {
	vacancy: Vacancy
	onUpdate: (updated: Partial<Vacancy>) => void
	onDelete: (id: string) => void
	onClose: () => void
}

export function useVacancyModal({ vacancy, onUpdate, onDelete, onClose }: UseVacancyModalProps) {
	const [notes, setNotes] = useState<Note[]>([])
	const [isNotesLoading, setIsNotesLoading] = useState(true)
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
	const [isNoteEditorOpen, setIsNoteEditorOpen] = useState(false)
	const [editingNote, setEditingNote] = useState<Note | null>(null)
	const [noteToDeleteId, setNoteToDeleteId] = useState<string | null>(null)
	const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

	async function loadNotes() {
		setIsNotesLoading(true)
		try {
			const data = await fetch(`/api/notes?vacancy_id=${vacancy.id}`).then(r => r.json())
			setNotes(data ?? [])
		} catch (error) {
			console.error('Failed to load notes:', error)
			setNotes([])
		} finally {
			setIsNotesLoading(false)
		}
	}

	function handleFieldChange(field: keyof Vacancy, value: string) {
		onUpdate({ [field]: value })
		clearTimeout(saveTimer.current!)
		saveTimer.current = setTimeout(() => {
			updateVacancyAction(vacancy.id, { [field]: value })
		}, 600)
	}

	async function handleStatusChange(columnId: string) {
		onUpdate({ column_id: columnId })
		await updateVacancyAction(vacancy.id, { column_id: columnId })
	}

	async function handleSaveNote(content: string) {
		if (editingNote) {
			const result = await updateNoteAction(editingNote.id, content)
			if (result.data) setNotes(prev => prev.map(n => (n.id === editingNote.id ? result.data! : n)))
		} else {
			const result = await createNoteAction(vacancy.id, content)
			if (result.data) setNotes(prev => [...prev, result.data!])
		}
		setEditingNote(null)
		setIsNoteEditorOpen(false)
	}

	async function handleDeleteNote(noteId: string) {
		await deleteNoteAction(noteId)
		setNotes(prev => prev.filter(n => n.id !== noteId))
		setNoteToDeleteId(null)
	}

	async function handleDeleteVacancy() {
		await deleteVacancyAction(vacancy.id)
		onDelete(vacancy.id)
		onClose()
	}

	function openNoteEditor(note?: Note) {
		setEditingNote(note ?? null)
		setIsNoteEditorOpen(true)
	}

	function closeNoteEditor() {
		setIsNoteEditorOpen(false)
		setEditingNote(null)
	}

	return {
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
	}
}
