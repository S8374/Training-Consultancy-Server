const express = require("express");
const { get_services, delete_service, update_service, add_service} = require("../controllers/services/services");
const { get_Apply, save_apply, delete_Apply, confirm_Apply } = require("../controllers/apply/apply");

const routes = express.Router();
//services
routes.get("/services", get_services); 
routes.delete("/services/:id", delete_service); 
routes.put("/services/:id", update_service); 
routes.post("/services/:id", add_service); 
//apply
routes.get("/apply", get_Apply);
routes.post("/apply", save_apply);
routes.delete("/apply/:id", delete_Apply);
// New confirmation route
routes.patch('/apply/:id', confirm_Apply);
module.exports = { routes };
