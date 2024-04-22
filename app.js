const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose')

/*const errorController = require('./controllers/error');
const sequelize = require('./util/database');


const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');*/

//const User = require('./models/user');
const Product = require('./models/product');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   // User.findById(1)
//   //   .then(user => {
//   //     req.user = user;
//   //     next();
//   //   })
//   //   .catch(err => console.log(err));
//   next()
// });

 app.use('/admin', adminRoutes);
 app.use(shopRoutes);

//app.use(errorController.get404);

mongoose
.connect('mongodb+srv://ruchitakb7:n65Ifd49gLMkt73N@cluster0.7iolqg4.mongodb.net/')
.then((res)=>{

  app.listen(3000)
  console.log('connected')
})
.catch(e=>{
  console.log(e)
})

/*Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });*/

