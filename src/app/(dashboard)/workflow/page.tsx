import { resolveActiveSpace } from '@/lib/utils/resolve-active-space'
import { SetLastSpace } from './components/set-last-space/set-last-space'

interface WorkflowPageProps {
	searchParams: Promise<{ space?: string }>
}

export default async function WorkflowPage({ searchParams }: WorkflowPageProps) {
	const { space: spaceId } = await searchParams
	const space = await resolveActiveSpace(spaceId)

	if (!space) return null

	return (
		<div className='flex flex-col h-full p-6'>
			<SetLastSpace spaceId={space.id} />
			<div className='mb-6'>
				<h1 className='text-2xl font-medium'>{space.name}</h1>
			</div>
			{/* Kanban */}
			<div className='flex-1'>
				<p className='text-muted-foreground'>Kanban board coming soon...</p>
			</div>
		</div>
	)
}
