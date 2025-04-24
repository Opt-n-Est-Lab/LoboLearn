import type { NextFunction, Request, Response } from 'express';
import { type HtmlSafeString } from '@prairielearn/html';
export type FlashMessageType = 'notice' | 'success' | 'warning' | 'error';
export interface FlashMessage {
    type: FlashMessageType;
    message: string;
}
export declare function flashMiddleware(): (req: Request, _res: Response, next: NextFunction) => void;
export declare function flash(type?: FlashMessageType | FlashMessageType[]): FlashMessage[];
export declare function flash(type: FlashMessageType, message: string | HtmlSafeString): void;
