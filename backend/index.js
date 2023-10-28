import { configDotenv } from "dotenv"
configDotenv()

const password = process.env['MONGO_PASSWORD']
const username = process.env['MONGO_USERNAME']


import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient
const uri = `mongodb+srv://${username}:${password}@cluster0.sppdtdh.mongodb.net/?retryWrites=true&w=majority`

const port = 8000

MongoClient.connect(
	uri,
	{
		maxPoolSize: 50,
		wTimeoutMS: 2500,
		useNewUrlParser: true
	}
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	await ReviewsDAO.injectDB(client)
	app.listen(port, () => {
		console.log(`i can hear the ${port}`)
	})
})						