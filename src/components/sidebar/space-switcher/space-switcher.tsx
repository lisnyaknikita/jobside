'use client'

import { ChevronsUpDown, Kanban, MoreHorizontal, Plus } from 'lucide-react'

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
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { CreateSpaceDialog } from './components/create-space-dialog/create-space-dialog'
import { SpaceItemMenu } from './components/space-item-menu/space-item-menu'

interface SpaceSwitcherProps {
	spaces: Space[]
}

export function SpaceSwitcher({ spaces }: SpaceSwitcherProps) {
	const { isMobile } = useSidebar()
	const router = useRouter()
	const searchParams = useSearchParams()
	const [dialogOpen, setDialogOpen] = useState(spaces.length === 0)

	const isMandatoryOpen = spaces.length === 0

	const effectiveOpen = isMandatoryOpen || dialogOpen

	const { selectedIcon, setSelectedIcon, error, loading, handleCreate } = useCreateSpace()

	async function onFormSubmit(formData: FormData) {
		const result = await handleCreate(formData)

		if (result?.data) {
			setDialogOpen(false)
			router.push(`/workflow?space=${result.data.id}`)
			router.refresh()
		}
	}

	const activeId = searchParams.get('space')
	const activeSpace = spaces.find(s => s.id === activeId) ?? spaces[0]
	const ActiveIcon =
		activeSpace?.icon && activeSpace.icon in ICON_MAP ? ICON_MAP[activeSpace.icon as IconOption] : Kanban

	function handleSelect(space: Space) {
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
									<span className='truncate font-semibold'>{activeSpace?.name ?? 'No Space Selected'}</span>
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
							{spaces.length > 0 ? (
								spaces.map(space => {
									const Icon = space.icon in ICON_MAP ? ICON_MAP[space.icon as IconOption] : Kanban
									const isActive = space.id === activeId

									return (
										<div
											key={space.id}
											className='relative flex items-center group/item px-1 py-0.5 rounded-md hover:bg-accent/50 focus-within:bg-accent/50 transition-colors'
										>
											<DropdownMenuItem
												onClick={() => handleSelect(space)}
												className='flex-1 gap-2 p-2 cursor-pointer focus:bg-transparent hover:bg-transparent data-[state=open]:bg-transparent outline-none'
											>
												<div className='flex size-6 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 bg-background'>
													<Icon className='size-4 shrink-0' />
												</div>
												<span className='flex-1 truncate pr-8'>{space.name}</span>
											</DropdownMenuItem>
											<SpaceItemMenu
												space={space}
												isActive={isActive}
												trigger={
													<button
														type='button'
														className='absolute right-2.5 opacity-0 group-hover/item:opacity-100 focus-within:opacity-100 transition-opacity flex items-center justify-center size-6 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 outline-none focus-visible:ring-1 focus-visible:ring-ring text-muted-foreground'
													>
														<MoreHorizontal className='size-4' />
													</button>
												}
											/>
										</div>
									)
								})
							) : (
								<div className='p-2 text-xs text-center text-muted-foreground'>Create your first space to start</div>
							)}
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
				open={effectiveOpen}
				onOpenChange={open => {
					if (!isMandatoryOpen) {
						setDialogOpen(open)
					}
				}}
				selectedIcon={selectedIcon}
				onSelectIcon={setSelectedIcon}
				onSubmit={onFormSubmit}
				loading={loading}
				error={error}
			/>
		</>
	)
}
