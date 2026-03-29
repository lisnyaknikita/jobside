'use client'

import { ChevronsUpDown, Kanban, Plus } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { useCreateSpace } from '@/hooks/use-create-space'
import { ICON_MAP, IconOption } from '@/lib/constants/icons'
import { Space } from '@/types/space'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CreateSpaceDialog } from './components/create-space-dialog/create-space-dialog'

interface SpaceSwitcherProps {
	spaces: Space[]
	activeSpaceId: string
}

export function SpaceSwitcher({ spaces, activeSpaceId }: SpaceSwitcherProps) {
	const { isMobile } = useSidebar()
	const router = useRouter()
	const [activeId, setActiveId] = useState(activeSpaceId)
	const [dialogOpen, setDialogOpen] = useState(false)

	const { selectedIcon, setSelectedIcon, error, loading, handleCreate } = useCreateSpace()

	const activeSpace = spaces.find(s => s.id === activeId) ?? spaces[0]
	const ActiveIcon =
		activeSpace?.icon && activeSpace.icon in ICON_MAP ? ICON_MAP[activeSpace.icon as IconOption] : Kanban

	function handleSelect(space: Space) {
		setActiveId(space.id)
		router.push(`/workflow?space=${space.id}`)
	}

	return (
		<>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size='lg'
								className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
							>
								<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
									<ActiveIcon className='size-4' />
								</div>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-semibold'>{activeSpace?.name}</span>
									<span className='truncate text-xs text-muted-foreground'>Space</span>
								</div>
								<ChevronsUpDown className='ml-auto' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
							align='start'
							side={isMobile ? 'bottom' : 'right'}
							sideOffset={4}
						>
							<DropdownMenuLabel className='text-xs text-muted-foreground'>Spaces</DropdownMenuLabel>
							{spaces.map(space => {
								const Icon = space.icon in ICON_MAP ? ICON_MAP[space.icon as IconOption] : Kanban
								return (
									<DropdownMenuItem
										key={space.id}
										onClick={() => handleSelect(space)}
										className='gap-2 p-2 cursor-pointer'
									>
										<div className='flex size-6 items-center justify-center rounded-md border'>
											<Icon className='size-4 shrink-0' />
										</div>
										{space.name}
									</DropdownMenuItem>
								)
							})}
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className='gap-2 p-2 cursor-pointer'
								onSelect={e => {
									e.preventDefault()
									setDialogOpen(true)
								}}
							>
								<div className='flex size-6 items-center justify-center rounded-md border bg-background'>
									<Plus className='size-4' />
								</div>
								<div className='font-medium text-muted-foreground'>Add Space</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
			<CreateSpaceDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				selectedIcon={selectedIcon}
				onSelectIcon={setSelectedIcon}
				onSubmit={handleCreate}
				loading={loading}
				error={error}
			/>
		</>
	)
}
