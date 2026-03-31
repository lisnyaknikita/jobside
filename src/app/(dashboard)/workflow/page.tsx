import { createClient } from '@/lib/supabase/server'
import { resolveActiveSpace } from '@/lib/utils/resolve-active-space'
import { KanbanBoard } from './components/kanban-board/kanban-board'
import { SetLastSpace } from './components/set-last-space/set-last-space'

interface WorkflowPageProps {
	searchParams: Promise<{ space?: string }>
}

export default async function WorkflowPage({ searchParams }: WorkflowPageProps) {
	const { space: spaceId } = await searchParams
	const space = await resolveActiveSpace(spaceId)

	if (!space) return null

	const supabase = await createClient()

	const { data: columns } = await supabase
		.from('columns')
		.select('id, name, type, position')
		.eq('space_id', space.id)
		.order('position')

	const { data: vacancies } = await supabase
		.from('vacancies')
		.select('id, position, company, description, url, order, deadline, created_at, column_id')
		.eq('space_id', space.id)
		.order('order')

	console.log(columns)

	return (
		<div className='flex flex-col h-full p-6'>
			<SetLastSpace spaceId={space.id} />
			<div className='mb-6'>
				<h1 className='text-2xl font-medium'>{space.name}</h1>
			</div>
			<KanbanBoard spaceId={space.id} initialColumns={columns ?? []} initialVacancies={vacancies ?? []} />
		</div>
	)
}
