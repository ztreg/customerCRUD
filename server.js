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
//console.log(jsonData);

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
        customer : newName,
        order : newOrder,
        country : newCountry
    };
    
    let previousLengthOfObject = jsonData.length;
    jsonData.push(newCustomer);

    if(jsonData.length > previousLengthOfObject){
        res.redirect('http://127.0.0.1:3001/');
    }
    else {
      res.sendStatus(404);
    }
    
   

    //let newList = JSON.stringify(jsonData);
    //console.log(newCustomer);
    

});
app.delete("/deleteCustomer/:id", function(req, res) {
    let customerToDelete = req.params.id;

    let customer = jsonData.filter(customer => {
        return customer.id = customerToDelete;
    })[0];
    const index = jsonData.indexOf(customer);
    jsonData.splice(index, 1);
    response.json({message: `User ${customerToDelete} deleted`});
}






    console.log(customerToDelete);
    console.log("im in");
    // edit item from the customer array
    for (let i = 0; i < jsonData.length; i++) {
        
        customerList.push(jsonData[i]);
        if (customerList[i].id == customerToDelete) {
            //customerList[i] = editedCustomer;
            console.log("tar bort kund med id " +  customerToDelete);
            customerList.splice(customerToDelete, 1);
            console.log(jsonData);
            res.redirect('http://127.0.0.1:3001/');
        }
    }
    if(customerList.length == 0) {
        console.log("did not work");
        res.send(500);
    }
    

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

    // edit item from the customer array
    for (let i = 0; i < jsonData.length; i++) {
        let customerList = jsonData[i];
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