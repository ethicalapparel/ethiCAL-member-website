var express = require('express');
var router = express.Router();

var axios = require('axios');
const SQUARE_AUTH_HEADER = "Bearer " + process.env.SQUARE_PAT;

var client = axios.create({
    baseURL: 'https://connect.squareup.com/v1',
    headers: {'Authorization': SQUARE_AUTH_HEADER, 'Content-Type': 'application/json'},
});

router.get('/items', function(req, res, next) {
    items = {};
    client.get('/5M3M8S410TED1/items')
        .then(function(cliResponse) {
            cliResponse.data.forEach(function(item) {
                item.variations.forEach(function(variation) {
                    items[variation.id] = {
                        name: item.name,
                        variation: variation.name,
                        price: variation.price_money.amount
                    }
                })
            })
            res.json(items);
        })
})

router.get('/inventory', function(req, res, next) {
    client.get('/5M3M8S410TED1/inventory') 
        .then(function(cliResponse) {
            res.json(cliResponse.data);
        })
})

module.exports = router;
