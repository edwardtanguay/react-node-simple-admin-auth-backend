import session from 'express-session';
import express from 'express';
import cors from 'cors';
import * as model from './model.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// declare module 'express-session' {
// 	export interface SessionData {
// 		user: any;
// 	}
// }

declare module 'express-session' {
	export interface SessionData {
		user: { [key: string]: any };
	}
}

dotenv.config();

const app = express();
// app.use(cors());
app.use(cors({
	origin: 'http://localhost:5174',
	methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
	credentials: true
}));
app.use(cookieParser());
app.use(express.json());
const port = 3611;

// app.set('trust proxy', 1)

app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: 'aksdjflskdjf', // process.env.SESSION_SECRET,
		cookie: {
			httpOnly: true,
			// maxAge: 24*60*60*1000,
			sameSite: 'lax', // lax, none
			secure: false
		}
	})
);

app.all('/', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3611");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiInstructions());
});

app.post('/login', (req: express.Request, res: express.Response) => {
	const password = req.body.password;
	if (password === process.env.ADMIN_PASSWORD) {
		req.session.user = 'admin' as any;
		req.session.cookie.expires = new Date(Date.now() + 10000); // 10 seconds
		req.session.save();
		res.send('ok');
	} else {
		res.status(401).send({});
	}
});

app.post('/currentuser', (req: express.Request, res: express.Response) => {
	const { username } = req.body;
	if (req.session.user) {
		res.send(req.session.user);
	} else {
		res.status(403).send({});
	}
});


app.listen(port, () => {
	console.log(`listening on port http://localhost:${port}`);
});