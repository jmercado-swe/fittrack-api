const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();

const app = require('../app');
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const Workout = require('../models/Workout');
const ProgressLog = require('../models/ProgressLog');

// Seeded document ids, created before the tests run so the "get by id"
// tests have something real to look up, and removed again afterward so
// the test run doesn't leave junk data behind in the database.
let userId;
let exerciseId;
let workoutId;
let progressLogId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.create({
        name: 'Test User',
        email: `test.user.${Date.now()}@example.com`,
        age: 30,
        weightKg: 75,
        heightCm: 180,
        fitnessGoal: 'General Fitness',
        activityLevel: 'Moderate',
        joinDate: '2026-01-01',
    });
    userId = user._id;

    const exercise = await Exercise.create({
        name: 'Test Squat',
        category: 'Strength',
        muscleGroup: 'Legs',
        equipment: 'Barbell',
        difficulty: 'Intermediate',
        caloriesPerMinute: 8,
        description: 'A test exercise.',
        instructions: 'Test instructions.',
    });
    exerciseId = exercise._id;

    const workout = await Workout.create({
        userId,
        exerciseId,
        date: '2026-01-02',
        durationMinutes: 30,
        sets: 3,
        reps: 10,
        caloriesBurned: 200,
        notes: 'Test workout',
    });
    workoutId = workout._id;

    const progressLog = await ProgressLog.create({
        userId,
        date: '2026-01-02',
        weightKg: 75,
        bodyFatPercentage: 18,
        notes: 'Test log',
    });
    progressLogId = progressLog._id;
});

afterAll(async () => {
    await User.findByIdAndDelete(userId);
    await Exercise.findByIdAndDelete(exerciseId);
    await Workout.findByIdAndDelete(workoutId);
    await ProgressLog.findByIdAndDelete(progressLogId);
    await mongoose.connection.close();
});

describe('Users GET routes', () => {
    test('GET /user/ returns 200 and an array', async () => {
        const res = await request(app).get('/user/');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /user/:id returns 200 and the correct user', async () => {
        const res = await request(app).get(`/user/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(userId.toString());
    });
});

describe('Exercises GET routes', () => {
    test('GET /exercise/ returns 200 and an array', async () => {
        const res = await request(app).get('/exercise/');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /exercise/:id returns 200 and the correct exercise', async () => {
        const res = await request(app).get(`/exercise/${exerciseId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(exerciseId.toString());
    });
});

describe('Workouts GET routes', () => {
    test('GET /workout/ returns 200 and an array', async () => {
        const res = await request(app).get('/workout/');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /workout/:id returns 200 and the correct workout', async () => {
        const res = await request(app).get(`/workout/${workoutId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(workoutId.toString());
    });
});

describe('ProgressLogs GET routes', () => {
    test('GET /progresslog/ returns 200 and an array', async () => {
        const res = await request(app).get('/progresslog/');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /progresslog/:id returns 200 and the correct progress log', async () => {
        const res = await request(app).get(`/progresslog/${progressLogId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(progressLogId.toString());
    });
});
