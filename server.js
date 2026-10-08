const app = require('./app');
const { connectToDatabase } = require('./db/connection');

const port = process.env.PORT || 8080;

connectToDatabase()
    .then(() => {
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    });
