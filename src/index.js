import app from './api/server';
import { db } from './config/keys';

const PORT = process.env.PORT || db.PORT;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
