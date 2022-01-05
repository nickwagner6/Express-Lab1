import express, { Express } from "express";
import ShoppingCart from "../models/shoppingCart";

// create a new Router object
const cart = express.Router();

const array: ShoppingCart[] = [
  {
    id: 1,
    product: "dorthy",
    price: 50,
    quantity: 2,
  },
  {
    id: 2,
    product: "bear",
    price: 75,
    quantity: 2,
  },
  {
    id: 3,
    product: "tiger",
    price: 300,
    quantity: 70,
  },
  {
    id: 4,
    product: "lion",
    price: 1,
    quantity: 35,
  },
];

//http://localhost:3000/cart-items?maxPrice=50 will return 2 objects from my array that are <= 50
cart.get("/", (req, res) => {
  let maxPrice = parseInt(req.query.maxPrice as string);
  let prefix = req.query.prefix as string;
  let pageSize = parseInt(req.query.pageSize as string);
  if (maxPrice) {
    let filterPrice: ShoppingCart[] = array.filter(
      (item) => item.price <= maxPrice
    );
    res.json(filterPrice);

    //
    // http://localhost:3000/cart-items?prefix=t will serach my products that start with t
  } else if (prefix) {
    let filterProduct: ShoppingCart[] = array.filter((item) =>
      item.product.toLowerCase().startsWith(prefix.toLowerCase())
    );
    res.json(filterProduct);
    //
    //http://localhost:3000/cart-items?pageSize=2
  } else if (pageSize) {
    let filterPageSize: ShoppingCart[] = array.filter(
      (item, index) => index <= pageSize - 1
    );
    res.json(filterPageSize);
  } else {
    res.json(array);
  }
});

cart.get("/:id", (req, res) => {
  array.filter((item) => {
    if (item.id === parseInt(req.params.id)) {
      res.json(item);
      res.status(200);
    } else {
      res.status(404);
      res.send("ID Not Found");
    }
  });
});
//ASK
let nextID: number = 5;
cart.post("/", (req, res) => {
  let newItem: ShoppingCart = req.body;
  newItem.id = nextID;
  nextID++;
  array.push(newItem);
  res.status(201);
  res.json(array);
});

cart.put("/:id", (req, res) => {
  array.forEach((item) => {
    if (item.id === parseInt(req.params.id)) {
      item.price = 1000;
    }
  });
  res.status(200);
  res.json(array);
});

cart.delete("/:id", function (req, res) {
  let itemIndex: number = array.findIndex(
    (item) => item.id === parseInt(req.params.id)
  );
  array.splice(itemIndex, 1);
  res.status(204); //No content code
  res.json(array);
});

export default cart;
