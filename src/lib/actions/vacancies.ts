'use server'

import { createClient } from '@/lib/supabase/server'
import { Vacancy } from '@/types/kanban'
import { revalidatePath } from 'next/cache'

export async function createVacancyAction(formData: FormData) {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) return { error: 'Unauthorized' }

	const spaceId = formData.get('spaceId') as string
	const columnId = formData.get('columnId') as string
	const company = formData.get('company') as string
	const position = formData.get('position') as string
	const url = formData.get('url') as string

	if (!company || !position) return { error: 'Company and Position are required' }

	const { count } = await supabase
		.from('vacancies')
		.select('*', { count: 'exact', head: true })
		.eq('column_id', columnId)

	const { data, error } = await supabase
		.from('vacancies')
		.insert({
			user_id: user.id,
			space_id: spaceId,
			column_id: columnId,
			company,
			position,
			url: url || null,
			order: count ?? 0,
		})
		.select()
		.single()

	if (error) return { error: error.message }

	revalidatePath('/workflow')
	return { data: data as Vacancy }
}

export async function updateVacancyColumnAction(
	vacancyId: string,
	columnId: string | null,
	orderedVacancies: { id: string; order: number }[]
) {
	const supabase = await createClient()

	await supabase.from('vacancies').update({ column_id: columnId }).eq('id', vacancyId)

	await Promise.all(orderedVacancies.map(({ id, order }) => supabase.from('vacancies').update({ order }).eq('id', id)))

	revalidatePath('/workflow')
}
