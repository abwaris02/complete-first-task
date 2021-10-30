const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/books-api', {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => {
    console.log('Connection succesfully connect with db')
}).catch((err) => {
    console.log(err)
})