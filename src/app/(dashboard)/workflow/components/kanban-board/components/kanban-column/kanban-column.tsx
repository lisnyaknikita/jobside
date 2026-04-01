'use client'

import { Column, Vacancy } from '@/types/kanban'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { VacancyCard } from '../vacancy-card/vacancy-card'
import { CreateVacancyDialog } from './components/create-vacancy-dialog/create-vacancy-dialog'

interface KanbanColumnProps {
	column: Column
	vacancies: Vacancy[]
	spaceId: string
	onVacancyCreated: (vacancy: Vacancy) => void
}

export function KanbanColumn({ spaceId, onVacancyCreated, column, vacancies }: KanbanColumnProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const { setNodeRef } = useDroppable({
		id: column.id,
		data: { type: 'column', column },
	})

	const vacancyIds = vacancies.map(v => v.id)

	return (
		<div className='flex flex-col w-72 shrink-0'>
			<div className='flex items-center justify-between mb-3'>
				<div className='flex items-center gap-2'>
					<span className='text-sm font-medium'>{column.name}</span>
					<span className='text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5'>{vacancies.length}</span>
				</div>
				<button onClick={() => setIsDialogOpen(true)} className='p-1 rounded-md hover:bg-muted transition-colors'>
					<Plus className='size-4 text-muted-foreground' />
				</button>
			</div>
			<div ref={setNodeRef} className='flex flex-col gap-2 flex-1 min-h-20 rounded-xl bg-muted/40 p-2'>
				<SortableContext items={vacancyIds} strategy={verticalListSortingStrategy}>
					{vacancies.map(vacancy => (
						<VacancyCard key={vacancy.id} vacancy={vacancy} />
					))}
				</SortableContext>
			</div>
			<CreateVacancyDialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				columnId={column.id}
				spaceId={spaceId}
				onSuccess={onVacancyCreated}
			/>
		</div>
	)
}
