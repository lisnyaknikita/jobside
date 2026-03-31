import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function resolveActiveSpace(spaceId: string | undefined) {
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
		return null
	}

	const { data: space } = await supabase.from('spaces').select('id, name').eq('id', spaceId).single()

	if (!space) redirect('/workflow')

	return space
}
