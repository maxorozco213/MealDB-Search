const foodsearch = require('foodsearch');
const express = require('express');
const router = express.Router();

router.get('/search', async (req, res) => {

    
    try {
        const results = await foodsearch.searchByCategory(req);

        res.json(results);
    } catch {
        console.log('error')
    }
    
    console.log(results);
});

router.get('/fetch', async (req, res) => {
    try {
        const results = await foodsearch.searchMeal(req);

        res.json(results);
    } catch {
        console.log('error')
    }
    
    console.log(results);
});

module.exports = router;