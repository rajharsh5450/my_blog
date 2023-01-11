const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const articleRouter = require("./routes/articles");
const authRouter = require("./routes/auth");
const Article = require("./models/article");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

//Home Page route
app.get("/", (req, res) => {
  Article.find()
    .sort({ createdAt: "desc" })
    .then((articles) => {
      res.render("articles/index", { articles: articles });
    })
    .catch((e) => res.redirect("/404"));
});

//Error route
app.get("/404", (req, res) => res.render("error"));

//Articles route
app.use("/articles", articleRouter);

//Authentication routes
app.use("/auth", authRouter);

mongoose.set({ strictQuery: false });
mongoose
  .connect(
    "mongodb+srv://<username>:<password>@cluster0.vfkemtz.mongodb.net/<database>?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to blog"))
  .catch((e) => console.log(e.message));

app.listen(PORT, () => console.log(`web app accessible at localhost:${PORT}`));
