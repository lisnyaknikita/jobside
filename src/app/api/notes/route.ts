import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const vacancyId = searchParams.get('vacancy_id')

	if (!vacancyId) return NextResponse.json([])

	const supabase = await createClient()
	const { data } = await supabase
		.from('notes')
		.select('id, content, created_at, vacancy_id')
		.eq('vacancy_id', vacancyId)
		.order('created_at')

	return NextResponse.json(data ?? [])
}
