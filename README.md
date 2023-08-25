# Warehouse Path Finder

Warehouse Path Finder provides simple API for finding the optimal path for a warehouse employees.
It uses the Nearest Neighbor Algorithm, which is an optimal solution for our use case.

## Installation

### Dependencies

Using NPM
```
npm install
```

### Environment variables
Application depends on env variables, that need to be defined in `.env` file.
Example below, replace `???` with your configuration.
```
API_URL=???
API_KEY=???
HOSTNAME=???
PORT=??
```

## Tests
For testing purposes you can use `test` script.
```
npm run test
```

## Running

For starting server you should use script `start`.
```
npm run start
```

## Usage
The service will be available on hostname and port defined in `.env` file.
You can only make POST request to this URL.

### Example request body
```json
{
    "productIds": [
        "product-1",
        "product-2",
        "product-3",
        "product-4",
        "product-5"
    ],
    "position": {
        "x": 0,
        "y": 0,
        "z": 0
    }
}
```

### Example response
```json
{
    "pickingOrder": [
        {
            "productId": "product-1",
            "positionId": "position-31"
        },
        {
            "productId": "product-4",
            "positionId": "position-120"
        },
        {
            "productId": "product-2",
            "positionId": "position-241"
        },
        {
            "productId": "product-3",
            "positionId": "position-124"
        },
        {
            "productId": "product-5",
            "positionId": "position-216"
        }
    ],
    "distance": 34.328336989811675
}
```