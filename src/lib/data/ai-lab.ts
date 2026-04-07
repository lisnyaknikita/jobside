import { createClient } from '@/lib/supabase/server'

export type AiLabVacancy = {
	id: string
	position: string
	company: string
	description: string | null
	url: string | null
}

export async function getAiLabData(vacancyId: string | undefined) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) return { vacancy: null, experience: '' }

	const [{ data: userProfile }, { data: vacancy }] = await Promise.all([
		supabase.from('users').select('experience').eq('id', user.id).single(),
		vacancyId
			? supabase
					.from('vacancies')
					.select('id, position, company, description, url')
					.eq('id', vacancyId)
					.eq('user_id', user.id)
					.maybeSingle()
			: Promise.resolve({ data: null }),
	])

	return {
		vacancy: vacancy as AiLabVacancy | null,
		experience: userProfile?.experience ?? '',
	}
}
