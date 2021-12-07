import { Container, interfaces, ContainerModule } from 'inversify';
import { App } from './app';
import { ParserController } from './parser/parser.controller';
import { IParserService } from './parser/parser.servise.interface';
import { ParserService } from './parser/parser.service';
import { TYPES } from './types';
import { IParserController } from './parser/parser.controller.interface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
	bind<IParserController>(TYPES.IParserController).to(ParserController);
	bind<IParserService>(TYPES.IParserService).to(ParserService);

	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBinding);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { appContainer, app } = bootstrap();
