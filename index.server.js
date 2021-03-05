const express = require('express');

const env = require('dotenv');
env.config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-Parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose
    .connect('mongodb+srv://amrfirstlearning:977amrfirstlearning977.@cluster0.qulux.mongodb.ne' +
    't/prsnldb?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    .then(() => {
        console.log('database connected');
    });
    const userRegistration = require('./routes/userRoute'); 

    app.use('/',userRegistration);


app.get('/',(req,res) => {
    res.send('hello world')
})
app.listen(process.env.PORT,()=>{
    console.log(`server is listening on port ${process.env.PORT}`);
})
