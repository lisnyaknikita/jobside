'use client'

import { Button } from '@/components/ui/button'
import { useSaveExperience } from '@/hooks/use-save-experience'
import { ModeToggle } from '../mode-toggle/mode-toggle'

interface SettingsDialogContentProps {
	initialExperience: string
}

export function SettingsDialog({ initialExperience }: SettingsDialogContentProps) {
	const { experience, setExperience, saving, saved, handleSave } = useSaveExperience(initialExperience)

	return (
		<div className='grid gap-6 py-4'>
			<div className='flex justify-between items-center'>
				<p className='text-sm text-muted-foreground'>Color theme</p>
				<ModeToggle />
			</div>
			<div className='grid gap-2'>
				<div>
					<p className='text-sm font-medium'>Your experience</p>
					<p className='text-xs text-muted-foreground mt-0.5'>
						Describe your stack, years of experience, projects and achievements. This will be used to generate more
						accurate cover letters.
					</p>
				</div>
				<textarea
					value={experience}
					onChange={e => setExperience(e.target.value)}
					placeholder='e.g. 2 years of frontend experience. Stack: React, Next.js, TypeScript, Tailwind. Built several SaaS products...'
					rows={6}
					className='w-full text-xs bg-muted/40 rounded-lg p-3 border border-transparent focus:border-border focus:outline-none resize-none placeholder:text-muted-foreground/50'
				/>
				<div className='flex items-center justify-between'>
					<p className='text-xs text-muted-foreground'>
						{experience.length > 0 ? `${experience.length} characters` : 'Not filled in yet'}
					</p>
					<Button size='sm' onClick={handleSave} disabled={saving}>
						{saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
					</Button>
				</div>
			</div>
		</div>
	)
}
