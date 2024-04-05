const mongoose = require('mongoose');
const MONGO_URI = "mongodb+srv://carvecraze:CraveCraze@cluster0.aaupcid.mongodb.net/CraveCraze?retryWrites=true&w=majority&appName=Cluster0"

const mongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
        console.log("Connected to MongoDB");
        
        // const db =await  mongoose.connection.db.listCollections().toArray()
        // console.log(db);
        const fetch_data = await mongoose.connection.db.collection('food_items');
        const data = await fetch_data.find({}).toArray();


        if (data.length > 0) {
            global.food_items = data;
        } else {
            console.log("No data found in collection");
        }

        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();
        global.foodCategory = catData;
    } catch (error) {
        console.error("Error in fetching data from collection:", error);
    } finally {
        // Optionally close the connection
        // mongoose.connection.close();
    }
};

module.exports = mongoDB;


module.exports = mongoDB;