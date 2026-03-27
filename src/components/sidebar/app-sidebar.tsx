'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'
import {
	BarChart3,
	Briefcase,
	FileDown,
	GalleryVerticalEndIcon,
	KanbanIcon,
	Sparkles,
	UserCircle,
	Users2,
} from 'lucide-react'
import Link from 'next/link'
import { TeamSwitcher } from './team-switcher/team-switcher'

const data = {
	user: {
		name: 'Ivan Developer',
		email: 'ivan@example.com',
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
			title: 'Board',
			url: '/board',
			icon: KanbanIcon,
			isActive: true,
			items: [
				{ title: 'Active Board', url: '/board' },
				{ title: 'Archived Jobs', url: '/board/archive' },
				{ title: 'Custom Columns', url: '/board/settings' },
			],
		},
		{
			title: 'AI Lab',
			url: '#',
			icon: Sparkles,
			items: [
				{ title: 'Cover Letter Gen', url: '/ai/cover-letter' },
				{ title: 'Resume Tailor', url: '/ai/resume' },
				{ title: 'Interview Prep', url: '/ai/prep' },
			],
		},
		{
			title: 'Knowledge Base',
			url: '#',
			icon: UserCircle,
			items: [
				{ title: 'My Profile (Experience)', url: '/profile/edit' },
				{ title: 'Education & Skills', url: '/profile/skills' },
				{ title: 'Standard Templates', url: '/profile/templates' },
			],
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
	return (
		<Sidebar>
			<SidebarHeader>
				<Link href='/' className='flex items-center gap-2 self-center font-medium'>
					<div className='flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
						<GalleryVerticalEndIcon className='size-4' />
					</div>
					Jobside
				</Link>
				<TeamSwitcher teams={data.campaigns} />
			</SidebarHeader>
			<SidebarContent>
				{/* Основная навигация (Board, AI, Knowledge Base) */}
				{/* <NavMain items={data.navMain} /> */}
				{/* Вторичные инструменты (Contacts, Stats, Export) */}
				{/* <NavProjects projects={data.secondary} /> */}
				{/* <SidebarGroup />
				<SidebarGroup /> */}
			</SidebarContent>
			<SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
		</Sidebar>
	)
}
