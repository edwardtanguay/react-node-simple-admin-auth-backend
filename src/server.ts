import express from 'express';
import cors from 'cors';
import * as model from './model.js';

const app = express();
app.use(cors());
app.use(express.json());
const port = 3611;

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiInstructions());
});

app.post('/login', (req: express.Request, res: express.Response) => {
	const password = req.body.password;
	console.log(password)
	res.json('ok');
});

app.listen(port, () => {
	console.log(`listening on port http://localhost:${port}`);
});