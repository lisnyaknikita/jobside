export type MockTag = {
	name: string
	color: string
}

export type MockCard = {
	position: string
	company: string
	tags: MockTag[]
	faded?: boolean
}

export type MockColumn = {
	name: string
	count: number
	cards: MockCard[]
}
