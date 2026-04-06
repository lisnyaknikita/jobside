import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'
import { getSidebarData } from '@/lib/data/sidebar'
import { Logo } from './logo/logo'
import { SidebarNav } from './sidebar-nav/sidebar-nav'
import { SpaceSwitcher } from './space-switcher/space-switcher'
import { UserButton } from './user-button/user-button'

export async function AppSidebar() {
	const { user, spaces } = await getSidebarData()

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader>
				<Logo />
				<SpaceSwitcher spaces={spaces} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarNav />
			</SidebarContent>
			<SidebarFooter>
				<UserButton user={user} />
			</SidebarFooter>
		</Sidebar>
	)
}
