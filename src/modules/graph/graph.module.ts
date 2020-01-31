import {Module} from '@nestjs/common';
import {GraphController} from './graph.controller';
import {GraphRepository} from './graph.repository';

@Module({
	controllers: [GraphController],
	providers: [GraphRepository],
})
export class GraphModule {}
