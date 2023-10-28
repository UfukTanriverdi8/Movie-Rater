import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/reviews", reviews)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app




// get curl çalışıyor ama post curl çalışmıyor büyük ihtimalle syntax error //

// curl -X POST http://localhost:8000/api/v1/reviews/new -H "Content-Type: application/json" -d '{"movieId":489,"user":"localufuk","review":"nolur calıs"}'

// curl -X GET http://localhost:8000/api/v1/reviews/movie/46

// curl -X POST http://localhost:8000/api/v1/reviews/new -H "Content-Type: application/json" -d "{\"movieId\":489,\"user\":\"localufuk\",\"review\":\"nolur calıs\"}"
// çalışan post curl