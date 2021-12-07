import { Request, Response } from 'express';

export interface IParserController {
	index: (req: Request, res: Response) => void;
	parse: (req: Request, res: Response) => Promise<void>;
}