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

# Authentication

first we get { token } = req.cookies;

then verify isVerifyTocken = await jwt.verify(token,process.env.TOKEN_SECRET),

after the verify call next()

# CreateTweet with auth

first we get { description, id } = req.body

and then await Tweet.create({
des,
userId:id
})

# in route

router.route("/create").post(isAuth ,CreateTweet);

# LikeOrDislike

let loggedInUserId = req.body.id; // user that one create that tweet
let tweetId = req.params.id; // tweet
let tweet = await Tweet.findById(tweetId);
if (tweet.lile.includes(loggedInUserId))  
 <check in array loggedInUserId>
return trur then pull the loggedInUserId in like array
otherwise push loggedInUserId in like array

# in route

router.route("/likeOrDislike/:id").put(isAuth ,LikeOrDislike);

# Bookmarks

as like as like or dislike api

# in router

router.route("/bookmark/:id").put(isAuth, Bookmarks);

# GetMyProfile

let id = req.params.id;
let user = await User.findById(id);

    return res.status(200).json({
      user,
    });

# in route

router.route("/profile/:id").get(isAuth, GetMyProfile);

# GetOtherUsers

    myId is not equal other id
    let otherUser = await User.find({ _id: { $ne: myId } }).select("-email, -password");

# in router

router.route("/otheruser/:id").get(isAuth, GetOtherUser);

# Follow or unFollow

    let loggedinUserId = req.body.id; // logged in user
    let likedPerson = req.params.id; // followed by user

    // find who follows and who to follows
    let loggedinUser = await User.findById(loggedinUserId);
    let likedUser = await User.findById(likedPerson);

# user cann't follow yourself

    if (loggedinUserId == likedPerson) {
      return res.status(401).json({
        massage: "You cann't follow yourself",
      });
    }

await User.findByIdAndUpdate(likedPerson, {
$push: { followers: loggedinUserId },
}).select("-password");
await User.findByIdAndUpdate(loggedinUserId, {
$push: { following: likedPerson },
}).select("-password");

      And wise versa for un follow only push change to pull

# in router

router.route("/follow/:id").put(isAuth, Follow);
