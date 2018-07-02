##  clinical:hl7-resource-contract   

#### Licensing  

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)


#### Integration & Verification Tests  

[![CircleCI](https://circleci.com/gh/clinical-meteor/hl7-resource-contract/tree/master.svg?style=svg)](https://circleci.com/gh/clinical-meteor/hl7-resource-contract/tree/master)


#### API Reference  

The resource in this package implements the `FHIR 1.6.0 - STU3 Ballot` version of the Contract resource schema, specified at  [http://hl7.org/fhir/2016Sep/contract.html](http://hl7.org/fhir/2016Sep/contract.html).  


--------------------------------------------  
#### Installation  

```bash
meteor add clinical:hl7-resource-contract
```

You may also wish to install the `autopublish` package, which will set up a default publication/subscription of the Contracts collection for logged in users.  You will need to remove the package before going into production, however.

```bash
meteor add clinical:autopublish  
```


--------------------------------------------  
#### Example    

```js
var newContract = {

};
Contracts.insert(newContract);
```

--------------------------------------------  
#### Extending the Schema  

If you have extra fields that you would like to attach to the schema, extend the schema like so:  

```js
ExtendedContractSchema = new SimpleSchema([
  ContractSchema,
  {
    "createdAt": {
      "type": Date,
      "optional": true
    }
  }
]);
Contracts.attachSchema( ExtendedContractSchema );
```

--------------------------------------------  
#### Initialize a Sample Contract  

Call the `initializeContract` method to create a sample contract in the Contracts collection.

```js
Meteor.startup(function(){
  Meteor.call('initializeContract');
})
```
--------------------------------------------  
#### Server Methods  

This package supports `createContract`, `initializeContract`, and `dropContract` methods.

--------------------------------------------  
#### REST API Points    

This package supports the following REST API endpoints.  All endpoints require an OAuth token.  

```
GET    /fhir-1.6.0/Contract/:id    
GET    /fhir-1.6.0/Contract/:id/_history  
PUT    /fhir-1.6.0/Contract/:id  
GET    /fhir-1.6.0/Contract  
POST   /fhir-1.6.0/Contract/:param  
POST   /fhir-1.6.0/Contract  
DELETE /fhir-1.6.0/Contract/:id
```

If you would like to test the REST API without the OAuth infrastructure, launch the app with the `NOAUTH` environment variable, or set `Meteor.settings.private.disableOauth` to true in you settings file.

```bash
NOAUTH=true meteor
```

--------------------------------------------  
#### Conformance Statement  

This package conforms to version `FHIR 1.6.0 - STU3 Ballot`, as per the Touchstone testing utility.  

![https://raw.githubusercontent.com/clinical-meteor/hl7-resource-contract/master/screenshots/Screen%20Shot%202017-03-18%20at%2010.56.09%20PM.png](https://raw.githubusercontent.com/clinical-meteor/hl7-resource-contract/master/screenshots/Screen%20Shot%202017-03-18%20at%2010.56.09%20PM.png)  


#### Acknowledgements     

Many thanks to UPenn Medical and the FhirBlocks Project for their generous support in sponsoring this package.   