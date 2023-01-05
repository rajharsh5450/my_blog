const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const articleRouter = require("./routes/articles");
const Article = require("./models/article");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  Article.find()
    .sort({ createdAt: "desc" })
    .then((articles) => {
      res.render("articles/index", { articles: articles });
    })
    .catch((e) => res.redirect("/articles/404"));
});

app.use("/articles", articleRouter);

mongoose.set({ strictQuery: false });
mongoose
  .connect(
    "mongodb+srv://shadow:1234567890@cluster0.vfkemtz.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to blog"))
  .catch((e) => console.log(e.message));

app.listen(PORT, () => console.log(`web app accessible at localhost:${PORT}`));
