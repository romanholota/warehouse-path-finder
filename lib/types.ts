export interface Point {
    x: number;
    y: number;
    z: number;
}

export interface Response {
    pickingOrder: Array<{positionId: string, productId: string}>;
    distance: number;
}

export interface Result {
    productId: string;
    positionId: string;
    point: Point;
    distance: number;
}

export interface Position {
    positionId: string;
    x: number;
    y: number;
    z: number;
    productId: string;
    quantity: number;
}

export interface Product {
    productId: string;
    positions: Array<Position>;
}