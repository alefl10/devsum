import express from 'express';
import mongoose from 'mongoose';
import { posts, profile, users } from './routes/zRoutes';
import appMiddleware from './middleware/appMiddleware';
import { dbURI } from '../config/keys';

const app = express();

appMiddleware(app);

// Static Folder
// app.use(express.static(path.join(__dirname, '../..', 'public')));

// Connect to mongoose
mongoose.connect(dbURI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log('Failed to connect to MongoDB\n', err));

// Use routes
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/users', users);

// Error handler

app.use((err, req, res, next) => {
	const status = err.status || 500;
	res.status(status).json(err.error);
});

export default app;
