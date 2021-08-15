const mongoose = require('mongoose')

const connectDb = async()=>{
    await mongoose.connect('mongodb+srv://aman:cs418@cluster0.pdx7u.mongodb.net/product?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true})
    console.log('mongodb connected')
}

// let schema = mongoose.schema();
// productSchema = new schema({
//     name:{type:String,}
// })
//mongodb+srv://aman:<password>@cluster0.pdx7u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority



module.exports = connectDb