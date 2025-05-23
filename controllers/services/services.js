const { ObjectId } = require('mongodb');
const { db } = require("../../database/db");
const services_Collection = db.collection("Services");

// Get all services
const get_services = async (req, res) => {
  try {
    const services = await services_Collection.find().toArray();
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

// Add a new service
const add_service = async (req, res) => {
  try {
    const newService = req.body;
    const result = await services_Collection.insertOne(newService);
    res.status(201).json({ ...newService, _id: result.insertedId });
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ error: "Failed to add service" });
  }
};

// Update a service
const update_service = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = req.body;
    const result = await services_Collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedService }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json({ ...updatedService, _id: id });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Failed to update service" });
  }
};

// Delete a service
const delete_service = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await services_Collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Failed to delete service" });
  }
};

module.exports = {
  get_services,
  add_service,
  update_service,
  delete_service
};