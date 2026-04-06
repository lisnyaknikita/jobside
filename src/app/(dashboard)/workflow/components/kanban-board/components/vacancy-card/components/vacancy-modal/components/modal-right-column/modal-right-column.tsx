'use client'

import { Column, Tag, Vacancy } from '@/types/kanban'
import { VacancyTagsEditor } from '../vacancy-tags-editor/vacancy-tags-editor'

interface ModalRightColumnProps {
	vacancy: Vacancy
	columns: Column[]
	tags: Tag[]
	onFieldChange: (field: keyof Vacancy, value: string) => void
	onStatusChange: (columnId: string) => void
}

export function ModalRightColumn({ vacancy, columns, tags, onFieldChange, onStatusChange }: ModalRightColumnProps) {
	return (
		<div className='w-52 shrink-0 px-5 py-5 flex flex-col gap-5'>
			<div>
				<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2'>Status</p>
				<select
					value={vacancy.column_id ?? ''}
					onChange={e => onStatusChange(e.target.value)}
					className='w-full text-sm bg-muted/40 rounded-lg px-3 py-2 border border-transparent focus:border-border focus:outline-none'
				>
					{columns.map(col => (
						<option key={col.id} value={col.id}>
							{col.name}
						</option>
					))}
				</select>
			</div>

			<div>
				<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2'>Tags</p>
				<VacancyTagsEditor key={vacancy.id} vacancyId={vacancy.id} tags={tags} />
			</div>

			{[
				{ field: 'salary' as const, label: 'Salary', placeholder: 'Add salary...' },
				{ field: 'location' as const, label: 'Location', placeholder: 'Add location...' },
				{ field: 'contact' as const, label: 'Contact', placeholder: 'Add recruiter contact...' },
			].map(({ field, label, placeholder }) => (
				<div key={field}>
					<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2'>{label}</p>
					<input
						defaultValue={vacancy[field] ?? ''}
						onChange={e => onFieldChange(field, e.target.value)}
						placeholder={placeholder}
						className='w-full text-sm bg-muted/40 rounded-lg px-3 py-2 border border-transparent focus:border-border focus:outline-none placeholder:text-muted-foreground/50'
					/>
				</div>
			))}

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
	)
}
