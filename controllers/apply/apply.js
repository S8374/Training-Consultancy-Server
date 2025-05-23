const { ObjectId } = require('mongodb');
const { db } = require("../../database/db");
const application_Collection = db.collection("Application");

const save_apply = async (req, res) => {
  try {
    const newApplication = req.body;
    const result = await application_Collection.insertOne(newApplication);
    res.status(201).json({ ...newApplication, _id: result.insertedId });
  } catch (error) {
    console.error("Error applying for visa:", error);
    res.status(500).json({ error: "Failed to apply for visa" });
  }
};

const get_Apply = async (req, res) => {
  try {
    const applications = await application_Collection.find().toArray();
    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

const delete_Apply = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params,id);
    const result = await application_Collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ error: "Failed to delete application" });
  }
};

// NEW ENDPOINT FOR CONFIRMATION
const confirm_Apply = async (req, res) => {
  try {
    const { id } = req.params;
    const { Booked } = req.body;
    
    const result = await application_Collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { Booked } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Application not found or no changes made" });
    }

    res.json({ message: "Application status updated successfully", modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error("Error confirming application:", error);
    res.status(500).json({ error: "Failed to confirm application" });
  }
};



module.exports = { 
  save_apply,
  get_Apply,
  delete_Apply,
  confirm_Apply
};

