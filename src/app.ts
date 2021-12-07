import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { json } from 'body-parser';
import 'reflect-metadata';
import { ParserController } from './parser/parser.controller';
import { TYPES } from './types';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(@inject(TYPES.IParserController) public parserController: ParserController) {
		this.app = express();
		this.port = 8000;
		this.parserController = parserController;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/', this.parserController.router);
		this.app.use('/parse', this.parserController.router);
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.server = this.app.listen(this.port);
		console.log(`Server is running on port ${this.port}`);
	}
}