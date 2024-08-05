import express, {Request, Response} from 'express';
const cors = require('cors');
import {client, connectDB} from "./db";
import {getNeighborhoods} from "./controllers/neighbohoodController";

const app = express()
const port = 3000

app.use(express.json());
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connect to DB
connectDB();


app.get('/', (req: Request, res: Response) => {
    res.send('Server is running')
})

app.get('/neighborhoods', getNeighborhoods);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// When the app is closed, close the connection to the DB
process.on('SIGINT', async () => {
    await client.close();
    console.log('Disconnected from MongoDB');
    process.exit(0);
});