import {App} from './app';
import { ParserController } from './parser/parser.controller';
import { ParserService } from './parser/parser.service';

async function bootstrap() {
	const parserService = new ParserService();
	const parserController = new ParserController(parserService);
	const app = new App(parserController);
	await app.init();

}

bootstrap();