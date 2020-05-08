const foodsearch = require('foodsearch');
const express = require('express');
const router = express.Router();

router.post('/search', async function (req, res) {
    const { categoryName } = req.body;

    try {
        const response = await foodsearch.searchByCategory(category = categoryName);

        console.log(response);
        res.json(response);
    } catch {
        res.send('There was an error searching foods');
    }

});

router.post('/fetch', async (req, res) => {
    const { foodID } = req.body;
    console.log(req.body);

    try {
        const response = await foodsearch.searchFoodDetails(foodID);

        console.log(response);
        res.json(response);
    } catch {
        console.log('There was an error fetching the food ID')
    }
});

module.exports = router;