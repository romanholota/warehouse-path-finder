import { findFastestWay, findNearestUnpicked, getDistance } from './utils';
import { Product } from './types';

describe('utils.ts', () => {

    const products: Array<Product> = [
        {
            productId: 'product-4',
            positions: [
                {
                    positionId: 'position-591',
                    x: 63,
                    y: 1,
                    z: 200,
                    productId: 'product-4',
                    quantity: 16
                },
                {
                    positionId: 'position-260',
                    x: 60,
                    y: 12,
                    z: 0,
                    productId: 'product-4',
                    quantity: 7
                },
                {
                    positionId: 'position-120',
                    x: 0,
                    y: 6,
                    z: 0,
                    productId: 'product-4',
                    quantity: 9
                },
                {
                    positionId: 'position-232',
                    x: 66,
                    y: 11,
                    z: 0,
                    productId: 'product-4',
                    quantity: 14
                },
                {
                    positionId: 'position-630',
                    x: 0,
                    y: 5,
                    z: 200,
                    productId: 'product-4',
                    quantity: 3
                }
            ]
        },
        {
            productId: 'product-1',
            positions: [
                {
                    positionId: 'position-31',
                    x: 3,
                    y: 1,
                    z: 0,
                    productId: 'product-1',
                    quantity: 13
                },
                {
                    positionId: 'position-449',
                    x: 87,
                    y: 7,
                    z: 100,
                    productId: 'product-1',
                    quantity: 4
                },
                {
                    positionId: 'position-404',
                    x: 42,
                    y: 6,
                    z: 100,
                    productId: 'product-1',
                    quantity: 16
                },
                {
                    positionId: 'position-282',
                    x: 36,
                    y: 0,
                    z: 100,
                    productId: 'product-1',
                    quantity: 12
                },
                {
                    positionId: 'position-458',
                    x: 24,
                    y: 10,
                    z: 100,
                    productId: 'product-1',
                    quantity: 10
                },
                {
                    positionId: 'position-175',
                    x: 75,
                    y: 7,
                    z: 0,
                    productId: 'product-1',
                    quantity: 9
                },
                {
                    positionId: 'position-397',
                    x: 21,
                    y: 6,
                    z: 100,
                    productId: 'product-1',
                    quantity: 6
                }
            ]
        }
    ];

    const correctPickingOrder = [
        {
            productId: 'product-1',
            positionId: 'position-31'
        },
        {
            productId: 'product-4',
            positionId: 'position-120'
        }
    ];

    test('should find correct path', () => {

        const response = findFastestWay(products, {x: 0, y: 0, z: 0});

        expect(response.pickingOrder).toStrictEqual(correctPickingOrder);

    });

    test('should calculate distance', () => {

        const distance = getDistance({x: 0, y: 0 , z: 0}, {x: 2, y: 2, z: 1});

        expect(distance).toEqual(3);

    });

    test('should find nearest unvisited point', () => {

        const result = findNearestUnpicked({x: 0, y: 0, z: 0}, products);

        expect(result?.productId).toStrictEqual('product-1');

    });

    test('should throw error', () => {

        // @ts-ignore
        const errorFn = () => findNearestUnpicked({x: 0, y: 'NaN', z: 0}, products);

        expect(errorFn).toThrow('Invalid coordinates.');

    });

});