const mongoose = require('mongoose') 

if(process.argv.length < 3){
  console.log('give password as the argument')
  process.exit(1)
}

const password = process.argv[2] // this application assumes that the password will be the third arg. ie node mongo.js <password>

const url = `mongodb+srv://briankimeli95_db_user:${password}@cluster0.nettauf.mongodb.net/noteApp?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4}) // the second arg is because MongoAtlas supports IPV4 addr. so with the object we specify that the connection should be IPV4.

const noteSchema = new mongoose.Schema({
  content: String, 
  important: Boolean,
}) 

// The name of the collection will be in plural lowercase, because Mongoose convention is to do so when the Schema refers to them in Singular ie. Note
// If you name your model Person it will automatically convert to people in the collection_name.
const Note = mongoose.model('Note', noteSchema) // first parameter is the name of the model, then the schema which defined earlier.

/*const note = new Note({
  content:'HTTP GET is safe and idempotent',
  important: true,
})


note.save().then(result => {
  console.log('note saved')
  mongoose.connection.close()
})

*/ 

Note.find({}).then(result => {
  result.forEach(note =>{
    console.log(note)
  })
  mongoose.connection.close()
})
