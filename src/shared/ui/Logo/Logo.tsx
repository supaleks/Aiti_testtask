import LogoImage from '@/assets/logo.svg?react'
import styles from './Logo.module.scss'

export const Logo = () => {
	return (
		<div className={styles.logo_wrapper}>
			<LogoImage className={styles.logo} />
		</div>
	)
}
