import { ICON_OPTIONS } from '@/lib/constants/icons'
import * as z from 'zod'

export const spaceSchema = z.object({
	name: z.string().min(2, 'Name is too short').max(25, 'Maximum 25 characters'),
	icon: z.enum(ICON_OPTIONS),
})

export type SpaceFormValues = z.infer<typeof spaceSchema>
