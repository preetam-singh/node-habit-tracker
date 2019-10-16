require("dotenv").config();

var express       = require("express"),
    cors          = require("cors"),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    expressJwt    = require("express-jwt"), 
    Habit         = require("./models/habit.model"),
    User          = require("./models/user.model"),
    habitRoutes   = require("./routes/habit.routes"),
    authRoutes    = require("./routes/auth.routes"),
    app           = express(),
    router        = express.Router()


var databaseUrl = process.env.DATABASE_URL;
mongoose.connect(databaseUrl , {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); 


//--------------- PASSPORT CONFIGURATION -------------------

app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));

//------------------------

app.use(habitRoutes);
app.use(authRoutes);

var port = process.env.PORT || 4010;                        
app.listen( port, () => {                                             //During development undo these comments and comment the export statement
    console.log("Express server is running on port " + port);
});


// module.exports = app;