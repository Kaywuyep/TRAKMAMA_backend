const SupportGroup = require("../models/supportGroup");
const User = require("../models/usermodel");


const getAllUsersInGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    // Fetch the support group and populate members
    const group = await SupportGroup.findById(groupId).populate('members');

    if (!group) {
      return res.status(404).json({ message: "Support group not found" });
    }

    // Return the list of members
    res.status(200).json({ members: group.members });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: error.message });
  }
};

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
    //const userId = req.userAuthId;
    const id = req.params.id
    // Fetch the user
    const user = await User.findById({ _id: id});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const group = await SupportGroup.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Support group not found" });
    }

    if (!group.members.includes(user._id)) {
      group.members.push(user._id);
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
    const id = req.params.id;
    const { content } = req.body;
    // Fetch the user
    const user = await User.findById({ _id: id});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const group = await SupportGroup.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Support group not found" });
    }

    const newPost = {
      username: user._id,
      content
    };

    group.posts.push(newPost);
    await group.save();

    res.status(201).json({ message: "Post added successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeMemberFromGroup = async (req, res) => {
  try {
    const { groupId, id } = req.params;

    console.log('Group ID:', groupId); // Debug log
    console.log('User ID to remove:', id); // Debug log
    //const id = req.params.id
    // Fetch the user
    const user = await User.findById({ _id: id});
    //const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the support group
    const group = await SupportGroup.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Support group not found" });
    }

    // Check if the user is a member of the group
    const userIndex = group.members.indexOf(user._id);
    if (userIndex === -1) {
      return res.status(400).json({ message: "User is not a member of the group" });
    }

    // Remove the user from the group's members list
    group.members.splice(userIndex, 1);
    await group.save();

    res.status(200).json({ message: "Successfully removed the user from the group", group });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteGroupById = async (req, res) => {
  try {
      const id = req.params.id;

      const GroupExistExist = await Book.findOne({ _id: id });

      if (!GroupExist) {
          return res.status(404).json({ message: "Group not found!"})
      }
      const deleteGroup = await Book.findByIdAndDelete(id);

      if (!deleteGroup) {
          return res.status(404).json({ error: "Group not found!"})
      }
      res.status(200).json({ message: "Group successfully deleted!"});
  } catch(error) {
      res.status(500).json({error: error.message})
  }
};


module.exports = {
  getAllUsersInGroup,
  createSupportGroup,
  joinSupportGroup,
  postInSupportGroup,
  removeMemberFromGroup,
  deleteGroupById
};