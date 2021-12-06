import cheerio from 'cheerio';

export class ParserService {
	constructor() {}

	title(data: string): string {
		let title: string = '';
		let $ = cheerio.load(data);

		$('.same-part-kt__header').each((i, elem) => {
			title = $(elem).text();
		});

		return title;
	}

	price(data: string): string {
		let price: string = '';
		let filteredPrice: string[] = [];
		let $ = cheerio.load(data);

		$('.price-block__final-price').each((i, elem) => {
			price = ($(elem).text());
			price.split('').forEach(elem => {
				if (parseInt(elem)) {
					filteredPrice.push(elem);
				}
			});
		});
		return filteredPrice.join('');
	}
}