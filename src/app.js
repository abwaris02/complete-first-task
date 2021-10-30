const express = require('express');
const app = express()
require("./db/mongoose")
const Book = require("./models/books.js")

const port = process.env.PORT || 3000

app.use(express.json())


    //  CREAT  BOOKS
app.post('/books', async (req, res) => {
    const book = new Book({
        name : req.body.name,
        author: req.body.author,
        numberOfPages: req.body.numberOfPages,
        publish : req.body.publish
        
    })
    try{
      const saveBook = await book.save()
      res.json(saveBook)
    }catch(err){
       res.json({message: err})
       console.log(err)
    }
});
  

  //  GET BOOKS
app.get('/books', async(req, res) => {
     try{
       const books = await Book.find()
       res.json(books)
     }catch(err){
         res.json(err)
     }
})


//     GET BOOKS BY THEIR ID
app.get('/books/:id', async(req, res) => {
    const _id = req.params.id

    try{
      const books = await Book.findById({ _id })
      if(!books){
          return res.status(404).json()
      }
      res.json(books)
    }catch(err){
        res.json(err)
    }
});

     

      // UPDATE BOOKS BY THEIR ID
app.patch('/books/:id', async (req, res) => {
   const updates = Object.keys(req.body)
   const allowedUpdates = ["numberOfPages", "publish"]
   const isValidateOperation = updates.every((update) => allowedUpdates.includes(update))
   
    if(!isValidateOperation){
      return  res.status(404).json({error : "Invalid Updates"})
    }
    try{
      const books = await Book.findByIdAndUpdate(req.params.id, req.body, {
          new : true,
          isValidators : true
      })
      if(!books){
         return res.status(404).json()
      }
      res.json(books)
    }catch(err){
        res.status(400).json(err)
    }
});



//      DELETE BOOKS BY THEIR ID
app.delete('/books/:id', async (req, res) => {
  try{
      const books = await Book.findByIdAndDelete(req.params.id)
      if(!books){
        res.status(404).json({err : "given id could not match with database try another"})
      }
      res.json(books)
  }catch(err){
     res.status(400).json(err)
  }
});




app.listen(port, () => {
    console.log(`Port listning up on port ${port}`)
})