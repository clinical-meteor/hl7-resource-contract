
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

convertBirthdateToValidDate = function(document){
  // we need to check if the birthdate is a valid string
  let newDate = moment(document.birthDate).toDate();

  // moment() is a champ for doing this, but will return an Invalid Date object
  // which we have to check for with this wacky function
  if ( Object.prototype.toString.call(newDate) === "[object Date]" ) {
    // it is a date
    if ( isNaN( newDate.getTime() ) ) {  // d.valueOf() could also work
      // date is not valid
      delete document.birthDate;
    }
    else {
      // date is valid
      document.birthDate = newDate;
    }
  }
  else {
    // not a date
    delete document.birthDate;
  }
  return document;
};

export const insertContract = new ValidatedMethod({
  name: 'contracts.insert',
  validate: new SimpleSchema({
    // 'name.$.text': { type: String },
    // 'identifier': { type: [ String ], optional: true },
    // 'gender': { type: String, optional: true },
    // 'active': { type: Boolean, optional: true },
    // 'birthDate': { type: String, optional: true },
    // 'photo.$.url': { type: String, optional: true }
  }).validator(),
  run(document) {

    console.log("insertContract", document);

    document = convertBirthdateToValidDate(document);
    console.log("convertBirthdateToValidDate", document);

    if (process.env.NODE_ENV === "test") {
      document.test = true;
    } else {
      document.test = false;
    }

    // now that's all done, we can insert the document
    return Contracts.insert(document);
  }
});

export const updateContract = new ValidatedMethod({
  name: 'contracts.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update': { type: Object, blackbox: true, optional: true}
  }).validator(),
  run({ _id, update }) {
    console.log("updateContract");
    console.log("_id", _id);
    console.log("update", update);

    update = convertBirthdateToValidDate(update);

    let contract = Contracts.findOne({_id: _id});

    delete contract._id;
    delete contract._document;
    delete contract._super_;
    delete contract._collection;

    console.log("update.name", update.name);
    update.name[0].resourceType = 'HumanName';



    contract.name = [];
    contract.name.push(update.name[0]);
    contract.gender = update.gender;
    contract.photo = [];

    if (update.birthDate) {
      contract.birthDate = update.birthDate;
    }
    if (update && update.photo && update.photo[0] && update.photo[0].url) {
      contract.photo.push({
        url: update.photo[0].url
      });
    }

    console.log("diffedContract", contract);
    return Contracts.update({_id: _id}, { $set: contract });
  }
});

export const removeContractById = new ValidatedMethod({
  name: 'contracts.removeById',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    console.log("Removing user " + _id);
    return Contracts.remove({_id: _id});
  }
});
