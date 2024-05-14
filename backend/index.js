var express = require("express");
const session = require('express-session');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const nunjucks = require('nunjucks');

const app = express();

// Middleware setup
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Nunjucks
nunjucks.configure('public', {
    autoescape: true,
    express: app
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/DatabaseSWE');
var db = mongoose.connection;

db.on('error', (err) => console.log("Error in connection to Database: ", err));
db.once('open', () => console.log("Connected to Database"));

// Register route
app.post("/Register.html", (req, res) => {
    var Fname = req.body.Fname;
    var Lname = req.body.Lname;
    var id = req.body.id;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var building = req.body.building;
    var password = req.body.password;
    var Cpassword = req.body.Cpassword;

    var data = {
        "Fname": Fname,
        "Lname": Lname,
        "id": id,
        "email": email,
        "mobile": mobile,
        "building": building,
        "password": password,
        "Cpassword": Cpassword
    };
    
    if (password !== Cpassword) {
        return res.send(`
            <script>
                alert('Passwords do not match. Please try again.');
                window.location.href = '/Register.html'; 
            </script>
        `);
    }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            console.error("Error inserting record: ", err);
            return res.status(500).send('Error inserting record.');
        }
        console.log("Record Inserted successfully");
        return res.redirect('/MainSell.html');
    });
});

// Login route
app.post("/login.html", async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    try {
        const user = await db.collection('users').findOne({ email, password });
        if (user) {
            req.session.user = user;
            console.log("Login successful. User session data set:", req.session.user);
            return res.redirect('MainSell.html');
        } else {
            console.log("Invalid email or password.");
            return res.send(`
                <script>
                    alert('Invalid email or password. Please try again.');
                    window.location.href = '/login.html'; 
                </script>
            `);
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send('Error during login. Please try again later.');
    }
});

// Profile route
app.get("/Profile", async (req, res) => {
    if (!req.session.user) {
        console.log("No user in session, redirecting to login page.");
        return res.redirect('/login.html');
    }
    const email = req.session.user.email;
    console.log("Fetching profile for email:", email); // Debugging line
    try {
        const user = await db.collection('users').findOne({ email });
        if (user) {
            console.log("User data fetched:", user); // Debugging line
            return res.render('Profile.html', {
                fullName: `${user.Fname} ${user.Lname}`,
                email: user.email,
                phone: user.mobile,
                address: user.building
            });
        } else {
            console.log("User not found in the database.");
            return res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).send('Error fetching user profile. Please try again later.');
    }
});

app.get("/", (req, res) => {
    res.redirect("login.html")
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

console.log("Listening on port 3000");
