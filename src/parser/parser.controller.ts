import axios, { AxiosResponse } from 'axios';
import { BaseController } from '../common/base.controller';
import { Request, Response } from 'express';
import { ParserService } from './parser.service';

export class ParserController extends BaseController {
	url: string = 'https://www.wildberries.ru/catalog/6949066/detail.aspx?targetUrl=GP';

	constructor(parserService: ParserService) {
		super(parserService);
		this.bindRoutes([
			{path: '/', method: 'get', func: this.index},
			{path: '/parse', method: 'get', func: this.parse}
		]);
	}

	index(req: Request, res: Response) {
		res.send('Начальная страница');
	}

	async parse(req: Request, res: Response) {
		const {data} = await axios.get(this.url);

		const price = this._parserService.price(data);

		const title = this._parserService.title(data);

		await res.send({
			title,
			price
		});
	}
}