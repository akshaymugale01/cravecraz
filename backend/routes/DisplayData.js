 
const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        // console.log(global.food_items);
        res.send([global.food_items, global.foodCategory])
    } catch (error) {
        console.error(error.message);
        res.send("Server Error")
    }
});
router.get('/foodData', (req, res) => {
    try {
        //console.log(global.food_items);
        res.send([global.food_items,global.foodCategory])
    } catch (error) {
        console.error(error.message);
        res.send("Server Error")
    }
});

module.exports = router;


/*

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Route to retrieve food data
router.get('/foodData', async (req, res) => {
    try {
        // Fetch food data from the database
        const foodItems = await FoodItem.find();
        const foodCategories = await FoodCategory.find();
        
        // Send the retrieved data as a response
        res.json({ foodItems, foodCategories });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Validation middleware for the POST request
const validateFoodData = [
    body('data').isArray().withMessage('Data should be an array'),
    // Add more validation rules as needed
];

// Route to update food data
router.post('/foodData', validateFoodData, async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Process and update food data in the database
        // Implementation depends on the specific requirements

        res.json({ success: true, message: "Food data updated successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;

*/