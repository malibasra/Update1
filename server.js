const express=require('express');
const mysql=require('mysql');
const cors=require('cors');
const bodyparser=require('body-parser');
const multer=require('multer');
const path=require('path');
const fs = require('fs');
const app=express();


app.use(express.json());
app.use(cors());
app.use(express.static('public'));
const { TYPES } = require('tedious');
const { Connection, Request } = require('tedious');

// Configure connection settings
const config = {
    server: 'DESKTOP-P8H0KJB\\MSSQLSERVER01', // Update with your server name
    authentication: {
        type: 'default',
        options: {
            userName: 'Vcart', // Update with your username
            password: '12345', // Update with your password
        },
    },
    options: {
        encrypt: true, // If you're on Microsoft Azure, set this to true
        trustServerCertificate: true, 
        database: 'Vcart', // Update with your database name
    },
};

// Connect to the database
// Create a new connection
const connection = new Connection(config);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to SQL Server:', err.message);
  } else {
    console.log('Connected to SQL Server');
  }
});
//user login code
app.post('/login', (req, res) => {
  const { username, email, password } = req.body;
  const sql = "SELECT * FROM dbo.Tbl_User WHERE UserName = @username AND UserEmail = @email AND UserPassword = @password";

  const request = new Request(sql, (err, rowCount, rows) => {
    if (err) return res.json("Error");

    if (rowCount > 0) {
      if (username === "ADMIN" && email === "admin.123@gmail.com" && password === "admin_123") {
        return res.json("Admin Successfully");
      } else {
        return res.json("Login Successfully");
      }
    } else {
      return res.json("No Record");
    }
  });

  request.addParameter('username', TYPES.NVarChar, username);
  request.addParameter('email', TYPES.NVarChar, email);
  request.addParameter('password', TYPES.NVarChar, password);

  connection.execSql(request);
});

//user registration code
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/users")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "_" + Date.now() + ".jpg")
    }
  })
}).single("image");

app.post('/register', upload, (req, res) => {
  const image = req.file.filename;

  const { username, email, contact, address, age, password } = req.body;
  const request = new Request(
    'INSERT INTO dbo.Tbl_User(UserName,UserEmail,UserCell,UserAddress,UserAge,UserPic,UserPassword) VALUES(@username, @email, @contact, @address, @age, @image, @password)',
    (err, rowCount) => {
      if (err) {
        console.error('Error inserting data:', err.message);
        res.status(500).json({ message: 'Error inserting data' });
      } else {
        res.status(201).json({ message: 'Data inserted successfully' });
      }
    }
  );

  request.addParameter('username', TYPES.NVarChar, username);
  request.addParameter('email', TYPES.NVarChar, email);
  request.addParameter('contact', TYPES.NVarChar, contact);
  request.addParameter('address', TYPES.NVarChar, address);
  request.addParameter('age', TYPES.Int, age);
  request.addParameter('image', TYPES.NVarChar, image);
  request.addParameter('password', TYPES.NVarChar, password);

  connection.execSql(request);
});
//for showing the category to the main page
app.get('/category', (req, res) => {
  const sql = "SELECT CategoryPic, CategoryName FROM dbo.Tbl_Product_Category";
  const request = new Request(sql, (err, rowCount, rows) => {
    if (err) {
      console.log('Error fetching image from database ', err);
      return res.status(500).json({ error: 'Error fetching images' });
    }
    return res.json(data);
  });

  let data = [];

  // Handle row data
  request.on('row', (columns) => {
      let row = {};
      columns.forEach((column) => {
          row[column.metadata.colName] = column.value;
      });
      data.push(row);
  });
  
  connection.execSql(request);
});


//Veiw the product 

app.get('/product', (req, res) => {

  const sql = "SELECT ProductName, ProductPrice, ProductPic,ProductDescription, ProductCategoryFID FROM dbo.Tbl_Product";
  const request = new Request(sql, (err, rowCount, rows) => {
    if (err) {
      console.log('Error fetching image from database ', err);
      return res.status(500).json({ error: 'Error fetching images' });
    }
    return res.json(data);
  });

  let data = [];

  // Handle row data
  request.on('row', (columns) => {
      let row = {};
      columns.forEach((column) => {
          row[column.metadata.colName] = column.value;
      });
      data.push(row);
  });
  
  connection.execSql(request);
});
  /*const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'image'
  });
  con.connect((err)=>{
    if(err){
      console.log('Error connecting to Mysql ',err);
      return;
    }
    console.log('Connectect to Mysql database');
  });
  app.get('/main',(req,res)=>{
    const sql="SELECT * FROM picture";
    con.query(sql,(err,results)=>{
      if(err){
        console.log('Error fecting image from database ',err);
        return res.status(500).json({error:'Error fetching images '});
        //return res.json("error");
      }
      return res.json(results);
    });
  });

  //for upload images
  
  const storage=multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = 'public/images'; // Destination directory
      // Create the directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  })
  const upload=multer({
    storage:storage
  })
  app.post('/product',upload.single('image'),(req,res)=>{
    const image=req.file.filename;
    const {productname,price} = req.body;
    //console.log(img);
    //console.log(image);
    //console.log(productname);
    //console.log(price);
    const sql='INSERT INTO picture (Name,Price,Img) VALUES (?, ?, ?)';
    const values=[productname,price,image];
    con.query(sql, values, (err, results) => {
      if (err) return res.json({Message :"Error"});
      return res.json({Status:"Success"});
    });

  })

  //For update the product
  app.post('/updateproduct',upload.single('image'),(req,res)=>{
    const image=req.file.filename;
    const {productname,price,updatename}=req.body;
    const values=[productname,price,image,updatename]
    const sql="UPDATE picture SET Name = ?, Price=?, Img=? WHERE Name=?";
    con.query(sql,values,(err,results)=>{
      if(err) return res.json("Error");
      return res.json("Success");
    });
    
  })
*/


//const express = require('express');
//const app = express();

//user login code


// Start the server
app.listen(8081, () => {
    console.log("Listening...."); 
})