import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import {BadRequestException} from '@nestjs/common';
import {Product} from 'src/dto/product.dto';
import {AdminGuard} from 'src/guards/admin.guard';
import {AuthenticationGuard} from 'src/guards/authentication.guard';
import {ProductRepository} from './product.repository';

@Controller('products')
@UseGuards(AuthenticationGuard)
export class ProductController {
	constructor(private _productRepo: ProductRepository) {}

	@Get()
	async findAllProducts(): Promise<Product[]> {
		return this._productRepo.findAllProducts();
	}

	@Get(':id')
	async findProduct(@Param('id') id: string): Promise<Product> {
		return this._productRepo.findProduct(id);
	}

	@Post()
	@UseGuards(AdminGuard)
	async createProduct(@Body() product: Product): Promise<Product> {
		return this._productRepo.createProduct(product);
	}

	@Put(':id')
	@UseGuards(AdminGuard)
	async updateProduct(
		@Param('id') id: string,
		@Body() changes: Partial<Product>,
	): Promise<Product> {
		return this._productRepo.updateProduct(id, changes);
	}

	@Delete(':id')
	@UseGuards(AdminGuard)
	async deleteProduct(@Param('id') id: string) {
		return this._productRepo.deleteProduct(id);
	}

	@Get()
	async searchProduct(
		@Query('search') search: string,
		@Query('sortOrder') sortOrder = 'asc',
		@Query('pageNumber', ParseIntPipe) pageNumber = 0,
		@Query('pageSize', ParseIntPipe) pageSize = 3,
	): Promise<Product[]> {
		if (!search) throw new BadRequestException('search query must be defined');
		if (sortOrder !== 'asc' && sortOrder !== 'desc')
			throw new BadRequestException(`sort must be "asc" or "desc"`);

		return this._productRepo.searchProduct(
			search,
			sortOrder,
			pageNumber,
			pageSize,
		);
	}
}
