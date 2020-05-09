const foodsearch = require('foodsearch');
const express = require('express');
const router = express.Router();

router.post('/search', async function (req, res) {
    const { categoryName } = req.body;

    try {
        const response = await foodsearch.searchByCategory(category = categoryName);

        res.json(response);
    } catch {
        res.send('There was an error searching foods');
    }

});

router.post('/fetch', async (req, res) => {
    const { foodID, foodName } = req.body;
    console.log(foodName);

    try {
        const response = await foodsearch.searchFoodByName(foodName);

        console.log(response);
        res.json(response);
    } catch {
        console.log('There was an error fetching the meal')
    }
});

module.exports = router;