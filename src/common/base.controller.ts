import { Router } from 'express';
import { IControllerRoute } from './route.interface';
import { ParserService } from '../parser/parser.service';
import { injectable } from 'inversify';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	public _parserService: ParserService;
	constructor(parserService: ParserService) {
		this._router = Router();
		this._parserService = parserService;
	}

	get router(): Router {
		return this._router;
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}