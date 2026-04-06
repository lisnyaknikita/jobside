'use client'

import { useKanbanLogic } from '@/hooks/use-kanban-logic'
import { Column, Vacancy } from '@/types/kanban'
import {
	DndContext,
	DragOverlay,
	PointerSensor,
	TouchSensor,
	closestCorners,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
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
	const {
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
	} = useKanbanLogic(initialVacancies)

	const [mounted, setMounted] = useState(false)
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
		useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } })
	)

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true)
	}, [])

	if (!mounted) return null

	const columnIds = initialColumns.map(c => c.id)

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
							{initialColumns.map(column => (
								<KanbanColumn
									key={column.id}
									column={column}
									spaceId={spaceId!}
									vacancies={vacancies.filter(v => v.column_id === column.id)}
									onVacancyCreated={addVacancy}
									onVacancyClick={setSelectedVacancy}
								/>
							))}
						</SortableContext>

						{mounted &&
							createPortal(
								<DragOverlay>
									{activeVacancy && <VacancyCard vacancy={activeVacancy} overlay onVacancyClick={setSelectedVacancy} />}
								</DragOverlay>,
								document.body
							)}
					</DndContext>
				</div>
			</div>
			{selectedVacancy && (
				<VacancyModal
					vacancy={selectedVacancy}
					columns={initialColumns}
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
