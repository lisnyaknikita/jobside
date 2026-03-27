'use client'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { BarChart3, Briefcase, FileDown, GalleryVerticalEndIcon, KanbanIcon, Sparkles, Users2 } from 'lucide-react'
import Link from 'next/link'
import { TeamSwitcher } from './team-switcher/team-switcher'
import { UserButton } from './user-button/user-button'

const data = {
	user: {
		name: 'Nikita',
		email: 'test@example.com',
		avatar: '/avatars/user.jpg',
	},

	campaigns: [
		{
			name: 'Frontend 2026',
			logo: Briefcase,
			plan: 'Main Search',
		},
		{
			name: 'Freelance/Part-time',
			logo: KanbanIcon,
			plan: 'Side Projects',
		},
	],
	navMain: [
		{
			title: 'Workflow',
			url: '/workflow',
			icon: Briefcase,
		},
		{
			title: 'AI Lab',
			url: '/ai-lab',
			icon: Sparkles,
		},
	],
	secondary: [
		{
			name: 'Networking (Contacts)',
			url: '/contacts',
			icon: Users2,
		},
		{
			name: 'Statistics',
			url: '/stats',
			icon: BarChart3,
		},
		{
			name: 'Export to CSV',
			url: '/export',
			icon: FileDown,
		},
	],
}

export function AppSidebar() {
	const { state } = useSidebar()
	const collapsed = state === 'collapsed'

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader>
				<Link
					href='/'
					className={cn('flex items-center gap-2 self-center font-medium mb-10 mt-2 p-2', collapsed && 'p-0')}
				>
					<div className='flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground'>
						<GalleryVerticalEndIcon className={cn('size-5', collapsed && 'size-4')} />
					</div>
					{!collapsed && <span className='text-2xl'>Jobside</span>}
				</Link>
				<TeamSwitcher teams={data.campaigns} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarMenu>
						{data.navMain.map(item => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild>
									<Link href={item.url}>
										{item.icon && <item.icon className='size-4' />}
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<UserButton user={data.user} />
			</SidebarFooter>
		</Sidebar>
	)
}
