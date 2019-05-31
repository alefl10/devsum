import app from './api/server';
import { PORT } from './config/keys';

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
