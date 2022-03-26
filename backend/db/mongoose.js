const mongoose = require('mongoose')

const MONGODB_URL= 'mongodb+srv://parth:user123@clusterhack.the56.mongodb.net/spruce?retryWrites=true&w=majority'



mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('DB Connected!')).catch(err => {
    console.log("DB Connection Error: ");
    });


// mongoose.connect(process.env.MONGODB_URL, {useUnifiedTopology: true,  useNewUrlParser: true })