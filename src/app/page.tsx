import { CTA } from '@/components/landing/cta'
import { Features } from '@/components/landing/features'
import { Header } from '@/components/landing/header'
import { Hero } from '@/components/landing/hero'
import { KanbanPreview } from '@/components/landing/kanban-preview'

export default function LandingPage() {
	return (
		<div className='min-h-screen container mx-auto'>
			<Header />
			<Hero />
			<KanbanPreview />
			<Features />
			<CTA />
		</div>
	)
}
