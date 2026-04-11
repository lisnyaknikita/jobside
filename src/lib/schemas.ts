import { z } from 'zod'

// ─── Vacancy ────────────────────────────────────────────────────────────────

export const vacancySchema = z.object({
	company: z.string().min(1, 'Company is required'),
	position: z.string().min(1, 'Position is required'),
	url: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
	salary: z.string().optional(),
	location: z.string().optional(),
})

export type VacancyFormValues = z.infer<typeof vacancySchema>

// ─── Experience (Settings) ───────────────────────────────────────────────────

export const experienceSchema = z.object({
	experience: z
		.string()
		.min(10, 'Please write at least 10 characters about your experience'),
})

export type ExperienceFormValues = z.infer<typeof experienceSchema>

// ─── Cover Letter ────────────────────────────────────────────────────────────

export const coverLetterSchema = z.object({
	jobDescription: z.string().min(1, 'Job description is required'),
	experience: z.string().min(1, 'Your experience is required'),
})

export type CoverLetterFormValues = z.infer<typeof coverLetterSchema>
