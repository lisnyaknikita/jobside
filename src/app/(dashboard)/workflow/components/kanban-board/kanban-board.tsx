'use client'

import { updateVacancyColumnAction } from '@/lib/actions/vacancies'
import { Column, Vacancy } from '@/types/kanban'
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	TouchSensor,
	closestCorners,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { KanbanColumn } from './components/kanban-column/kanban-column'
import { VacancyModal } from './components/vacancy-card/components/vacancy-modal/vacancy-modal'
import { VacancyCard } from './components/vacancy-card/vacancy-card'

interface KanbanBoardProps {
	spaceId: string
	initialColumns: Column[]
	initialVacancies: Vacancy[]
}

export function KanbanBoard({ spaceId, initialColumns, initialVacancies }: KanbanBoardProps) {
	const [columns] = useState(initialColumns)
	const [vacancies, setVacancies] = useState(initialVacancies)
	const [activeVacancy, setActiveVacancy] = useState<Vacancy | null>(null)
	const [mounted, setMounted] = useState(false)
	const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null)

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 8 },
		}),
		useSensor(TouchSensor, {
			activationConstraint: { delay: 200, tolerance: 8 },
		})
	)

	function onDragStart(event: DragStartEvent) {
		const { active } = event
		if (active.data.current?.type === 'vacancy') {
			setActiveVacancy(active.data.current.vacancy)
		}
	}

	function onDragOver(event: DragOverEvent) {
		const { active, over } = event
		if (!over) return

		const activeId = active.id
		const overId = over.id

		if (activeId === overId) return

		const isActiveVacancy = active.data.current?.type === 'vacancy'
		const isOverVacancy = over.data.current?.type === 'vacancy'
		const isOverColumn = over.data.current?.type === 'column'

		if (!isActiveVacancy) return

		if (isActiveVacancy && isOverVacancy) {
			setVacancies(prev => {
				const activeIndex = prev.findIndex(v => v.id === activeId)
				const overIndex = prev.findIndex(v => v.id === overId)

				if (prev[activeIndex].column_id !== prev[overIndex].column_id) {
					const updated = [...prev]
					updated[activeIndex] = { ...updated[activeIndex], column_id: prev[overIndex].column_id }
					return arrayMove(updated, activeIndex, overIndex - 1)
				}

				return arrayMove(prev, activeIndex, overIndex)
			})
		}

		if (isActiveVacancy && isOverColumn) {
			setVacancies(prev => {
				const activeIndex = prev.findIndex(v => v.id === activeId)
				const updated = [...prev]
				updated[activeIndex] = { ...updated[activeIndex], column_id: overId as string }
				return arrayMove(updated, activeIndex, activeIndex)
			})
		}
	}

	async function onDragEnd(event: DragEndEvent) {
		setActiveVacancy(null)

		const { active, over } = event
		if (!over) return

		if (active.data.current?.type === 'vacancy') {
			const vacancy = vacancies.find(v => v.id === active.id)
			if (!vacancy) return

			await updateVacancyColumnAction(
				vacancy.id,
				vacancy.column_id,
				vacancies.filter(v => v.column_id === vacancy.column_id).map((v, i) => ({ id: v.id, order: i }))
			)
		}
	}

	const addVacancy = (newVacancy: Vacancy) => {
		setVacancies(prev => [...prev, newVacancy])
	}

	function handleVacancyClick(vacancy: Vacancy) {
		setSelectedVacancy(vacancy)
	}

	function handleVacancyUpdate(updated: Partial<Vacancy>) {
		setVacancies(prev => prev.map(v => (v.id === selectedVacancy?.id ? { ...v, ...updated } : v)))
		if (selectedVacancy) {
			setSelectedVacancy(prev => (prev ? { ...prev, ...updated } : null))
		}
	}

	function handleVacancyDelete(id: string) {
		setVacancies(prev => prev.filter(v => v.id !== id))
		setSelectedVacancy(null)
	}

	const columnIds = columns.map(c => c.id)

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<>
			<div className='flex-1 overflow-x-auto'>
				<div className='flex gap-4 p-6 h-full min-w-max'>
					<DndContext
						sensors={sensors}
						collisionDetection={closestCorners}
						onDragStart={onDragStart}
						onDragOver={onDragOver}
						onDragEnd={onDragEnd}
					>
						<SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
							{columns.map(column => (
								<KanbanColumn
									key={column.id}
									column={column}
									spaceId={spaceId!}
									vacancies={vacancies.filter(v => v.column_id === column.id)}
									onVacancyCreated={addVacancy}
									onVacancyClick={handleVacancyClick}
								/>
							))}
						</SortableContext>

						{mounted &&
							createPortal(
								<DragOverlay>
									{activeVacancy && <VacancyCard vacancy={activeVacancy} overlay onVacancyClick={handleVacancyClick} />}
								</DragOverlay>,
								document.body
							)}
					</DndContext>
				</div>
			</div>
			{selectedVacancy && (
				<VacancyModal
					vacancy={selectedVacancy}
					columns={columns}
					open={!!selectedVacancy}
					onOpenChange={open => {
						if (!open) setSelectedVacancy(null)
					}}
					onUpdate={handleVacancyUpdate}
					onDelete={handleVacancyDelete}
				/>
			)}
		</>
	)
}
