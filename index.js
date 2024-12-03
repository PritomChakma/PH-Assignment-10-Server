const express = require("express")
const cors = require ("cors")
const app = express()
const port = process.env.PORT || 5000


// middleware 
app.use(cors())
app.use(express.json())


app.get("/", (req,res)=>{
    res.send("The surver iss running on way")
})
app.listen(port, ()=>{
    console.log(`the surver is running port on: ${port}`);
})