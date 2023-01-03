import express from 'express';
import cors from 'cors';
import * as model from './model.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = 3611;

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiInstructions());
});

app.post('/login', (req: express.Request, res: express.Response) => {
	const password = req.body.password;
	if (password === process.env.ADMIN_PASSWORD) {
		res.send('ok');
	} else {
		res.status(401).send();
	}
});

app.listen(port, () => {
	console.log(`listening on port http://localhost:${port}`);
});