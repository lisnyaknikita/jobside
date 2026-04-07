'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateUserExperienceAction(experience: string) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) return { error: 'Unauthorized' }

	const { error } = await supabase.from('users').update({ experience }).eq('id', user.id)

	if (error) return { error: error.message }
	revalidatePath('/', 'layout')
	return { success: true }
}

export async function getUserExperience(): Promise<string> {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) return ''

	const { data } = await supabase.from('users').select('experience').eq('id', user.id).single()

	return data?.experience ?? ''
}
