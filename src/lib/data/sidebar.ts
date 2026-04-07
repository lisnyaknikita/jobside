import { createClient } from '@/lib/supabase/server'
import { Space } from '@/types/space'

export type SidebarUser = {
	name: string
	email: string
	avatar: string
	experience: string
}

export async function getSidebarData(): Promise<{
	user: SidebarUser
	spaces: Space[]
}> {
	const supabase = await createClient()

	const [
		{
			data: { user },
		},
		{ data: spaces },
	] = await Promise.all([supabase.auth.getUser(), supabase.from('spaces').select('id, name, icon').order('position')])

	const { data: userProfile } = await supabase
		.from('users')
		.select('experience')
		.eq('id', user?.id ?? '')
		.single()

	return {
		user: {
			name: user?.user_metadata?.full_name ?? 'User',
			email: user?.email ?? '',
			avatar: user?.user_metadata?.avatar_url ?? '',
			experience: userProfile?.experience ?? '',
		},
		spaces: spaces ?? [],
	}
}
