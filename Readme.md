# ToDo_List_WEB_APP_MongoDB_Cyclic

Website is live on: https://arturos-todolist.cyclic.app/work</br>

This is a to-do list web app with dynamically created routes, and the data from the list is stored in a NoSQL database - MongoDB and managed with the use of mongoose-js. In this project MongoDB Atlas was used, which is a fully-managed cloud database that handles all the complexity of deploying, managing, and healing your deployments on the cloud service provider of your choice (AWS , Azure, and GCP). There are two main routes, the first one is the main route (/) which shows the title "Todo" with three example tasks; the other route is (/about) with an example description.
On top of that, whenever the user chooses to access any different routes like "/work", "/school", "/education" etc - by accessing them for the first time, the server will take the name of the route and create from it a collection in the MongoDB database. This is an example of how dynamic routing with parameters works in Express-js. The data is stored in MongoDB, so it will not get lost after resetting the server. The user can delete elements from any list by checking them, this will create a post request that will be processed in the "/delete" route, and the given element will be erased from the database. The users can also add elements to any list by simply typing the task name and hitting the plus sign. This will be processed on the backend, and the right collection will get updated in MongoDB. This web app was developed using Node.js, Express.js, MongoDB, Mongoose, EJS, CSS, HTML, and JavaScript. It was deploy on https://www.cyclic.sh/ .

---

Useful Links:

MongoDB</br>
https://www.mongodb.com/home</br>
https://www.mongodb.com/docs/manual/</br>

MongoDB Atlas - for running the MongoDB in the cloud</br>
https://www.mongodb.com/docs/atlas/</br>

mongoose</br>
https://mongoosejs.com/</br>

Express.js</br>
https://expressjs.com/</br>

Node.js</br>
https://nodejs.org/en/docs/</br>

body-parser from Node.js</br>
https://www.npmjs.com/package/body-parser</br>

dotenv</br>
https://www.npmjs.com/package/dotenv</br>

nodemon</br>
https://www.npmjs.com/package/nodemon</br>

creating and using custom modules in node</br>
https://nodejs.org/dist/latest-v18.x/docs/api/module.html</br>

templating with EJS</br>
https://ejs.co/#promo</br>
https://github.com/mde/ejs/wiki/Using-EJS-with-Express</br>

lodash</br>
https://lodash.com/</br>

Cyclic</br>
https://www.cyclic.sh/</br>
https://web322.ca/getting-started-with-cyclic.html</br>

Using MongoDB with cyclic</br>
https://docs.cyclic.sh/how-to/using-mongo-db</br>


---

**Example views from the website:**</br>
</br>


![Screenshot](docs/img/01_image.png)</br>


![Screenshot](docs/img/02_image.png)</br>


![Screenshot](docs/img/03_image.png)</br>


![Screenshot](docs/img/04_image.png)</br>


![Screenshot](docs/img/05_image.png)</br>


![Screenshot](docs/img/06_image.png)</br>


![Screenshot](docs/img/07_image.png)</br>


---

**The program was developed using Node.js, Express.js, MongoDB, MongoDB Atlas, Mongoose, EJS, JavaScript, HTML, CSS, lodash, Cyclic - deployment**

---

Steps required to run the server/web application:</br>
1. Use 'npm install' command to install the dependencies from package.json.</br>
2. Create a free account at https://www.mongodb.com/cloud/atlas/register to manage and run your database from the cloud. </br>
3. Next follow the steps from the docs https://www.mongodb.com/docs/atlas/ for:</br>
- Deploy a Database,</br>
- Secure your Database,</br>
MAKE SURE THAT YOU ENABLE "ALLOW ACCESS FROM ANYWHERE" IN THE "Edit IP Access List Entry" IN "Network Access" with "0.0.0.0/0  (includes your current IP address)".
https://www.mongodb.com/docs/atlas/security/ip-access-list/#configure-ip-access-list-entries</br>
- Connect to your Database</br>
4. Change the name of .env.example to .env.</br>
5. Define the environmental variables in .env:</br>
**MONGODB_URI** = "mongodb+srv://username_mongodb_atlas:password_mongodb_atlas@your_uri_mongodb_uri/" - this has to be adjusted as stated in the step 3 (Connect to your Database) , but the part "username_mongodb_atlas:password_mongodb_atlas" needs to stay as in the example above, because the server will replace these values withe the env variables bellow.</br>
**MONGODB_ATLAS_USER** = "your_user_name_mongodb_atlas" - from step 3 (Secure your Database) - Configure Database Users.
**MONGODB_ATLAS_PASSWORD** = "your_user_password_mongodb_atlas" - from step 3 (Secure your Database) - Configure Database Users.
6. Start the server file app.js with the command **node app.js** or **nodemon app.js** if you wish to enable automatic server reloading after detecting file changes.</br>
7. Open your web browser and navigate to localhost:3000, where the website will be live.</br>
======If you wish to host the website on a server, continue the steps below.=======</br>
7. Create a github account and push your project to a newly created repository (https://github.com/). </br>
8. Deploy your project on https://www.cyclic.sh/, following the steps described in the following link: https://web322.ca/getting-started-with-cyclic.html. At the end, don't forget to set your environmental variables.</br>
For help with MongoDB and cyclic: https://docs.cyclic.sh/how-to/using-mongo-db</br>
