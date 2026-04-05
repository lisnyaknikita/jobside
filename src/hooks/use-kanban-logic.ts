import { updateVacancyColumnAction } from '@/lib/actions/vacancies'
import { Vacancy } from '@/types/kanban'
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useCallback, useState } from 'react'

export function useKanbanLogic(initialVacancies: Vacancy[]) {
	const [vacancies, setVacancies] = useState(initialVacancies)
	const [activeVacancy, setActiveVacancy] = useState<Vacancy | null>(null)
	const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null)

	const onDragStart = useCallback((event: DragStartEvent) => {
		const { active } = event
		if (active.data.current?.type === 'vacancy') {
			setActiveVacancy(active.data.current.vacancy)
		}
	}, [])

	const onDragOver = useCallback((event: DragOverEvent) => {
		const { active, over } = event
		if (!over) return

		const activeId = active.id
		const overId = over.id
		if (activeId === overId) return

		const isActiveVacancy = active.data.current?.type === 'vacancy'
		if (!isActiveVacancy) return

		const isOverVacancy = over.data.current?.type === 'vacancy'
		const isOverColumn = over.data.current?.type === 'column'

		setVacancies(prev => {
			const activeIndex = prev.findIndex(v => v.id === activeId)
			const updated = [...prev]

			if (isOverVacancy) {
				const overIndex = prev.findIndex(v => v.id === overId)
				if (prev[activeIndex].column_id !== prev[overIndex].column_id) {
					updated[activeIndex] = { ...updated[activeIndex], column_id: prev[overIndex].column_id }
					return arrayMove(updated, activeIndex, overIndex)
				}
				return arrayMove(prev, activeIndex, overIndex)
			}

			if (isOverColumn) {
				updated[activeIndex] = { ...updated[activeIndex], column_id: overId as string }
				return arrayMove(updated, activeIndex, activeIndex)
			}

			return prev
		})
	}, [])

	const onDragEnd = useCallback(
		async (event: DragEndEvent) => {
			setActiveVacancy(null)
			const { active, over } = event
			if (!over) return

			const vacancy = vacancies.find(v => v.id === active.id)
			if (!vacancy) return

			await updateVacancyColumnAction(
				vacancy.id,
				vacancy.column_id,
				vacancies.filter(v => v.column_id === vacancy.column_id).map((v, i) => ({ id: v.id, order: i }))
			)
		},
		[vacancies]
	)

	const handleVacancyUpdate = useCallback(
		(updated: Partial<Vacancy>) => {
			setVacancies(prev => prev.map(v => (v.id === selectedVacancy?.id ? { ...v, ...updated } : v)))
			setSelectedVacancy(prev => (prev ? { ...prev, ...updated } : null))
		},
		[selectedVacancy?.id]
	)

	const handleVacancyDelete = useCallback((id: string) => {
		setVacancies(prev => prev.filter(v => v.id !== id))
		setSelectedVacancy(null)
	}, [])

	const addVacancy = useCallback((newVacancy: Vacancy) => {
		setVacancies(prev => [...prev, newVacancy])
	}, [])

	return {
		vacancies,
		activeVacancy,
		selectedVacancy,
		setSelectedVacancy,
		onDragStart,
		onDragOver,
		onDragEnd,
		handleVacancyUpdate,
		handleVacancyDelete,
		addVacancy,
	}
}
