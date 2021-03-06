const express = require('express');
const path = require('path');
const method = require('method-override');
const app = express();
const session = require('express-session');
const cookies = require('cookie-parser');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookies());

app.use(userLoggedMiddleware);


/* Servidor */
app.set("port", process.env.PORT || 3001);
app.listen(app.get("port"),()=>console.log("Server start http://localhost:"+app.get("port")))

/* Acceso Publico */
app.use(express.static(path.resolve(__dirname,"../public")));

/* View Engine */
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"./views"));

/* Data Configuration */

app.use(express.urlencoded({extended:false})) // Not fund req.body
app.use(method("_method")) // ?_method=PUT


/* Rutas */
const main = require('./routes/main');
app.use(main);

const category = require('./routes/category');
app.use("/category",category);

const rol = require('./routes/rol');
app.use("/rol",rol);

const brand = require('./routes/brand');
app.use("/brand",brand);

const color = require('./routes/color');
app.use("/color",color);

const user = require('./routes/user');
app.use("/user",user);

const product = require('./routes/product');
app.use("/product",product);


const api = require('./routes/api');
app.use("/api",api);