'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateVacancyColumnAction(
	vacancyId: string,
	columnId: string | null,
	orderedVacancies: { id: string; order: number }[]
) {
	const supabase = await createClient()

	await supabase.from('vacancies').update({ column_id: columnId }).eq('id', vacancyId)

	// Обновляем порядок всех карточек в колонке
	await Promise.all(orderedVacancies.map(({ id, order }) => supabase.from('vacancies').update({ order }).eq('id', id)))

	revalidatePath('/workflow')
}
