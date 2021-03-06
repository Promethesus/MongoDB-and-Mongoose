const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });



const { Schema } = mongoose;

const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});
let Person = mongoose.model('Person', personSchema);

var createAndSavePerson = function(done) {
  let jeremy = new Person({name:'Jeremy', age: 29, favoriteFoods: ['stake', 'ice cream']});

  jeremy.save(function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};



const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people){
    if (err) return console.log(err);
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person){
    if (err) return console.log(err)
    person.favoriteFoods.push(foodToAdd)
    person.save(function(err, data) {
      if (err) return console.log(err);
      done(null, data);
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName },{ age: ageToSet }, { new: true }, (err, data) => {
  if (err) {
    return console.log(err)
  }else { 
    console.log('sucessful update...')
  };
  done(null, data)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err,removedPerson) =>{
    if (err) {
      return console.log(err)
    }else {
      console.log("removed by ID")
    };
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove},(err, removed)=> {
    if (err) {
      return console.log(err)
    }else {
      console.log("removed many by name")
    };
    done(null, removed);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
