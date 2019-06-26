const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.deleteMany({}).then(() => {
  
  Recipe.create(data)
    .then(recipe => {
      for (let n = 0; n < recipe.length; n++)
      {console.log("The title of the recipe is: " + recipe[n].title)};
    })
    .catch(err => {
      console.error("Error connecting to mongo", err);
    });

    Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(successCallback)
  .catch(errorCallback);

});


