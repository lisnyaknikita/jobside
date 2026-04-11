'use client'

interface InputFieldsProps {
	jobDescription: string
	experience: string
	hasVacancy: boolean
	onJobDescriptionChange: (value: string) => void
	onExperienceChange: (value: string) => void
}

export function InputFields({
	jobDescription,
	experience,
	hasVacancy,
	onJobDescriptionChange,
	onExperienceChange,
}: InputFieldsProps) {
	return (
		<div className='grid lg:grid-cols-2 gap-4 md:grid-cols-1'>
			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between'>
					<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>Job description</p>
					{hasVacancy && <span className='text-xs text-muted-foreground'>From vacancy</span>}
				</div>
				<textarea
					value={jobDescription}
					onChange={e => onJobDescriptionChange(e.target.value)}
					placeholder='Paste the job description here...'
					rows={8}
					className='w-full text-sm bg-muted/40 rounded-lg p-3 border border-transparent focus:border-border focus:outline-none resize-none placeholder:text-muted-foreground/50'
				/>
			</div>
			<div className='flex flex-col gap-2'>
				<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>Your experience</p>
				<textarea
					value={experience}
					onChange={e => onExperienceChange(e.target.value)}
					placeholder='Describe your stack, years of experience, key projects...'
					rows={8}
					className='w-full text-sm bg-muted/40 rounded-lg p-3 border border-transparent focus:border-border focus:outline-none resize-none placeholder:text-muted-foreground/50'
				/>
			</div>
		</div>
	)
}
