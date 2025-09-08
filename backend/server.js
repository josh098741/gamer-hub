require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const morgan = require("morgan");

const app = express();

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');
const matchRoutes = require('./routes/matchRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const teamRoutes = require('./routes/teamRoutes'); // Added missing team routes

const securityMiddleware = require("./middleware/security");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

// === Global Middleware ===
app.use(express.json());
app.use(morgan('combined')); // Added morgan middleware
securityMiddleware(app);

// ===API Routes ====
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/teams", teamRoutes); // Added team routes

// Root route for health check
app.get('/', (req, res) => {
    res.json({ message: 'Tournament API is running!' });
});

// ====Error handling ===
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

start();