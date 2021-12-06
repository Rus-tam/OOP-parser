import express, { Express } from 'express';
import { Server } from 'http';
import { ParserController } from './parser/parser.controller';

export class App {
	app: Express;
	server: Server;
	port: number;

	parserController: ParserController;

	constructor(parserController: ParserController) {
		this.app = express();
		this.port = 8000;
		this.parserController = parserController;
	}

	useRoutes(): void {
		this.app.use('/', this.parserController.router);
		this.app.use('/parse', this.parserController.router);
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.server = this.app.listen(this.port);
		console.log(`Server is running on port ${this.port}`);
	}
}