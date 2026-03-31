'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import { changeSpaceIconAction, deleteSpaceAction, renameSpaceAction } from '@/lib/actions/spaces'
import { IconOption } from '@/lib/constants/icons'
import { Space } from '@/types/space'
import { Pencil, Smile, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'
import { useState } from 'react'
import { IconPicker } from './components/icon-picker/icon-picker'

interface SpaceItemMenuProps {
	space: Space
	isActive: boolean
	trigger: React.ReactNode
}

export function SpaceItemMenu({ space, isActive, trigger }: SpaceItemMenuProps) {
	const router = useRouter()
	const [renaming, setRenaming] = useState(false)
	const [iconPickerOpen, setIconPickerOpen] = useState(false)
	const [deleteOpen, setDeleteOpen] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)

	async function handleRename(name: string) {
		if (!name.trim() || name === space.name) {
			setRenaming(false)
			return
		}
		const formData = new FormData()
		formData.set('id', space.id)
		formData.set('name', name.trim())
		await renameSpaceAction(formData)
		setRenaming(false)
	}

	async function handleDelete() {
		try {
			setIsDeleting(true)
			const result = await deleteSpaceAction(space.id)
			if (result?.error) return
			if (isActive) router.push('/workflow')
		} finally {
			setIsDeleting(false)
			setDeleteOpen(false)
		}
	}

	async function handleIconChange(icon: IconOption) {
		await changeSpaceIconAction(space.id, icon)
		setIconPickerOpen(false)
	}

	if (renaming) {
		return (
			<input
				defaultValue={space.name}
				autoFocus
				onClick={e => e.stopPropagation()}
				onBlur={e => handleRename(e.target.value)}
				onKeyDown={e => {
					if (e.key === 'Enter') handleRename(e.currentTarget.value)
					if (e.key === 'Escape') setRenaming(false)
				}}
				className='absolute inset-0 z-10 w-full h-full bg-background rounded-md text-sm outline-none px-8 border-b-0 focus:ring-1 focus:ring-ring'
			/>
		)
	}

	return (
		<>
			<DropdownMenuSub>
				<DropdownMenuPrimitive.SubTrigger asChild>{trigger}</DropdownMenuPrimitive.SubTrigger>
				<DropdownMenuPortal>
					<DropdownMenuSubContent className='w-44'>
						<DropdownMenuItem
							onSelect={e => {
								e.preventDefault()
								setRenaming(true)
							}}
						>
							<Pencil className='mr-2 size-3.5' />
							Rename
						</DropdownMenuItem>
						<DropdownMenuItem
							onSelect={e => {
								e.preventDefault()
								setIconPickerOpen(true)
							}}
						>
							<Smile className='mr-2 size-3.5' />
							Change icon
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className='text-destructive focus:text-destructive focus:bg-destructive/10'
							onSelect={e => {
								e.preventDefault()
								setDeleteOpen(true)
							}}
						>
							<Trash2 className='mr-2 size-3.5' />
							Delete
						</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuPortal>
			</DropdownMenuSub>

			<IconPicker
				open={iconPickerOpen}
				onOpenChange={setIconPickerOpen}
				onSelect={handleIconChange}
				current={space.icon}
			/>

			<AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the space
							<span className='font-semibold text-foreground'> &quot;{space.name}&quot;</span> and all of its data.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={e => {
								e.preventDefault()
								handleDelete()
							}}
							disabled={isDeleting}
							className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
						>
							{isDeleting ? 'Deleting...' : 'Delete space'}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
