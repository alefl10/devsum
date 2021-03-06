import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import { posts, profile, users } from './api/routes/zRoutes';
import appMiddleware from './api/middleware/appMiddleware';
import { dbURI } from './config/keys';

// Connect to mongoose
mongoose.connect(dbURI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log('Failed to connect to MongoDB\n', err));

const app = express();

appMiddleware(app);

// Use routes
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/users', users);

// Serve static assets if in producion
if (process.env.NODE_ENV === 'production') {
	// Static Folder
	// eslint-disable-next-line no-undef
	app.use(express.static(path.join(__dirname, '..', 'client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '..', 'client/build/index.html'));
	});
}

// Error handler
app.use((err, req, res, next) => {
	const status = err.status || 500;
	res.status(status).json(err.error);
});

export default app;
