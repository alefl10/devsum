import app from './api/server';
import { PORT } from './config/keys';

app.on('listening', () => {
	console.log(`Server is already listening on port ${PORT}`);
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
