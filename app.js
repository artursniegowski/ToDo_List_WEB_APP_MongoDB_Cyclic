const bodyParser = require('body-parser');
const express = require('express');
// for loading the env variables
require('dotenv').config();
// adding mongooes
const mongoose = require('mongoose');
// custom module - created 
const date = require(__dirname + '/date.js');
const _ = require("lodash");


// port on which the server will listen
// localhost:port
const port = process.env.PORT || 3000;

// creating express app
const app = express()
// using ejs
app.set('view engine', 'ejs');
// using body parser in the object (app)
app.use(bodyParser.urlencoded({extended: true}));
// serving static files
// now we can refer to static files with a relative path
app.use(express.static("public"));

// example :
// "mongodb+srv://username_mongodb_atlas:password_mongodb_atlas@cluster0.ywb8ehl.mongodb.net/?retryWrites=true&w=majority"
// "mongodb+srv://username_mongodb_atlas:password_mongodb_atlas@cluster0.ywb8ehl.mongodb.net/todolistDB"
const uriDB = process.env.MONGODB_URI.replace('username_mongodb_atlas', process.env.MONGODB_ATLAS_USER).replace('password_mongodb_atlas', process.env.MONGODB_ATLAS_PASSWORD)+"todolistDB" || "mongodb://127.0.0.1:27017/todolistDB";

// creating the connection to MongoDB Database
const connectDB = async () => {
    try{
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(uriDB);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

// creating items schema for mongoDB - mongoose
const itemsSchema = new mongoose.Schema({
    name: String,
});

// creating the collection in MongoDB
const ToDoListItem = mongoose.model('ToDoListItem', itemsSchema);
// creating start items for the above collection
const startToDoListsitems = [{ name: 'Make lunch' }, { name: 'Prepare for work' }, { name: 'Send Applications'}];

// list schema
// everytlist we create it will have a name
// and a list of items ToDoListItem
const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
});
// creating the model 
const List = mongoose.model('List', listSchema);


// routes
// home - get
app.get("/", (req, res)=>{

    // getting the day in specific form from our module
    const day = "Today"//date.getDate()

    // getting all elements from the database
    // from MongoDB
    ToDoListItem.find({}, (err, foundItems)=>{
        // inserting start values into databse
        // only if there arent ant items 
        if (foundItems.length === 0) {
            // saving to databse start values
            // just to prepopulate the data
            ToDoListItem.insertMany(startToDoListsitems, (error, docs) => {
                if (error) {
                    console.log(error)
                    console.log("Failure while writing data into database.");
                } else {
                    console.log("Init Data saved to databse.");
                }
                res.redirect("/");
            });
        } else {
            // converting the retrive data from the DB 
            // gettin the names and return it as a list
            // const getItemsNames = (data) => data.flat().map(({name})=>name)
            
            // console.log(getItemsNames(foundItems))
            
            // rendering the list ejs file with the given variables
            res.render('list', {
                listTitle: day,
                newListItems: foundItems,
            });
        }
    });
});

// home - post
app.post("/", (req, res) => {

    const listName = req.body.list;

    // getting the users input form the form
    // and adding it to the database MongoDB
    const newItemInput = new ToDoListItem({
        name: req.body.newItem,
    });

    if(listName === "Today") {
        // it means we are sending the post request from
        // the default list - so we simply save it

        // saves the new item into the databse
        newItemInput.save();
        // redirecting home
        res.redirect("/");
    } else {
        // it means we are sending post request from a 
        // dynamic created list
        // looking for the list that the post request came from
        List.findOne({name: listName}, (err, foundList) => {
            // adding the new item into the list
            foundList.items.push(newItemInput);
            // saving the updated list
            foundList.save(() => {
                // redirect to the updated list after saving
                res.redirect(`/${listName}`);
            });
        });
    }
});

// delete - post
app.post("/delete", (req, res) => {
    const checkedItemID = req.body.checkBox;
    const listName = req.body.listName;

    // this is the dafult list
    if (listName === "Today") {
        ToDoListItem.findByIdAndRemove(checkedItemID, (err) => {
            if (!err) {
                console.log("Successfully deleted checked item.");
                res.redirect("/");
            }
        }); 
    } else { // else the listName was creted dynamically
        // finds the list from the post request
        // and pull the item with the given id -
        // whcih means it will be deleted from the list
        List.findOneAndUpdate(
            {name: listName}, 
            { $pull: { items: {_id : checkedItemID}}}, 
            (error, results) =>{
                if (!error) {
                    res.redirect(`/${listName}`);
                }
            });
    }   

});

// about - get
app.get("/about", (req,res) => {
    res.render("about");
});

// dynamic get route like: /work
app.get("/:customListName", (req, res)=>{

    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}, (error, foundList) => {
        if (!error) {
            if (!foundList){
                // create the given list in the url
                // creating the data for the collection lists
                const list = new List({
                    name: customListName,
                    items: startToDoListsitems,
                });
                // saving the data into the MongoDB
                list.save(()=>{
                    // redirecting at to the route
                    res.redirect(`/${customListName}`);
                });
                
            } else {
                // show an existing list
                res.render('list', {
                    listTitle: foundList.name,
                    newListItems: foundList.items,
                });
            }
        }
    })
});


// connecting to the databse before listening
connectDB().then(() => {
    // general message from the server - to know that is running
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
})

