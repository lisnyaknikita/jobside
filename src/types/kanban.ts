export type Column = {
	id: string
	name: string
	type: string
	position: number
}

export type Vacancy = {
	id: string
	column_id: string | null
	position: string
	company: string
	description: string | null
	url: string | null
	order: number
	deadline: string | null
	created_at: string
}
