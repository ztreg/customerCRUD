let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let statusInfo = require('morgan');
let fs = require('fs');
let http = require('http');
const fetch = require("node-fetch");
let request = require("request");


const app = express();

let jsonData;

/*fetch("127.0.0.1:3000/customerlist")
.then((resp) => resp.json())
  .then(function(data) {
    jsonData = data;
    });
  */
function updateCustomerListFrontEnd() {
  request("http://127.0.0.1:3000/customer", function(error, response, body) {
    console.log(body);
    jsonData = JSON.parse(body);
    //console.log(response);
  });
}


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(cors());

app.set("view engine", "ejs");
app.use(express.static("views"));

app.get("/", function(req, res) {
  updateCustomerListFrontEnd();
  res.render("customer", {
    customers: jsonData
  });
});

app.get("/createCustomer", function(req, res) {
  res.render("createCustomer");
});
app.get("/editCustomer", function(req, res) {
  res.render("editCustomer");
});
app.get("/editCustomer/:id", function(req, res) {
  let id = req.params.id;
  let editCustomer = {
    id: "",
    name: "",
    order: "",
    country: ""

  };
  for (x of jsonData) {
    if (x.id == req.params.id) {
      editCustomer.id = x.id;
      editCustomer.name = x.customer;
      editCustomer.order = x.order;
      editCustomer.country = x.country;
      console.log("okok");

    }
  }
  console.log(editCustomer);
  res.render("editCustomer", {
    editCustomer
  });
});


app.listen(3001);


/*let options = {
    host: "127.0.0.1/customerlist",
    port: "3000",
    path: "/"
}

let request = http.request(options, function(res){
    let data = "";
    res.on("data", function(chunk){
        data += chunk;
    });
    res.on("end", function(){
        console.log(data);
    });
});
request.end();
*/
