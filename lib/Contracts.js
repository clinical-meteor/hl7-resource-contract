import { BaseModel } from 'meteor/clinical:base-model';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseSchema, DomainResourceSchema } from 'meteor/clinical:hl7-resource-datatypes';


// create the object using our BaseModel
Contract = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Contract.prototype._collection = Contracts;


// Create a persistent data store for addresses to be stored.
// HL7.Resources.Contracts = new Mongo.Collection('HL7.Resources.Contracts');
Contracts = new Mongo.Collection('Contracts');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Contracts._transform = function (document) {
  return new Contract(document);
};



ContractSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
  "resourceType" : {
    type: String,
    defaultValue: "Contract"
  },
  "identifier" : {
    optional: true,
    type: IdentifierSchema
  }, 
  "status" : {
    optional: true,
    type: Code
  }, 
  "issued" : {
    optional: true,
    type: Date
  }, 
  "applies" : {
    optional: true,
    type: PeriodSchema 
  }, 
  "subject" : {
    optional: true,
    type: [ ReferenceSchema ]
  }, 
  "topic" : {
    optional: true,
    type: [ ReferenceSchema ]
  }, 
  "authority" : {
    optional: true,
    type: [ ReferenceSchema ]
  }, 
  "domain" : {
    optional: true,
    type: [ ReferenceSchema ]
  }, 
  "type" : {
    optional: true,
    type: CodeableConceptSchema 
  }, 
  "subType" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  }, 
  "action" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  }, 
  "actionReason" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  }, 
  "decisionType" : {
    optional: true,
    type: CodeableConceptSchema 
  }, 
  "contentDerivative" : {
    optional: true,
    type: CodeableConceptSchema 
  }, 
  "securityLabel" : {
    optional: true,
    type: [ CodingSchema ]
  }, 
  "agent.$.actor" : {
    optional: true,
    type: ReferenceSchema 
  }, 
  "agent.$.role" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  },
  "signer.$.type" : {
    optional: true,
    type: CodingSchema 
  }, 
  "signer.$.party" : {
    optional: true,
    type: ReferenceSchema 
  }, 
  "signer.$.signature" : {
    optional: true,
    type: [ SignatureSchema ]
  },
  "valuedItem.$.entityCodeableConcept" : {
    optional: true,
    type: CodeableConceptSchema 
  },
  "valuedItem.$.entityReference" : {
    optional: true,
    type: ReferenceSchema 
  },
  "valuedItem.$.identifier" : {
    optional: true,
    type: IdentifierSchema 
  }, 
  "valuedItem.$.effectiveTime" : {
    optional: true,
    type: Date
  }, 
  "valuedItem.$.quantity" : {
    optional: true,
    type: QuantitySchema 
  }, 
  "valuedItem.$.unitPrice" : {
    optional: true,
    type: QuantitySchema 
  }, 
  "valuedItem.$.factor" : {
    optional: true,
    type: Number,
    decimal: true
  }, 
  "valuedItem.$.points" : {
    optional: true,
    type: Number,
    decimal: true
  },
  "valuedItem.$.net" : {
    optional: true,
    type: QuantitySchema 
  },
  "term.$.identifier" : {
    optional: true,
    type: IdentifierSchema 
  }, 
  "term.$.issued" : {
    optional: true,
    type: Date
  }, 
  "term.$.applies" : {
    optional: true,
    type: PeriodSchema 
  }, 
  "term.$.type" : {
    optional: true,
    type: CodeableConceptSchema 
  }, 
  "term.$.subType" : {
    optional: true,
    type: CodeableConceptSchema 
  }, 
  "term.$.topic" : {
    optional: true,
    type: [ ReferenceSchema ]
  }, 
  "term.$.action" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  }, 
  "term.$.actionReason" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  }, 
  "term.$.securityLabel" : {
    optional: true,
    type: [ CodingSchema ]
  }, 
  "term.$.agent.$.actor" : {
    optional: true,
    type: ReferenceSchema 
  }, 
  "term.$.agent.$.role" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  },
  "term.$.text" : {
    optional: true,
    type: String
  }, 
  "term.$.valuedItem.$.entityCodeableConcept" : {
    optional: true,
    type: CodeableConceptSchema 
  },
  "term.$.valuedItem.$.entityReference" : {
    optional: true,
    type: ReferenceSchema 
  },
  "term.$.valuedItem.$.identifier" : {
    optional: true,
    type: IdentifierSchema 
  }, 
  "term.$.valuedItem.$.effectiveTime" : {
    optional: true,
    type: Date
  }, 
  "term.$.valuedItem.$.quantity" : {
    optional: true,
    type: QuantitySchema 
  }, 
  "term.$.valuedItem.$.unitPrice" : {
    optional: true,
    type: QuantitySchema 
  }, 
  "term.$.valuedItem.$.factor" : {
    optional: true,
    type: Number,
    decimal: true
  }, 
  "term.$.valuedItem.$.points" : {
    optional: true,
    type: Number,
    decimal: true
  }, 
  "term.$.valuedItem.$.net" : {
    optional: true,
    type: QuantitySchema 
  },
  "term.$.group" : {
    optional: true,
    type: [ Object ]
  },
  "bindingAttachment" : {
    optional: true,
    type: AttachmentSchema 
  },
  "bindingReference" : {
    optional: true,
    type: ReferenceSchema 
  },
  "friendly.$.contentAttachment" : {
    optional: true,
    type: AttachmentSchema 
  },
  "friendly.$.contentReference" : {
    optional: true,
    type: ReferenceSchema 
  },
  "legal.$.contentAttachment" : {
    optional: true,
    type: AttachmentSchema 
  },
  "legal.$.contentReference" : {
    optional: true,
    type: ReferenceSchema 
  },
  "rule.$.contentAttachment" : {
    optional: true,
    type: AttachmentSchema 
  },
  "rule.$.contentReference" : {
    optional: true,
    type: ReferenceSchema 
  }
}]);
Contracts.attachSchema(ContractSchema);


Contract.prototype.toFhir = function(){
  console.log('Contract.toFhir()');



  return EJSON.stringify(this.name);
}


Contracts.fetchBundle = function (query, parameters, callback) {
  process.env.TRACE && console.log("Contracts.fetchBundle()");  
  var patientArray = Contracts.find(query, parameters, callback).map(function(patient){
    patient.id = patient._id;
    delete patient._document;
    return patient;
  });

  

  var result = Bundle.generate(patientArray);

  // console.log("result", result.entry[0]);

  return result;
};


/**
 * @summary This function takes a FHIR resource and prepares it for storage in Mongo.
 * @memberOf Contracts
 * @name toMongo
 * @version 1.6.0
 * @returns { Contract }
 * @example
 * ```js
 *  let patients = Contracts.toMongo('12345').fetch();
 * ```
 */

Contracts.toMongo = function (originalContract) {
  var mongoRecord;
  process.env.TRACE && console.log("Contracts.toMongo()");  

  if (originalContract.identifier) {
    originalContract.identifier.forEach(function(identifier){
      if (identifier.period) {
        if (identifier.period.start) {
          var startArray = identifier.period.start.split('-');
          identifier.period.start = new Date(startArray[0], startArray[1] - 1, startArray[2]);
        }
        if (identifier.period.end) {
          var endArray = identifier.period.end.split('-');
          identifier.period.end = new Date(startArray[0], startArray[1] - 1, startArray[2]);
        }
      }
    });
  }

  return originalContract;
};



/**
 * @summary This function takes a DTSU2 resource and returns it as STU3.  i.e. it converts from v1.0.2 to v3.0.0
 * @name toMongo
 * @version 3.0.0
 * @returns { Contract }
 * @example
 * ```js
 * ```
 */
Contracts.toStu3 = function(patientJson){
  if(patientJson){

    // quick cast from string to boolean
    if(typeof patientJson.birthDate === "string"){
      patientJson.birthDate = new Date(patientJson.birthDate);
    }

    // quick cast from string to boolean
    if(patientJson.deceasedBoolean){
      patientJson.deceasedBoolean = (patientJson.deceasedBoolean == "true") ? true : false;
    }

    // STU3 only has a single entry for family name; not an array
    if(patientJson.name && patientJson.name[0] && patientJson.name[0].family && patientJson.name[0].family[0] ){
      patientJson.name[0].family = patientJson.name[0].family[0];      
    }

    // make sure the full name is filled out
    if(patientJson.name && patientJson.name[0] && patientJson.name[0].family && !patientJson.name[0].text ){
      patientJson.name[0].text = patientJson.name[0].given[0] + ' ' + patientJson.name[0].family;      
    }
  }
  return patientJson;
}


/**
 * @summary Similar to toMongo(), this function prepares a FHIR record for storage in the Mongo database.  The difference being, that this assumes there is already an existing record.
 * @memberOf Contracts
 * @name prepForUpdate
 * @version 1.6.0
 * @returns { Object }
 * @example
 * ```js
 *  let patients = Contracts.findMrn('12345').fetch();
 * ```
 */

Contracts.prepForUpdate = function (patient) {
  process.env.TRACE && console.log("Contracts.prepForUpdate()");  

  if (patient.name && patient.name[0]) {
    //console.log("patient.name", patient.name);

    patient.name.forEach(function(name){
      name.resourceType = "HumanName";
    });
  }

  if (patient.telecom && patient.telecom[0]) {
    //console.log("patient.telecom", patient.telecom);
    patient.telecom.forEach(function(telecom){
      telecom.resourceType = "ContactPoint";
    });
  }

  if (patient.address && patient.address[0]) {
    //console.log("patient.address", patient.address);
    patient.address.forEach(function(address){
      address.resourceType = "Address";
    });
  }

  if (patient.contact && patient.contact[0]) {
    //console.log("patient.contact", patient.contact);

    patient.contact.forEach(function(contact){
      if (contact.name) {
        contact.name.resourceType = "HumanName";
      }

      if (contact.telecom && contact.telecom[0]) {
        contact.telecom.forEach(function(telecom){
          telecom.resourceType = "ContactPoint";
        });
      }

    });
  }

  return patient;
};


/**
 * @summary Scrubbing the patient; make sure it conforms to v1.6.0
 * @memberOf Contracts
 * @name scrub
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 *  let patients = Contracts.findMrn('12345').fetch();
 * ```
 */

Contracts.prepForFhirTransfer = function (patient) {
  process.env.TRACE && console.log("Contracts.prepForFhirTransfer()");  


  // FHIR has complicated and unusual rules about dates in order
  // to support situations where a family member might report on a patient's
  // date of birth, but not know the year of birth; and the other way around
  if (patient.birthDate) {
    patient.birthDate = moment(patient.birthDate).format("YYYY-MM-DD");
  }


  if (patient.name && patient.name[0]) {
    //console.log("patient.name", patient.name);

    patient.name.forEach(function(name){
      delete name.resourceType;
    });
  }

  if (patient.telecom && patient.telecom[0]) {
    //console.log("patient.telecom", patient.telecom);
    patient.telecom.forEach(function(telecom){
      delete telecom.resourceType;
    });
  }

  if (patient.address && patient.address[0]) {
    //console.log("patient.address", patient.address);
    patient.address.forEach(function(address){
      delete address.resourceType;
    });
  }

  if (patient.contact && patient.contact[0]) {
    //console.log("patient.contact", patient.contact);

    patient.contact.forEach(function(contact){

      console.log("contact", contact);


      if (contact.name && contact.name.resourceType) {
        //console.log("patient.contact.name", contact.name);
        delete contact.name.resourceType;
      }

      if (contact.telecom && contact.telecom[0]) {
        contact.telecom.forEach(function(telecom){
          delete telecom.resourceType;
        });
      }

    });
  }

  //console.log("Contracts.prepForBundle()", patient);

  return patient;
};

export { Contract, Contracts, ContractSchema };
