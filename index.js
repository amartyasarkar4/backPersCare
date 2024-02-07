const express=require("express");
const http=require('http');

const app=express();
const port=process.env.PORT||5000;
const server=http.createServer(app);

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

var mongoose=require("mongoose");


const username = "amartyasarkar4";
const password = "";
// const cluster = "cluster0.egyqx";
const cluster="cluster0.s4tcl7b";
const dbname = "";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

require('./Schemas/UserSchema');
require("./Schemas/behaveSchema");
require("./Schemas/todoSchema");

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hello amartya");
})
const customMiddleweres=(req,res,next)=>{
    console.log("Middlewere executed ....");
    next();
}

app.use(customMiddleweres);
app.use(require("./routes/auth"));
app.use(require("./routes/bahavior"));
app.use(require("./routes/todoCrud"));



// For Listening on process.env.PORT or 5000
server.listen(port,()=>{
    console.log(`Listening to requests on http://localhost:${port}`)
})
