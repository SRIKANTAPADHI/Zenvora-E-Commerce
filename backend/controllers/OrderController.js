import Order from "../models/Order.js";
import Product from "../models/Product.js"

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      deliveryPrice,
      totalPrice,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "No items in order",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        message: "Shipping address is required",
      });
    }

    if (!shippingAddress.fullName) {
      return res.status(400).json({
        message: "Full name is required",
      });
    }

    // Check stock before creating order
    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.title}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.title} has only ${product.stock} item(s) left`,
        });
      }
    }

    // Create order
    const order = await Order.create({
      user: req.user.userId,

      items,

      shippingAddress,

      paymentMethod: paymentMethod || "COD",

      itemsPrice: Number(itemsPrice),

      deliveryPrice: Number(deliveryPrice || 0),

      totalPrice: Number(totalPrice),

      orderStatus: "Pending",

      isPaid: false,
    });

    // Reduce stock
    for (const item of items) {
      const product = await Product.findById(item.product);

      product.stock -= item.quantity;

      // Update stock status
      product.inStock = product.stock > 0;

      await product.save();
    }

    res.status(201).json({
      message: "Order created successfully",
      order,
    });

  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};
// GET MY ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.userId,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get orders",
      error: error.message,
    });
  }
};
// GET SINGLE ORDER
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product")
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // User can only see their own order
    if (
      order.user._id.toString() !== req.user.userId &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get order",
      error: error.message,
    });
  }
};
// GET ALL ORDERS - ADMIN
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get orders",
      error: error.message,
    });
  }
};
// UPDATE ORDER STATUS - ADMIN
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus = status;

    // Mark paid only when appropriate
    if (status === "Delivered" && order.paymentMethod === "COD") {
      order.isPaid = true;
      order.paidAt = new Date();
    }

    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
};