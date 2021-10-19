const ObjectId = require("mongoose").Types.ObjectId;
const PostMessage = require("./../models/postMessage");

exports.getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({})

    const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
    res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPost = async (req, res) => {
  const { id } = req.params;
  try {   
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPostBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!ObjectId.isValid(_id))
    return res.status(404).send("Немає такого ід поста");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  res.json(updatedPost);
};

exports.deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!ObjectId.isValid(_id))
    return res.status(404).send("Немає такого ід поста");

  await PostMessage.findByIdAndRemove(_id);
  res.status(200).json({ message: "Пост видалено" });
};

exports.likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json("Ви не авторизовані");

  if (!ObjectId.isValid(_id))
    return res.status(404).send("Немає такого ід поста");

  const post = await PostMessage.findById(_id);

  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};
