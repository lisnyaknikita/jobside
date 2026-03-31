import { Briefcase, Building, Globe, Heart, Kanban, Laptop, Rocket, Star, Target, Zap } from 'lucide-react'

export const ICON_OPTIONS = [
	'briefcase',
	'kanban',
	'rocket',
	'target',
	'star',
	'globe',
	'building',
	'laptop',
	'zap',
	'heart',
] as const

export type IconOption = (typeof ICON_OPTIONS)[number]

export const ICON_MAP: Record<IconOption, React.ElementType> = {
	briefcase: Briefcase,
	kanban: Kanban,
	rocket: Rocket,
	target: Target,
	star: Star,
	globe: Globe,
	building: Building,
	laptop: Laptop,
	zap: Zap,
	heart: Heart,
}
