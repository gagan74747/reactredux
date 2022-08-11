const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const Cart = require("./cart");
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: "true",
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-auth-token");
  res.header("Access-Control-Expose-Headers", "x-auth-token");
  next();
});
app.use(express.json());
app.post("/addToCart", async (req, res, next) => {
  try {
   
    const { productId, name, price } = req.body;
    if(!(productId && name && price))
    return res.status(401).json({message:'invalid input'})
    const acknowledged = await Cart.updateOne(
      { productId },
      { $inc: { totalPrice: price, count: 1 } }
    );
    if (acknowledged.matchedCount === 0) {
      const item = new Cart({
        name,
        price,
        productId,
        totalPrice: price,
        count: 1,
      });
      await item.save();
      res.status(200).json({ message: "item added" });
    } else {
      res.status(200).json({ message: "item added" });
    }
  } catch (err) {
    res.status(404).json({ message: "" + err });
  }
});
app.post("/removeFromCart", async (req, res, next) => {
  try {
    
    const { price, productId } = req.body;
      if (!(productId &&  price))
        return res.status(401).json({ message: "invalid input" });
    let item = await Cart.findOne({ productId });
    if (!item) return res.status(404).json({ message: "item not found" });
    if (item.count === 1) {
      await Cart.deleteOne({ productId });
      res.status(201).json({ message: "item removed" });
    } else {
      const acknowledged = await Cart.updateOne(
        { productId },
        { $inc: { totalPrice: -price, count: -1 } }
      );
      acknowledged.modifiedCount !== 0
        ? res.status(201).json({ message: "item removed" })
        : res.status(401).json({ message: "Internal error" });
    }
  } catch (err) {
    res.status(401).json({ message: "" + err });
  }
});
app.get('/totalItemsInBag',async(req,res,next)=>{
    try {
      const totalItemsInBag = await Cart.aggregate([
        {
          $group: {
            _id: null,
            totalItemsInCart: {
              $sum: "$count",
            },
          },
        },
        {
          $project: {
            totalItemsInBag: "$totalItemsInCart",
            _id: 0,
          },
        },
      ]);
      res.status(200).json({data:totalItemsInBag})
    } catch (err) {
        res.status(401).json({message:''+err})
    }
})
app.get("/getAllItems", async (req, res) => {
  try {
    const items = await Cart.find({});
    res.status(200).json({ data: items });
  } catch (err) {
    res.status(401).json({ message: "" + err });
  }
});


app.listen(5000, () => {
  console.log("listening on port 5000");
  mongoose.connect("mongodb://localhost/buzz", (err, data) => {
    if (err) console.log(err);
    else console.log("connected to MongoDb");
  });
});
