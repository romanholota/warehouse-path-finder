import { Point, Product, Response, Result } from './types';

export function getDistance(point1: Point, point2: Point): number {

    const a = point2.x - point1.x;
    const b = point2.y - point1.y;
    const c = point2.z - point1.z;

    return Math.sqrt(a * a + b * b + c * c);

}

export function findNearestUnpicked(currentPoint: Point, unpickedProducts: Array<Product>): Result | null {

    let minDistance: number = Infinity;
    let result: Result | null = null;

    for (const product of unpickedProducts) {

        for (const position of product.positions) {

            const distance = getDistance(currentPoint, {x: position.x, y: position.y, z: position.z});

            if (isNaN(distance)) {
                throw new Error('Invalid coordinates.');
            }

            if (distance < minDistance) {
                minDistance = distance;
                result = {productId: product.productId, positionId: position.positionId, point: {x: position.x, y: position.y, z: position.z}, distance: distance};
            }

        }

    }

    return result;

}

export function findFastestWay(products: Array<Product>, startingPoint: Point): Response {

    const response: Response = {
        pickingOrder: [],
        distance: 0
    };

    let unpickedProducts: Array<Product> = products;
    let currentPoint: Point = startingPoint;

    while (unpickedProducts.length > 0) {

        const result = findNearestUnpicked(currentPoint, unpickedProducts);

        if (!result) {
            throw new Error('Unable to find product.');
        }

        response.pickingOrder.push({productId: result.productId, positionId: result.positionId});
        response.distance += result.distance;

        currentPoint = result.point;
        unpickedProducts = unpickedProducts.filter(product => product.productId !== result.productId);

    }

    return response;

}
