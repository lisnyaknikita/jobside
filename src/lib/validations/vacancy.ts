import * as z from 'zod'

export const vacancySchema = z.object({
	company: z.string().min(1, 'Company name is required'),
	position: z.string().min(1, 'Position is required'),
	url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
	salary: z.string().optional(),
	location: z.string().optional(),
	columnId: z.string(),
	spaceId: z.string(),
	tags: z.array(
		z.object({
			name: z.string().min(1),
			color: z.string(),
		})
	),
})

export type VacancyFormValues = z.infer<typeof vacancySchema>
