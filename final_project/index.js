const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    const accessToken = req.session.accessToken;
    if (accessToken) {
        // Verify the access token
        jwt.verify(accessToken, 'your_secret_key', function(err, decoded) {
            if (err) {
                // Token verification failed
                res.status(401).json({ message: 'Unauthorized' });
            } else {
                // Token verification successful, proceed to the next middleware
                next();
            }
        });
    } else {
        // Access token not found in session, unauthorized
        res.status(401).json({ message: 'Unauthorized' });
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
