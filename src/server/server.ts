import * as express from 'express';
import * as cors from 'cors';
import * as passport from 'passport';
import routes from './routes';
import './middleware/bearerstrategy';
import './middleware/localstrategy';

const app = express();

app.use(cors());
app.use(passport.initialize()); // must be initialized above the routes // this prepares our express application to utilize passport as if it was an express middleware
app.use(express.static('public'));
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000; 
// if there is an environment variable named port privided for us, use that, otherwise default to 3000
// that way, we can use localhost 3000 on our computer, but if this server deploys to somewhere like herokku or aws, then you can be provided a port by that server
// they probably have port 3000 taken up by their own devtools
app.listen(port, () => console.log(`Server listening on port: ${port}`));
