'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { logoutAction } from '@/lib/actions/auth'
import { BadgeCheck, ChevronsUpDown, LogOut, Settings } from 'lucide-react'

export function UserButton({ user }: { user: { name: string; email: string; avatar: string } }) {
	const { isMobile } = useSidebar()

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<Dialog>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size='lg'
								className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
							>
								<Avatar className='h-8 w-8 rounded-lg'>
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback className='rounded-lg'>ID</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-semibold'>{user.name}</span>
									<span className='truncate text-xs'>{user.email}</span>
								</div>
								<ChevronsUpDown className='ml-auto size-4' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
							side={isMobile ? 'bottom' : 'right'}
							align='end'
							sideOffset={4}
						>
							<DropdownMenuLabel className='p-0 font-normal'>
								<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
									<Avatar className='h-8 w-8 rounded-lg'>
										<AvatarImage src={user.avatar} alt={user.name} />
										<AvatarFallback className='rounded-lg'>ID</AvatarFallback>
									</Avatar>
									<div className='grid flex-1 text-left text-sm leading-tight'>
										<span className='truncate font-semibold'>{user.name}</span>
										<span className='truncate text-xs'>{user.email}</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DialogTrigger asChild>
									<DropdownMenuItem className='cursor-pointer'>
										<Settings className='mr-2 size-4' />
										Settings
									</DropdownMenuItem>
								</DialogTrigger>
								<DropdownMenuItem>
									<BadgeCheck className='mr-2 size-4' />
									Account
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className='text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer'
								onSelect={() => logoutAction()}
							>
								<LogOut className='mr-2 size-4' />
								<span>Logout</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle>Settings</DialogTitle>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<p className='text-sm text-muted-foreground'>Settings</p>
						</div>
					</DialogContent>
				</Dialog>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
