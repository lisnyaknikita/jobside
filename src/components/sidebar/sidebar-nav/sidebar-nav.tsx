'use client'

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Briefcase, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
	{ title: 'Workflow', url: '/workflow', icon: Briefcase },
	{ title: 'AI Lab', url: '/ai-lab', icon: Sparkles },
]

export const SidebarNav = () => {
	const pathname = usePathname()

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Application</SidebarGroupLabel>
			<SidebarMenu className='flex flex-col gap-2'>
				{navItems.map(item => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton asChild isActive={pathname.startsWith(item.url)}>
							<Link href={item.url}>
								<item.icon className='size-4' />
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}
