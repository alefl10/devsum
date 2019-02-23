import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import appMiddleware from './middleware/appMiddleware';
import { db } from '../config/keys';

const app = express();

appMiddleware(app);

// Static Folder
app.use(express.static(path.join(__dirname, '../..', 'public')));

// Connect to mongoose
mongoose.connect(db.mongoURI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log('Failed to connect to MongoDB\n', err));

// Index Route
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// // Use routes

export default app;
