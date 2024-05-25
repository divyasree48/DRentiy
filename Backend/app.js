import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import nodemailer from 'nodemailer';
import Posting from './schemas/postings.js';
import User from './schemas/user.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: '', // You can use other email services as well
  auth: {
    user: '', // Your email address
    pass: '' // Your email password
  }
});

// Connect to MongoDB
mongoose.connect("") // paste mongo db link here
.then(()=>app.listen(5000))
.then(()=>console.log('connected'))
.catch((err)=>console.log(err))



app.post('/send-interest-email', async (req, res) => {
  const { sellerEmail, buyerEmail, sellerName, buyerName } = req.body;
  console.log(req.body);
  try {
    // Send email to the seller
    await transporter.sendMail({
      from: '', // Your email address
      to: sellerEmail,
      subject: 'New Interest Request',
      text: `Hello ${sellerName},\n\n${buyerName} is interested in your property listing. Please contact them at ${buyerEmail} for more information.\n\nBest regards,\nRentify`
    });

    // Send email to the buyer
    await transporter.sendMail({
      from: 'your-email@gmail.com', // Your email address
      to: buyerEmail,
      subject: 'Interest Request Sent',
      text: `Hello ${buyerName},\n\nThank you for expressing interest in the property listing. Your information has been sent to the seller, ${sellerName}. They will contact you shortly at ${buyerEmail}.\n\nBest regards,\nRentify`
    });

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});
app.post('/posting', (req, res) => {
  const newPosting = new Posting({
    place: req.body.place,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    price: req.body.price,
    description: req.body.description,
    link: req.body.link,
  });
  //newPosting.save().then(posting => res.status(200).json(posting)).catch(err => res.status(500).json(err));
  try{
    const posting = newPosting.save();
    res.status(200).json(posting);
  }
    catch(err){
        res.status(500).json(err);
    }
});

// Create a new seller
app.post('/signup', (req, res) => {
    const newUser = new User({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phonenumber: req.body.phoneNumber,
        usertype: req.body.userType,
    });
    newUser.save().then(user => res.status(200).json(user)).catch(err => res.status(500).json(err));
});

app.post('/login', (req, res) => {
    const emails = req.body.email;
    const passwords = req.body.password
    User.find({ email: emails, password: passwords }).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

// Get the postings array of a seller based on email
app.get('/ret/:email', (req, res) => {
    Posting.find({ sellerEmail: req.params.email }).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

app.post('/addposting', (req, res) => {
    const posts = req.body;
    // Find the seller based on email and add the posting to the postings array
    const postt = new Posting({
        place: posts.place,
        bedrooms: posts.bedrooms,
        bathrooms: posts.bathrooms,
        price: posts.price,
	      likes: posts.likes,
        description: posts.description,
        address: posts.address,
        sellerName: posts.sellerName,
        sellerEmail: posts.sellerEmail
    });
    postt.save().then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});
app.get('/getPost/:id', (req, res) => {
    Posting.findById(req.params.id).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});
app.post('/editPost/:id', (req, res) => {
    Posting.findByIdAndUpdate(req.params.id, req.body).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
}
);
app.delete('/deletePost/:id', (req, res) => {
    Posting.findByIdAndDelete(req.params.id).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
}); 
app.get('/allPost', (req, res) => {
    Posting.find().then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});
app.get('/getSeller/:email', (req, res) => {
    User.find({ email: req.params.email }).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});
app.put('/toggleLike/:id', async (req, res) => {
    try {
      const postingId = req.params.id;
      const email = req.body.email;
  
      // Find the posting by id
      const posting = await Posting.findById(postingId);
  
      if (!posting) {
        return res.status(404).json({ message: 'Posting not found' });
      }
  
      // Check if the email is already in the likes array
      const isLiked = posting.likes.includes(email);
  
      if (isLiked) {
        // Remove the email from the likes array
        posting.likes = posting.likes.filter((like) => like !== email);
      } else {
        // Add the email to the likes array
        posting.likes.push(email);
      }
  
      // Save the updated posting
      posting.save().then((updatedPosting) => res.status(200).json(posting)).catch((error) => res.status(500).json(error));
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });