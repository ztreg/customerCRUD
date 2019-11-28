let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let statusInfo = require('morgan');
let fs = require('fs')
const app = express();
let randomID = require("uuid/v4");

app.use(express.static("customer"));
let customerJSON = fs.readFileSync("./customer/customer.json");
let jsonData = JSON.parse(customerJSON);
console.log(jsonData);

app.use(bodyParser.urlencoded({
extended: false
}));
app.use(bodyParser.json());

app.use(cors());

app.get("/customer", function(req, res) {
    res.json(jsonData);

});

app.post("/customer", function(req, res){
    let newID = randomID();
    let newName = req.body.customerName;
    let newOrder = req.body.order;
    let newCountry = req.body.country;
    let newCustomer = {
        id : newID,
        name : newName,
        order : newOrder,
        country : newCountry
    };
    
    jsonData.push(newCustomer);
    //let newList = JSON.stringify(jsonData);
    //console.log(newCustomer);
    //res.render("/");

});

app.put("/customer", function(req, res){
    let editedID = req.body.id;
    let editedName = req.body.customerName;
    let editedOrder = req.body.order;
    let editedCountry = req.body.country;
    let editedCustomer = {
        id : editedID,
        name : editedName,
        order : editedOrder,
        country : editedCountry
    };
    console.log(jsonData.length);
    console.log("hej");

    // Remove item from the books array
    for (let i = 0; i < jsonData.length; i++) {
        let customerList = jsonData[i]
        if (customerList.id == editedID) {
            customerList[i] = editedCustomer;
            console.log("worked");
        }
        else {
            console.log("did not work");
        }
    }
    
    //let newList = JSON.stringify(jsonData);
    
    //res.render("/");

});


app.listen(3000);