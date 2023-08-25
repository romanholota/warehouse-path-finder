import { findFastestWay } from './lib/utils';
import { Point, Position, Product } from './lib/types';
import 'dotenv/config';
import axios, { AxiosResponse } from 'axios';
import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';

const hostname: string = process.env.HOSTNAME as string;
const port: number = Number(process.env.PORT);

const getPositions = (productId: string): Promise<Product> => {

    if (!process.env.API_URL || !process.env.API_KEY) {
        throw new Error('Missing env variables.')
    }

    return axios.get(
        process.env.API_URL + `/case-study/products/${productId}/positions`,
        {
            headers: {'x-api-key': process.env.API_KEY}
        }
    ).then((response: AxiosResponse<Position[]>): Product => {
        return {
            productId: productId,
            positions: response.data
        };
    });

};

const handleRequest = (req: Request, res: Response) => {

    const defaultPosition: Point = req.body['position'];
    const productIds = req.body['productIds'];
    let products;

    Promise.all(productIds.map(getPositions)).then((data: Product[]) => {
        products = data;
        const fastestWay = findFastestWay(products, defaultPosition);
        res.json(fastestWay);
    }).catch((err: Error) => {
        res.statusCode = 500;
        res.send(err.message);
    });

};

const app = express();
app.use(bodyParser.json());
app.post('/', handleRequest);

app.listen(port, hostname, () => {
    console.log(`Server is listening on ${hostname}:${port}`);
});