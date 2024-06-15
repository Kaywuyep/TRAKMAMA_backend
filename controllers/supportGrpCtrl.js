const SupportGroup = require("../models/supportGroup");
const User = require("../models/usermodel");

const createSupportGroup = async (req, res) => {
  try {
    const { groupName, groupType, description } = req.body;
    const newGroup = new SupportGroup({
      groupName,
      groupType,
      description
    });

    await newGroup.save();
    res.status(201).json({ message: "Support group created successfully", group: newGroup });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const joinSupportGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.userAuthId;

    const group = await SupportGroup.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Support group not found" });
    }

    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }

    res.status(200).json({ message: "Successfully joined the group", group });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postInSupportGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.userAuthId;
    const { content } = req.body;

    const group = await SupportGroup.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Support group not found" });
    }

    const newPost = {
      username: userId,
      content
    };

    group.posts.push(newPost);
    await group.save();

    res.status(201).json({ message: "Post added successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSupportGroup,
  joinSupportGroup,
  postInSupportGroup
};