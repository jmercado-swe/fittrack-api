require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const { connectToDatabase } = require('./db/connection');
const usersRoutes = require('./routes/users');
const exercisesRoutes = require('./routes/exercises');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/user', usersRoutes);
app.use('/exercise', exercisesRoutes);

connectToDatabase()
    .then(() => {
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    });
