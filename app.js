require('dotenv').config();
const express = require('express');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const passport = require('./config/passport');

const usersRoutes = require('./routes/users');
const exercisesRoutes = require('./routes/exercises');
const workoutsRoutes = require('./routes/workouts');
const progressLogsRoutes = require('./routes/progressLogs');
const authRoutes = require('./routes/auth');

const app = express();

// Render sits behind a proxy that terminates HTTPS - this tells Express to
// trust the "x-forwarded-proto" header so secure cookies work correctly.
app.set('trust proxy', 1);

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'fittrack-dev-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/user', usersRoutes);
app.use('/exercise', exercisesRoutes);
app.use('/workout', workoutsRoutes);
app.use('/progresslog', progressLogsRoutes);
app.use('/auth', authRoutes);

module.exports = app;
