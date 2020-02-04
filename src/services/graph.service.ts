import {Injectable} from '@nestjs/common';

@Injectable()
export class GraphService {
	// Mocks
	/* sellsDone = [];
	getRandom = (min, max) => Math.floor(Math.random() * (max + min)) + min;
	generateIds = (large) => {
		const res = [];
		for (let i = 1; i <= large; i++) {
			res.push({id: i});
		}
		return res;
	};
	getSellId = (id) =>
		this.sellsDone.includes(id)
			? this.getSellId(this.getRandom(1, 1000000))
			: id;
	generateSells = () => {
		return this.generateIds(this.getRandom(1, 5))
			.map((x) => {
				if (this.sellsDone.length < 1000000) {
					const sellId = this.getSellId(this.getRandom(1, 1000000));
					if (sellId) this.sellsDone.push(sellId);
					return sellId;
				}
				return;
			})
			.filter(Boolean);
	}; */

	generateGraph(purchases): any {
		// Data
		/* const user = this.generateIds(10000).map((x) => {
			return {
				...x,
				age: this.getRandom(12, 100),
				products: this.generateSells(),
			};
		}); */

		const ages = {
			rangeAges: [
				[12, 18],
				[19, 26],
				[27, 59],
				[60, 100],
			],
			getLabels: () => ages.rangeAges.map((x) => `${x[0]}-${x[1]} años`),
		};
		const barData = {labels: [], datasets: {data: []}};

		ages.rangeAges
			.map((x) => purchases.filter((y) => y.age >= x[0] && y.age <= x[1]))
			.map((x) => {
				let qty = 0;
				for (const item of x) qty += item.products.length;
				return qty;
			})
			.map((x, i) => {
				barData.labels.push(ages.getLabels()[i]);
				barData.datasets.data.push(x);
			});

		return barData;
	}
}
