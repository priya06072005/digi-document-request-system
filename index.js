const express=require("express");
const mongoose=require("mongoose");
const Registeruser=require('./model');
const app=express();
const jwt=require("jsonwebtoken");
const middleware=require('./middleware');
const multer=require('multer');
const fs=require('fs');
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const Admin = require("./AdminModel");
const bcrypt=require("bcrypt");
const cors = require('cors');
const path=require("path");
const formidable=require("formidable");

app.use(cors({ origin: "*", credentials: true })); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


dotenv.config();
const router = express.Router();



mongoose.connect(MONGO_URI).then(
    ()=>console.log("DB Connected")
).catch(
    (err) => console.error("MongoDB Connection Error:", err)
);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // Load from .env file
      pass: process.env.EMAIL_PASS,
    },
  });
  
  app.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;
  
    try {
      const info = await transporter.sendMail({
        from: `"Admin" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
      });
  
      console.log(`✅ Email sent: ${info.messageId}`);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (err) {
      console.error(`❌ Error: ${err.message}`);
      res.status(500).json({ message: "Failed to send email", error: err.message });
    }
  });

const storagePath = "./images";
if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true });
}

// Multer Storage Engine
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storagePath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const upload = multer({ storage: fileStorageEngine });

app.use("/images", express.static("images"));

app.use("/approve-image", express.static(path.join(__dirname, "approved")));

// Get all image files
app.get("/images", (req, res) => {
    fs.readdir("./images", (err, files) => {
        if (err) {
            console.error("Error reading images folder:", err);
            return res.status(500).json({ error: "Failed to read images" });
        }
        res.json(files);
    });
});

// Single image upload
app.post("/single", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("File upload failed. No file received.");
    }
    console.log("File Uploaded:", req.file);
    res.send({ message: "Single file uploaded successfully!" });
});
// ✅ Fix: Add `express.urlencoded({ extended: true })`
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Admin Registration Route

app.post("/adminregister", async (req, res) => {
    try {
      console.log("Received Data:", req.body); // Debugging step
  
      const { username, email, password, confirmpassword } = req.body;
  
      if (!username || !email || !password || !confirmpassword) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      if (password !== confirmpassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new Admin({ username, email, password: hashedPassword });
      await newUser.save();
      
      res.status(201).json("User registered successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json("Internal Server Error");
    }
  });
  // Fetch all users
  app.get("/admin/users", async (req, res) => {
    try {
        const users = await Registeruser.find(); // Fetch all users
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


  
app.post('/register',async(req,res)=>{
    try{
        const {username,email,password,confirmpassword}=req.body;
        let exist=await Registeruser.findOne({email:email})
        if(exist){
            return res.status(400).send('Usr Already exist');
        }
        if(password!=confirmpassword){
            return res.status(400).send('Passwords are not matching');

        }
        let newUser=new Registeruser({
            username,
            email,
            password,
            confirmpassword
        })
        await newUser.save();
        res.status(200).send('Register successfully')

    }catch(err){
        console.log(err);
        return res.status(500).send("Internal server error");
    }
})

// app.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         let user = await Registeruser.findOne({ email });
        
//         if (!user) {
//             return res.status(400).send('User Not Found');
//         }
        
//         if (user.password !== password) {
//             return res.status(400).send('Invalid Credentials');
//         }

//         let payload = {
//             user: {
//                 id: user.id,
//                 username: user.username,
//                 email: user.email
//             }
//         };

//         jwt.sign(payload, 'jwtSecret', { expiresIn: 3600000 }, (err, token) => {
//             if (err) throw err;
//             return res.json({ token, user }); // Send user data along with token
//         });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).send('Server Error');
//     }
// });

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await Registeruser.findOne({ email });

        if (!user) {
            return res.status(400).send('User Not Found');
        }

        if (user.password !== password) {
            return res.status(400).send('Invalid Credentials');
        }

        // Send login notification email
        await transporter.sendMail({
            from: `"Admin" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Login Notification",
            text: `Hello ${user.username},\n\nYou have successfully logged in to your account.\n\nLogin Time: ${new Date().toLocaleString()}`,
        });

        let payload = {
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        };

        jwt.sign(payload, 'jwtSecret', { expiresIn: 3600000 }, (err, token) => {
            if (err) throw err;
            return res.json({ token, user });
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).send('Server Error');
    }
});



app.put('/update-profile', middleware, async (req, res) => {
    try {
        const { username, email } = req.body;
        let user = await Registeruser.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.username = username || user.username;
        user.email = email || user.email;

        await user.save();
        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error" });
    }
});


app.post("/adminlogin", async (req, res) => {
    try {
        const { email, password } = req.body;
        let admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ error: "Admin Not Found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        let payload = {
            user: {
                id: admin.id
            }
        };

        jwt.sign(payload, "jwtSecret", { expiresIn: 3600000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json("Server Error");
    }
});


app.get('/myprofile', middleware, async (req, res) => {
    try {
        let user = await Registeruser.findById(req.user.id);
        if (!user) {
            return res.status(400).send("User not found");
        }
        res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server error');
    }
});

app.post("/admin/users", async (req, res) => {
    try {
        console.log(req.body); // Log request data

        const { username, email, password, confirmPassword } = req.body;

        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await Registeruser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Registeruser({ username, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: "User added successfully", user: newUser });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});

// Delete a user
app.delete("/admin/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Registeruser.findByIdAndDelete(id); // ✅ Fix: Use Registeruser
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

const fetchUsers = async () => {
    try {
        const response = await axios.get("http://localhost:5000/admin/users");
        console.log("Users Response:", response.data); // Log the response
        setUsers(response.data);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

app.post("/approve-image", async (req, res) => {
    const { filename } = req.body;

    try {
        const oldPath = path.join(__dirname, "images", filename);
        const newPath = path.join(__dirname, "approved", filename);

        // Ensure the "approved" directory exists
        if (!fs.existsSync(path.join(__dirname, "approved"))) {
            fs.mkdirSync(path.join(__dirname, "approved"), { recursive: true });
        }

        // Move the file
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error("Error moving file:", err);
                return res.status(500).json({ error: "Error approving image" });
            }
            res.json({ message: "Image moved to Approved Files!" });
        });
    } catch (error) {
        console.error("Error approving image:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/approved-images", async (req, res) => {
    try {
        const files = fs.readdirSync("approved");
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: "Error fetching approved images" });
    }
});

const User = require("./contactModel"); 


app.post("/create-user", (req, res) => {
    const form = new formidable.IncomingForm({ keepExtensions: true });
  
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("❌ Error parsing form:", err);
        return res.status(400).json({ error: "Form parsing error" });
      }
  
      const { name, email, mno } = fields;
      const photo = files.photo;
  
      // Validation
      if (!name || !email || !mno || !photo || !photo.filepath) {
        return res.status(400).json({ error: "All fields (including photo) are required" });
      }
  
      try {
        // ✅ Read the image from the valid path
        const photoData = fs.readFileSync(photo.filepath);
  
        const newUser = new User({
          name,
          email,
          mno,
          photo: {
            data: photoData,
            contentType: photo.mimetype,
          },
        });
  
        await newUser.save();
        return res.status(200).json({ message: "✅ User saved successfully", newUser });
      } catch (error) {
        console.error("❌ Error saving to DB:", error);
        return res.status(500).json({ error: "Error saving user to database" });
      }
    });
  });
  


app.listen(5000,()=>{
    console.log("server is running...");
})