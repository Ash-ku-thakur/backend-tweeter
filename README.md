npm init for initialize the backend

npm i bcryptjs, cookie-parser, dotenv, express, jsonwebtoken, mongoose

config folder created
database file created for setup mongodb connection

controllers folder created
userController file created for 
user Registeration , user Login , user Logout

models folder created 
userSchema And tweetschema setup 

routes folder created

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);

dotenv file setup


basic setup created in index.js file

# basic middleware setup
app.use(express.urlencoded({extended:true})) form data
app.use(express.json()) data come in json
app.use(cookieParser()) cookie setup

# basic server side router setup
app.use("/api/v1/user", userRoute)