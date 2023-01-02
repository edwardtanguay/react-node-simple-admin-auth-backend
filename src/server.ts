import express from 'express';
import cors from 'cors';
import * as model from './model.js';

const app = express();
app.use(cors());
const port = 3611;

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiInstructions());
});

app.get('/test', (req: express.Request, res: express.Response) => {
	res.json(model.getTest());
});

app.listen(port, () => {
	console.log(`listening on port http://localhost:${port}`);
});