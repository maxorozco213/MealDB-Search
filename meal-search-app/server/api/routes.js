const foodsearch = require('foodsearch');
const express = require('express');
const router = express.Router();

// router.post('/search', async (req, res) => {

    
//     try {
//         const results = await foodsearch.searchByCategory(req);

//         res.json(results);
//     } catch {
//         console.log('error')
//     }
    
//     console.log(results);
// });

router.post('/fetch', async function (req, res) {
    try {
        console.log(req.body);
        res.send('hi');
    } catch {
        res.send('There was an error');
    }
    
    
});

module.exports = router;