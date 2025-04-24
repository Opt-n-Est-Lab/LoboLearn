import type { Express, Router } from 'express';
export interface Endpoint {
    path: string;
    methods: string[];
    middlewares: string[];
}
/**
 * Returns an array of strings with all the detected endpoints
 * @param app The express/router instance to get the endpoints from
 * @returns The array of endpoints
 */
declare function expressListEndpoints(app: Express | Router | any): Endpoint[];
export default expressListEndpoints;
