const { python } = require("compile-run");
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    post: { name: "Anmol", content: "Something" },
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: "Post created successfully",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};

exports.run = async (req, res, next) => {
  const sourcecode = req.body.sourcecode;
  try {
    let resultPromise = await python.runSource(sourcecode);
    if (resultPromise.stderr) {
      res.status(400).json({ message: "Error", output: e });
    }
    res.status(200).json({ message: "Success", output: resultPromise });
  } catch (e) {
    res.status(400).json({ message: "Error", output: e });
  }
};
