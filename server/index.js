import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";

dotenv.config();

const { PORT, NODE_ENV, MONGODB_URI } = process.env;

// Function to initialize database connection
dbConnection(MONGODB_URI);

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

// Routes
app.use("/api", routes);

// Error handling
app.use(routeNotFound);
app.use(errorHandler);

// Start server
app.listen(PORT || 8800, () =>
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT || 8800}`)
);
