const express = require('express');
const app = express();
const path = require("node:path");
const crypto = require('crypto');

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date(),
        id: crypto.randomUUID()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date(),
        id: crypto.randomUUID()
    }
];

// setup css
app.use(express.static(path.join(__dirname, "public")));

app.disable("x-powered-by");

// setup middleware for being able to access requests
app.use(express.urlencoded({ extended: true }));

// setup ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// setup index route 
app.get("/", (req, res) => {
    res.render("index", { messages: messages });
});

// setup new messages routes
app.get("/new", (req, res) => {
    res.render("form", {});
});

app.post("/new", (req, res) => {
    messages.push({
        text: req.body.messageText,
        user: req.body.messageUser.split(" ").join(""),
        added: new Date(),
        id: crypto.randomUUID()
    });
    res.redirect("/");
});

// setup details routes
app.get("/detailMessages/:id", (req, res) => {
    const detailMessage = messages.find((x) =>  x.id == req.params.id);
        
    if (detailMessage ) {
        res.render("details", { detail: detailMessage });
    }
    else {
        res.status(404).send("Message not found");
    } 
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server Running at Port ' + PORT);
});