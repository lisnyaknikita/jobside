import Link from 'next/link'

export default function CheckEmailPage() {
	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div className='flex flex-col gap-3 w-80 text-center'>
				<h1 className='text-2xl font-medium'>Проверь почту</h1>
				<p className='text-gray-500 text-sm'>
					Мы отправили письмо с подтверждением на твой email. Перейди по ссылке в письме чтобы активировать аккаунт.
				</p>
				<Link href='/login' className='text-sm text-blue-500 mt-2'>
					Вернуться на страницу входа
				</Link>
			</div>
		</div>
	)
}
