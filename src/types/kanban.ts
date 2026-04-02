export type Column = {
	id: string
	name: string
	type: string
	position: number
}

export type Vacancy = {
	id: string
	user_id: string
	space_id: string
	column_id: string | null
	position: string
	company: string
	description: string | null
	url: string | null
	salary: string | null
	location: string | null
	contact: string | null
	order: number
	created_at: string
	vacancy_tags: { tags: Tag[] }[]
}

export type Tag = {
	id: string
	name: string
	color: string
}
