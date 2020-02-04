import {
	BadRequestException,
	Controller,
	Get,
	ParseIntPipe,
	Query,
	UseGuards,
} from '@nestjs/common';
import {Product} from 'src/dto/product.dto';
import {AuthenticationGuard} from 'src/guards/authentication.guard';
import {SearchRepository} from './search.repository';

@Controller('search')
@UseGuards(AuthenticationGuard)
export class SearchController {
	constructor(private _searchRepo: SearchRepository) {}

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

		console.log('search', search);
		return this._searchRepo.searchProduct(
			search,
			sortOrder,
			pageNumber,
			pageSize,
		);
	}
}
