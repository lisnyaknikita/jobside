import { getAiLabData } from '@/lib/data/ai-lab'
import { Sparkles } from 'lucide-react'
import { CoverLetterForm } from './cover-letter-form/cover-letter-form'

interface AiLabPageProps {
	searchParams: Promise<{ vacancy?: string }>
}

export default async function AiLabPage({ searchParams }: AiLabPageProps) {
	const { vacancy: vacancyId } = await searchParams
	const { vacancy, experience } = await getAiLabData(vacancyId)

	return (
		<div className='flex flex-col h-full p-8 mx-auto w-full'>
			<div className='mb-8'>
				<div className='flex items-center gap-2 mb-1'>
					<Sparkles className='size-5 text-muted-foreground' />
					<h1 className='text-xl font-medium'>AI Lab</h1>
				</div>
				<p className='text-sm text-muted-foreground'>
					Generate a tailored cover letter based on the vacancy and your experience
				</p>
			</div>
			<CoverLetterForm initialVacancy={vacancy} initialExperience={experience} />
		</div>
	)
}
