import axios, { AxiosResponse } from 'axios';
import { BaseController } from '../common/base.controller';
import { Request, Response } from 'express';
import { ParserService } from './parser.service';
import { IParserController } from './parser.controller.interface';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { IParserService } from './parser.servise.interface';

@injectable()
export class ParserController extends BaseController implements IParserController{
	url: string = 'https://www.wildberries.ru/catalog/6949065/detail.aspx?targetUrl=GP';

	constructor(@inject(TYPES.IParserService) parserService: IParserService) {
		super(parserService);
		this.bindRoutes([
			{path: '/', method: 'get', func: this.index},
			{path: '/parse', method: 'get', func: this.parse}
		]);
	}

	index(req: Request, res: Response): void {
		res.send('Начальная страница');
	}

	async parse(req: Request, res: Response): Promise<void> {
		const {data} = await axios.get(this.url);
		const price = this._parserService.price(data);
		const title = this._parserService.title(data);
		await res.send({
			title,
			price
		});
	}
}