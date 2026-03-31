'use client'

import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'

export const Logo = () => {
	const { state } = useSidebar()
	const collapsed = state === 'collapsed'

	return (
		<Link href='/' className={cn('flex items-center gap-2 self-center font-medium mb-10 mt-2 p-2', collapsed && 'p-0')}>
			<div className='flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground'>
				<GalleryVerticalEndIcon className={cn('size-5', collapsed && 'size-4')} />
			</div>
			{!collapsed && <span className='text-2xl'>Jobside</span>}
		</Link>
	)
}
