const User = require("../models/user");
const Document = require("../models/document");

const getUserDocuments = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("firstName lastName email");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const documents = await Document.find({ user: user._id }).populate("user");

    res.status(200).json({ user, documents });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const save = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId;

  try {
    // Verify that the user exists
    const user = await User.findById(userId);

    //console.log("user", user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create and store the document
    const document = new Document({
      title,
      content,
      user: userId, // Associate the document with the user
    });

    await document.save();

    res.status(201).json({ message: "Document created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to store the document" });
  }
};

module.exports = { save, getUserDocuments };
