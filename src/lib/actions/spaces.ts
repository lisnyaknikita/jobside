'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

import { type IconOption } from '@/lib/constants/icons'

export async function createSpaceAction(formData: FormData) {
	const name = formData.get('name') as string
	const icon = formData.get('icon') as IconOption

	if (!name?.trim()) return { error: 'Name is required' }

	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) return { error: 'Unauthorized' }

	const { count } = await supabase.from('spaces').select('*', { count: 'exact', head: true }).eq('user_id', user.id)

	const { data: space, error } = await supabase
		.from('spaces')
		.insert({ user_id: user.id, name: name.trim(), icon, position: count ?? 0 })
		.select('id, name')
		.single()

	if (error) return { error: error.message }

	await supabase.from('columns').insert([
		{ user_id: user.id, space_id: space.id, name: 'Wishlist', type: 'wishlist', position: 0, is_default: true },
		{ user_id: user.id, space_id: space.id, name: 'Applied', type: 'applied', position: 1, is_default: true },
		{ user_id: user.id, space_id: space.id, name: 'Interview', type: 'interview', position: 2, is_default: true },
		{ user_id: user.id, space_id: space.id, name: 'Offer', type: 'offer', position: 3, is_default: true },
		{ user_id: user.id, space_id: space.id, name: 'Rejected', type: 'rejected', position: 4, is_default: true },
	])

	redirect(`/workflow?space=${space.id}`)
}
