'use client'

import { Zap } from 'lucide-react'

interface GenerateButtonProps {
	isLoading: boolean
	disabled: boolean
	onClick: () => void
}

export function GenerateButton({ isLoading, disabled, onClick }: GenerateButtonProps) {
	return (
		<div className='flex justify-center'>
			<button
				onClick={onClick}
				disabled={disabled}
				className='flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
			>
				<Zap className='size-5' />
				{isLoading ? 'Generating...' : 'Generate cover letter'}
			</button>
		</div>
	)
}
