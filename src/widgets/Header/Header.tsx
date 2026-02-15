import Chest from '@/assets/chest.svg?react'
import SearchIcon from '@/assets/search.svg?react'
import { authStorage } from '@/entities/user'
import { useQueryParam } from '@/shared/lib'
import { Button, Input, Typography } from 'antd'
import { clsx } from 'clsx'
import { useNavigate } from 'react-router'
import styles from './Header.module.scss'

export const Header = () => {
	const navigate = useNavigate()

	const handleLogout = () => {
		authStorage.clear()
		navigate('/', { replace: true })
	}

	const { value, setValue } = useQueryParam('q', {
		debounceMs: 400,
		replace: true,
		resetKeys: ['page']
	})

	return (
		<div className={clsx(styles.header, 'wrapper')}>
			<Typography.Title
				level={3}
				className={styles.title}
			>
				Товары
			</Typography.Title>

			<Input
				value={value}
				onChange={e => setValue(e.target.value)}
				placeholder="Найти"
				className={styles.search}
				prefix={<SearchIcon />}
				allowClear={{
					clearIcon: (
						<Chest
							width={14}
							height={14}
						/>
					)
				}}
			/>

			<Button
				type="primary"
				onClick={handleLogout}
				className={styles.logout_button}
			>
				Выйти
			</Button>
		</div>
	)
}
