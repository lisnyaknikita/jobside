import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SetLastSpace } from './components/set-last-space/set-last-space'

interface WorkflowPageProps {
	searchParams: Promise<{ space?: string }>
}

export default async function WorkflowPage({ searchParams }: WorkflowPageProps) {
	const { space: spaceId } = await searchParams
	const supabase = await createClient()

	const cookieStore = await cookies()

	if (!spaceId) {
		const lastSpaceId = cookieStore.get('last_space_id')?.value

		if (lastSpaceId) {
			const { data: lastSpace } = await supabase.from('spaces').select('id').eq('id', lastSpaceId).single()

			if (lastSpace) redirect(`/workflow?space=${lastSpace.id}`)
		}

		const { data: firstSpace } = await supabase.from('spaces').select('id').order('position').limit(1).single()

		if (firstSpace) redirect(`/workflow?space=${firstSpace.id}`)
	}

	const { data: space } = await supabase.from('spaces').select('id, name').eq('id', spaceId!).single()

	if (!space) redirect('/workflow')

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
