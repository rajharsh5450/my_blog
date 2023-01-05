const express = require("express");
const Article = require("../models/article");
const router = express.Router();

router.post("/", (req, res) => {
  const article = {
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  };

  Article.create(article)
    .then((newArticle) => {
      res.redirect(`/articles/${newArticle.slug}`);
    })
    .catch((e) => {
      console.log(e);
      res.render("articles/new", { article: article });
    });
});

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/edit/:slug", (req, res) => {
  Article.findOne({ slug: req.params.slug })
    .then((article) => {
      res.render("articles/edit", { article: article });
    })
    .catch((e) => res.redirect("/articles/404"));
});

router.get("/404", (req, res) => res.render("articles/error"));

router.get("/:slug", (req, res) => {
  Article.findOne({ slug: req.params.slug })
    .then((article) => {
      if (!article) res.redirect("/");
      res.render("articles/show", { article: article });
    })
    .catch((e) => res.redirect("/articles/404"));
});

router.delete("/:id", (req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/"))
    .catch((e) => res.redirect("/articles/404"));
});

module.exports = router;
