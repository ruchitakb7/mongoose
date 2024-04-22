const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose')

const errorController = require('./controllers/error');

/*const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');*/

const User = require('./models/user');
const Product = require('./models/product');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

 app.use((req, res, next) => {
    User.findById('6626d0c6a79f120d1c3016e6')
      .then(user => {
        req.user = user;
        next();
      })
     .catch(err => console.log(err));
 });

 app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);

mongoose
.connect('mongodb+srv://ruchitakb7:n65Ifd49gLMkt73N@cluster0.7iolqg4.mongodb.net/')
.then((res)=>{
  User.findOne().then(user=>{
    if(!user)
    {
      const user= new User({
        name:"ruchi",
        email:"rk123@gmail.com",
        cart:{
          items:[]
        }
      })
      user.save()
    }
  })
  app.listen(3000)
  console.log('connected')
})
.catch(e=>{
  console.log(e)
})

