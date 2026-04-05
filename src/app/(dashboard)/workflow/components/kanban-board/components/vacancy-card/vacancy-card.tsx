'use client'

import { cn } from '@/lib/utils'
import { Vacancy } from '@/types/kanban'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ExternalLink, MapPin } from 'lucide-react'
import Link from 'next/link'

interface VacancyCardProps {
	vacancy: Vacancy
	overlay?: boolean
	onVacancyClick: (vacancy: Vacancy) => void
}

export function VacancyCard({ vacancy, overlay, onVacancyClick }: VacancyCardProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: vacancy.id,
		data: { type: 'vacancy', vacancy },
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	const tags = vacancy.vacancy_tags?.flatMap(vt => vt.tags) ?? []
	const visibleTags = tags.slice(0, 2)
	const hiddenCount = tags.length - visibleTags.length

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
			onClick={() => !isDragging && onVacancyClick(vacancy)}
		>
			<div className='flex flex-col gap-1.5'>
				<div className='flex items-start justify-between gap-2'>
					<div>
						<p className='text-sm font-medium leading-tight line-clamp-1'>{vacancy.position}</p>
						<p className='text-xs text-muted-foreground mt-0.5 line-clamp-2'>{vacancy.company}</p>
					</div>
					{vacancy.url && (
						<Link
							href={vacancy.url}
							target='_blank'
							rel='noopener noreferrer'
							onClick={e => e.stopPropagation()}
							className='shrink-0 p-1 rounded hover:bg-muted transition-colors'
						>
							<ExternalLink className='size-4 text-muted-foreground' />
						</Link>
					)}
				</div>
				{visibleTags.length > 0 && (
					<div className='flex flex-wrap gap-1'>
						{visibleTags.map(tag => (
							<span
								key={tag.id}
								className='text-xs px-1.5 py-0.5 rounded-md font-medium'
								style={{
									backgroundColor: tag.color + '20',
									color: tag.color,
								}}
							>
								{tag.name}
							</span>
						))}
						{hiddenCount > 0 && (
							<span className='text-xs px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground'>+{hiddenCount}</span>
						)}
					</div>
				)}
				{(vacancy.location || vacancy.salary) && (
					<div className='flex items-center justify-between gap-2 mt-0.5'>
						{vacancy.location && (
							<div className='flex items-center gap-1 min-w-0'>
								<MapPin className='size-3 text-muted-foreground shrink-0' />
								<span className='text-xs text-muted-foreground truncate'>{vacancy.location}</span>
							</div>
						)}
						{vacancy.salary && <span className='text-xs text-muted-foreground shrink-0 ml-auto'>{vacancy.salary}</span>}
					</div>
				)}
			</div>
		</div>
	)
}
