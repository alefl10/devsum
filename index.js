import app from './src/server';
import { PORT } from './src/config/keys';

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
