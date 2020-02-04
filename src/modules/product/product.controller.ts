import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {Product} from 'src/dto/product.dto';
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
	async createProduct(@Body() product: Product): Promise<Product> {
		return this._productRepo.createProduct(product);
	}
}
