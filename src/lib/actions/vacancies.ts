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
	const salary = formData.get('salary') as string
	const location = formData.get('location') as string
	const tagsJson = formData.get('tags') as string
	const tags: { name: string; color: string }[] = tagsJson ? JSON.parse(tagsJson) : []

	if (!company || !position) return { error: 'Company and Position are required' }

	const { count } = await supabase
		.from('vacancies')
		.select('*', { count: 'exact', head: true })
		.eq('column_id', columnId)

	const { data: vacancy, error } = await supabase
		.from('vacancies')
		.insert({
			user_id: user.id,
			space_id: spaceId,
			column_id: columnId,
			company,
			position,
			url: url || null,
			salary: salary || null,
			location: location || null,
			order: count ?? 0,
		})
		.select()
		.single()

	if (error) return { error: error.message }

	if (tags.length > 0) {
		for (const tag of tags) {
			const { data: existingTag } = await supabase.from('tags').select('id').eq('name', tag.name).maybeSingle()

			const tagId =
				existingTag?.id ??
				(await supabase.from('tags').insert({ name: tag.name, color: tag.color }).select('id').single()).data?.id

			if (tagId) {
				await supabase.from('vacancy_tags').insert({
					vacancy_id: vacancy.id,
					tag_id: tagId,
				})
			}
		}
	}

	const { data: vacancyWithTags } = await supabase
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
		.eq('id', vacancy.id)
		.single()

	revalidatePath('/workflow')
	return { data: vacancyWithTags as unknown as Vacancy }
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

export async function updateVacancyAction(
	id: string,
	fields: Partial<
		Pick<Vacancy, 'position' | 'company' | 'description' | 'url' | 'salary' | 'location' | 'contact' | 'column_id'>
	>
) {
	const supabase = await createClient()
	const { error } = await supabase.from('vacancies').update(fields).eq('id', id)
	if (error) return { error: error.message }
	revalidatePath('/workflow')
}

export async function deleteVacancyAction(id: string) {
	const supabase = await createClient()
	const { error } = await supabase.from('vacancies').delete().eq('id', id)
	if (error) return { error: error.message }
	revalidatePath('/workflow')
}

export async function createNoteAction(vacancyId: string, content: string) {
	const supabase = await createClient()
	const { data, error } = await supabase
		.from('notes')
		.insert({ vacancy_id: vacancyId, content })
		.select('id, content, created_at, vacancy_id')
		.single()
	if (error) return { error: error.message }
	return { data }
}

export async function updateNoteAction(id: string, content: string) {
	const supabase = await createClient()
	const { data, error } = await supabase.from('notes').update({ content }).eq('id', id).select().single()

	if (error) return { error: error.message }
	return { data }
}

export async function deleteNoteAction(id: string) {
	const supabase = await createClient()
	const { error } = await supabase.from('notes').delete().eq('id', id)
	if (error) return { error: error.message }
	revalidatePath('/workflow')
}

export async function addTagToVacancyAction(vacancyId: string, tagName: string, color: string) {
	const supabase = await createClient()

	let { data: tag } = await supabase.from('tags').select('id, name, color').eq('name', tagName.trim()).maybeSingle()

	if (!tag) {
		const { data: newTag, error: tagError } = await supabase
			.from('tags')
			.insert({ name: tagName.trim(), color })
			.select()
			.single()

		if (tagError) return { error: tagError.message }
		tag = newTag
	}

	const { error: linkError } = await supabase.from('vacancy_tags').insert({ vacancy_id: vacancyId, tag_id: tag?.id })

	if (linkError) return { error: linkError.message }

	revalidatePath('/workflow')
	return { data: tag }
}

export async function removeTagFromVacancyAction(vacancyId: string, tagId: string) {
	const supabase = await createClient()

	const { error } = await supabase.from('vacancy_tags').delete().eq('vacancy_id', vacancyId).eq('tag_id', tagId)

	if (error) return { error: error.message }

	revalidatePath('/workflow')
}
