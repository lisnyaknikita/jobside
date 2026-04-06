import { Column, Vacancy } from '@/types/kanban'
import { createClient } from '../supabase/server'

export async function getColumns(spaceId: string): Promise<Column[]> {
	const supabase = await createClient()

	const { data } = await supabase
		.from('columns')
		.select('id, name, type, position')
		.eq('space_id', spaceId)
		.order('position')

	return data ?? []
}

export async function getVacancies(spaceId: string): Promise<Vacancy[]> {
	const supabase = await createClient()

	const { data } = await supabase
		.from('vacancies')
		.select(
			`
			id, position, company, description, url, 
			salary, location, contact, order, created_at, 
			column_id, space_id, user_id,
			vacancy_tags (
				tags (id, name, color)
			)
		`
		)
		.eq('space_id', spaceId)
		.order('order')

	return data ?? []
}
