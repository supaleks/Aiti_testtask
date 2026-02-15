import Chest from '@/assets/chest.svg?react'
import PasswordAuthIcon from '@/assets/pass_auth_icon.svg?react'
import UserAuthIcon from '@/assets/user_auth_icon.svg?react'
import { authStorage } from '@/entities/user'
import { useLoginMutation } from '@/entities/user/api'
import { Logo } from '@/shared/ui'
import {
	App as AntdApp,
	Button,
	Checkbox,
	Divider,
	Form,
	Input,
	Typography
} from 'antd'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import styles from './LoginForm.module.scss'

type LoginFormValues = {
	login: string
	password: string
	remember: boolean
}

export const LoginForm = () => {
	const { message } = AntdApp.useApp()
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<LoginFormValues>({
		defaultValues: { login: '', password: '', remember: false },
		mode: 'onSubmit'
	})

	const [loginMutation, { isLoading }] = useLoginMutation()
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<LoginFormValues> = async data => {
		try {
			const res = await loginMutation({
				username: data.login,
				password: data.password,
				expiresInMins: 60
			}).unwrap()
			authStorage.set(res.accessToken, data.remember)
			message.success('Успешный вход')
			navigate('/products', { replace: true })
		} catch (e) {
			const err = e as { data?: { message?: string } }
			message.error(err.data?.message ?? 'Ошибка входа')
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.form_block}>
				<Logo />
				<Typography.Title
					level={2}
					className={styles.title}
				>
					Добро пожаловать!
				</Typography.Title>
				<Typography.Text
					type="secondary"
					className={styles.subtitle}
				>
					Пожалуйста, авторизуйтесь
				</Typography.Text>
				<Form
					className={styles.form}
					layout="vertical"
					onFinish={handleSubmit(onSubmit)}
					requiredMark={false}
					autoComplete="on"
				>
					<Form.Item
						label="Логин"
						validateStatus={errors.login ? 'error' : undefined}
						help={errors.login?.message}
					>
						<Controller
							name="login"
							control={control}
							rules={{ required: 'Введите логин' }}
							render={({ field }) => (
								<Input
									{...field}
									allowClear={{
										clearIcon: (
											<Chest
												width={14}
												height={14}
											/>
										)
									}}
									autoComplete="username"
									placeholder="Введите логин"
									className={styles.input}
									prefix={<UserAuthIcon />}
								/>
							)}
						/>
					</Form.Item>

					<Form.Item
						label="Пароль"
						validateStatus={errors.password ? 'error' : undefined}
						help={errors.password?.message}
					>
						<Controller
							name="password"
							control={control}
							rules={{
								required: 'Введите пароль',
								minLength: { value: 6, message: 'Минимум 6 символов' }
							}}
							render={({ field }) => (
								<Input.Password
									{...field}
									autoComplete="current-password"
									placeholder="Введите пароль"
									className={styles.input}
									prefix={<PasswordAuthIcon />}
								/>
							)}
						/>
					</Form.Item>

					<Form.Item>
						<Controller
							name="remember"
							control={control}
							render={({ field }) => (
								<Checkbox
									checked={field.value}
									onChange={e => field.onChange(e.target.checked)}
									className={styles.remember}
								>
									Запомнить данные
								</Checkbox>
							)}
						/>
					</Form.Item>

					<Button
						type="primary"
						htmlType="submit"
						block
						loading={isLoading}
						className={styles.button}
					>
						Войти
					</Button>

					<Divider>
						<Typography.Text type="secondary">или</Typography.Text>
					</Divider>

					<div className={styles.register}>
						<Typography.Text type="secondary">
							Нет аккаунта?
							<Link
								to="/register"
								className={styles.link}
							>
								Создать
							</Link>
						</Typography.Text>
					</div>
				</Form>
			</div>
		</div>
	)
}
