'use client'

import { Copy, RefreshCw } from 'lucide-react'

interface CompletionBlockProps {
	completion: string
	isLoading: boolean
	copied: boolean
	onCopy: () => void
	onRegenerate: () => void
}

export function CompletionBlock({ completion, isLoading, copied, onCopy, onRegenerate }: CompletionBlockProps) {
	return (
		<div className='border border-border rounded-lg overflow-hidden'>
			<div className='px-5 py-3 border-b border-border flex items-center justify-between'>
				<p className='text-sm font-medium'>Generated cover letter</p>
				{completion && !isLoading && (
					<div className='flex gap-2'>
						<button
							onClick={onCopy}
							className='flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border rounded-md px-3 py-1.5 transition-colors'
						>
							<Copy className='size-3.5' />
							{copied ? 'Copied!' : 'Copy'}
						</button>
						<button
							onClick={onRegenerate}
							className='flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border rounded-md px-3 py-1.5 transition-colors'
						>
							<RefreshCw className='size-3.5' />
							Regenerate
						</button>
					</div>
				)}
			</div>
			<div className='p-5 text-sm leading-relaxed whitespace-pre-wrap'>
				{completion}
				{isLoading && <span className='inline-block w-1 h-4 bg-foreground/50 animate-pulse ml-0.5' />}
			</div>
		</div>
	)
}
