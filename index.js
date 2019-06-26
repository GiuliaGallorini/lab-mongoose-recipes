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

// First: delete all recipes from the database
Recipe.deleteMany().then(() => {
  // Iteration 2 create the recipe
  Recipe.create({
    title: "Pastel de Nata",
    cuisine: "Portuguese",
    ingredients: ["cream", "sugar", "eggs", "dough"]
  }).then(recipe => {
    console.log(`The recipe "${recipe.title}" has been created `);
  });

  // Iteration 3: also works with create()
  Recipe.insertMany(data).then(recipes => {
      console.log("These are the titles of the recipes");
      for (let n = 0; n < recipes.length; n++) {
        console.log("- " + recipes[n].title);
      }

      // Iteration 4
      Recipe.updateOne(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 }
      ).then(res => {
        console.log(
          `The update is succesful and updated ${res.nModified} recipe(s)`
        );
      });

      // Iteration 5
      Recipe.deleteOne({ name: "Carrot Cake" }).then(res => {
        console.log(`The "Carrot Cake" is deleted`, res);

        // Iteration 6
        // Close the connection to the database
        // Optional (it is cleaner)
        mongoose.connection.close();
      });
    })

    .catch(err => {
      console.error("An error happened", err);
    });
});
