const express = require("express");
const Article = require("../models/article");
const router = express.Router();

const saveArticleAndRedirect = (path) => {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;

    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (e) {
      res.render(`articles/${path}`, { article: article });
    }
  };
};

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/edit/:slug", (req, res) => {
  Article.findOne({ slug: req.params.slug })
    .then((article) => {
      res.render("articles/edit", { article: article });
    })
    .catch((e) => res.redirect("/404"));
});

router.get("/:slug", (req, res) => {
  Article.findOne({ slug: req.params.slug })
    .then((article) => {
      if (!article) res.redirect("/404");
      res.render("articles/show", { article: article });
    })
    .catch((e) => res.redirect("/404"));
});

router.post(
  "/",
  (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);

router.put(
  "/:slug",
  (req, res, next) => {
    Article.findOne({ slug: req.params.slug })
      .then((article) => {
        req.article = article;
        next();
      })
      .catch((e) => res.redirect("/404"));
  },
  saveArticleAndRedirect("edit")
);

router.delete("/:id", (req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/"))
    .catch((e) => res.redirect("/404"));
});

module.exports = router;
