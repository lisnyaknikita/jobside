import { getColumns, getVacancies } from '@/lib/data/workflow'
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
	//TODO: add empty state

	const [columns, vacancies] = await Promise.all([getColumns(space.id), getVacancies(space.id)])

	return (
		<div className='flex flex-col h-full p-6'>
			<SetLastSpace spaceId={space.id} />
			<div className='mb-6'>
				<h1 className='text-2xl font-medium'>{space.name}</h1>
			</div>
			<KanbanBoard
				key={space.id}
				spaceId={space.id}
				initialColumns={columns ?? []}
				initialVacancies={vacancies ?? []}
			/>
		</div>
	)
}
