const myExpress = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("./Modle/userModle");
const productrout = require("./productRoute/productRoute");
const fileRoute = require("./productRoute/fileRoute");
const session = require("express-session");
const MiddleWare = require("./MiddleWare/MiddleWare")

const app = myExpress();
app.use(myExpress.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", productrout);
app.use("/file", fileRoute);
app.use(
  session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: true,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
const mongodb = mongoose
  .connect("mongodb://localhost:27017/socialmedia", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.post("/signup", async (req, res) => {
  try {
    const userfind = await Users.findOne({ email: req.body.email });
    if (userfind) {
      return res.status(409).json({ error: "Email address already taken" });
    } else {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const saveData = await Users.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      data: saveData,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

const secretKey = "my_secret_key";

app.post("/login", async (req, res) => {
  try {
    const loginData = await Users.findOne({ email: req.body.email });
    const matchpassword = bcrypt.compareSync(
      req.body.password,
      loginData.password
    );
    if (matchpassword) {
      const token = jwt.sign({ user: loginData }, secretKey, {
        expiresIn: "1w",
      });
      return res.json({
        loginData,
        token,
        success: true,
      });
    } else {
      res.status(401).json({
        message: " user not found",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({  storage });

// app.post("/upload_data", upload.single("file"), auth, async (req, res) => {
//   console.log(req.body)
//   try {
//     const data = await Product.create({
//       name: req.body.name,
//       Image: req.body.file,
//       user: req.user._id,
//     });
//     if (data) {
//       res.status(201).json({
//         data: data,
//         success: true,
//       });
//     } else {
//       res.status(400);
//       throw new Error("Invalid user data");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get("/get_data", auth, async (req, res) => {
//   try {
//     const getdata = await Product.find({ user: req.user._id });
//     if (getdata) {
//       res.status(200).json({
//         data: getdata,
//       });
//     } else {
//       res.status(400);
//       throw new Error("Invalid product get_data");
//     }
//   } catch (error) {
//     console.log(error);
//     throw new Error("Invalid product get_data");
//   }
// });

// app.delete("/delete_data/:id", auth, async (req, res) => {
//   try {
//     const deleteItem = await Product.findByIdAndDelete(req.params.id);
//     if (deleteItem) {
//       res.status(200).json({
//         success: true,
//         message: "your product deleted",
//       });
//     } else {
//       res.status(400);
//       throw new Error("Invalid product data");
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400);
//   }
// });

// app.put("/edit_data/:id", async (req, res) => {
//  console.log(req.params.id)
//   try {
//     const updateData = await Product.findByIdAndUpdate(req.params.id);
//     if (updateData) {
//       res.status(200).json({
//         success: true,
//         data: updateData
//       })
//     } else {
//       res.status(400);
//       throw new Error("Invalid product data");
//     }
//   } catch (error) {
//     console.log(error);
//     throw new Error("Invalid product data");
//   }
// });

const port = 5000;
app.listen(process.env.PORT || port, () => {
  console.log("server is woking on port", port);
});
