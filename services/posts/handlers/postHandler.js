const Post = require('../../../pkg/posts/postSchema');

exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      status: 'success',
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//post created by the user

exports.create = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.createByUser = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      plot: req.body.plot,
      author: req.auth.id,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.auth.id });
    res.status(201).json(posts);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
