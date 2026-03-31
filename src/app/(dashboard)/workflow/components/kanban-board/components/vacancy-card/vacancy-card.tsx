'use client'

import { cn } from '@/lib/utils'
import { Vacancy } from '@/types/kanban'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface VacancyCardProps {
	vacancy: Vacancy
	overlay?: boolean
}

export function VacancyCard({ vacancy, overlay }: VacancyCardProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: vacancy.id,
		data: { type: 'vacancy', vacancy },
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={cn(
				'bg-background rounded-lg p-3 border cursor-grab active:cursor-grabbing',
				'hover:border-primary/40 hover:shadow-sm transition-all',
				isDragging && 'opacity-40',
				overlay && 'shadow-lg rotate-1 cursor-grabbing'
			)}
		>
			<div className='flex flex-col gap-1.5'>
				<div className='flex items-start justify-between gap-2'>
					<div>
						<p className='text-sm font-medium leading-tight'>{vacancy.position}</p>
						<p className='text-xs text-muted-foreground mt-0.5'>{vacancy.company}</p>
					</div>
					{vacancy.url && (
						<Link
							href={vacancy.url}
							target='_blank'
							rel='noopener noreferrer'
							onClick={e => e.stopPropagation()}
							className='shrink-0 p-1 rounded hover:bg-muted transition-colors'
						>
							<ExternalLink className='size-3 text-muted-foreground' />
						</Link>
					)}
				</div>

				{vacancy.deadline && (
					<div className='flex items-center gap-1 mt-1'>
						<Calendar className='size-3 text-muted-foreground' />
						<span className='text-xs text-muted-foreground'>
							{new Date(vacancy.deadline).toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric',
							})}
						</span>
					</div>
				)}
			</div>
		</div>
	)
}
