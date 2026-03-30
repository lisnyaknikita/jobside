import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'
import { createClient } from '@/lib/supabase/server'
import { Logo } from './logo/logo'
import { SidebarNav } from './sidebar-nav/sidebar-nav'
import { SpaceSwitcher } from './space-switcher/space-switcher'
import { UserButton } from './user-button/user-button'

export async function AppSidebar() {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()
	const { data: spaces } = await supabase.from('spaces').select('id, name, icon').order('position')

	const userData = {
		name: user?.user_metadata?.full_name ?? 'User',
		email: user?.email ?? '',
		avatar: user?.user_metadata?.avatar_url ?? '',
	}

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader>
				<Logo />
				<SpaceSwitcher spaces={spaces ?? []} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarNav />
			</SidebarContent>
			<SidebarFooter>
				<UserButton user={userData} />
			</SidebarFooter>
		</Sidebar>
	)
}
