import {
  createOrder,
  // getOneOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import express from "express";
import { authenticateUser, authorizeUser } from "../middlewares/auth.js";

 const orderRoutes = express.Router();

orderRoutes.post("/create", createOrder);
orderRoutes.get("/all", getAllOrders);
// orderRoutes.get("/:id", getOneOrder);
orderRoutes.put("/:id",   authenticateUser,
authorizeUser(["admin"]),updateOrder);
orderRoutes.delete("/:id", deleteOrder);
export  {orderRoutes}