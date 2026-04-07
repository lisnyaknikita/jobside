import { createClient } from '@/lib/supabase/server'
import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

export async function POST(request: Request) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) return new Response('Unauthorized', { status: 401 })

	const { vacancyDescription, experience, position, company } = await request.json()

	try {
		const { text } = await generateText({
			model: google('gemini-2.5-flash'),
			prompt: `You are a professional cover letter writer.
      
      Write a concise, professional cover letter for the following position:
      Position: ${position}
      Company: ${company}
      
      Job description:
      ${vacancyDescription}
      
      Candidate's experience:
      ${experience}
      
      Requirements:
      - 3-4 paragraphs
      - Professional but personal tone
      - Reference specific details from the job description
      - Highlight relevant experience
      - No generic phrases like "I am writing to apply"
      - No placeholders like [Your Name]
      - Output only the letter text, no subject line or date`,
		})

		return Response.json({ text })
	} catch (error) {
		console.error('AI Generation Error:', error)
		return new Response('Error generating text', { status: 500 })
	}
}
