import { AiLabVacancy } from '@/lib/data/ai-lab'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

export function VacancyBadge({ vacancy }: { vacancy: AiLabVacancy }) {
	return (
		<div className='flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background'>
			<div>
				<p className='text-sm font-medium'>{vacancy.position}</p>
				<p className='text-xs text-muted-foreground mt-0.5'>{vacancy.company}</p>
			</div>
			<div className='flex items-center gap-3'>
				<span className='text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md'>Pre-filled from vacancy</span>
				{vacancy.url && (
					<Link
						href={vacancy.url}
						target='_blank'
						rel='noopener noreferrer'
						className='p-1.5 rounded-md hover:bg-muted transition-colors'
					>
						<ExternalLink className='size-3.5 text-muted-foreground' />
					</Link>
				)}
			</div>
		</div>
	)
}
