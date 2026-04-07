'use client'

import { useCoverLetter } from '@/hooks/use-cover-letter'
import { AiLabVacancy } from '@/lib/data/ai-lab'
import { CompletionBlock } from './components/completion-block/completion-block'
import { GenerateButton } from './components/generate-button/generate-button'
import { InputFields } from './components/input-fields/input-fields'
import { VacancyBadge } from './components/vacancy-badge/vacancy-badge'

interface CoverLetterFormProps {
	initialVacancy: AiLabVacancy | null
	initialExperience: string
}

export function CoverLetterForm({ initialVacancy, initialExperience }: CoverLetterFormProps) {
	const {
		jobDescription,
		setJobDescription,
		experience,
		setExperience,
		completion,
		isLoading,
		copied,
		handleGenerate,
		handleCopy,
	} = useCoverLetter(initialVacancy, initialExperience)

	return (
		<div className='flex flex-col gap-5'>
			{initialVacancy && <VacancyBadge vacancy={initialVacancy} />}
			<InputFields
				jobDescription={jobDescription}
				experience={experience}
				hasVacancy={!!initialVacancy}
				onJobDescriptionChange={setJobDescription}
				onExperienceChange={setExperience}
			/>
			<GenerateButton
				isLoading={isLoading}
				disabled={isLoading || !jobDescription.trim() || !experience.trim()}
				onClick={handleGenerate}
			/>
			{(completion || isLoading) && (
				<CompletionBlock
					completion={completion}
					isLoading={isLoading}
					copied={copied}
					onCopy={handleCopy}
					onRegenerate={handleGenerate}
				/>
			)}
		</div>
	)
}
