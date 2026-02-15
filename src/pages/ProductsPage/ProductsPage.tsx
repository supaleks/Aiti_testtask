import { PageTemplate } from '@/shared/layout'
import { Header, ProductTable } from '@/widgets'

const ProductsPage = () => {
	return (
		<PageTemplate>
			<Header />
			<ProductTable />
		</PageTemplate>
	)
}

export default ProductsPage
