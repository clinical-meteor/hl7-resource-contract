import { CardActions, CardText } from 'material-ui/Card';
import { get, has, set } from 'lodash';
// import { insertContract, removeContractById, updateContract } from '/imports/ui/workflows/contracts/methods';
// import { insertContract, removeContractById, updateContract } from 'meteor/clinical:hl7-resource-contract';
import { insertContract, removeContractById, updateContract } from 'meteor/clinical:hl7-resource-contract';


import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';

import { Contracts } from '../../lib/Contracts';
import { Session } from 'meteor/session';


let defaultContract = {
  "resourceType" : "Contract",
  "name" : [{
    "text" : "",
    "resourceType" : "HumanName"
  }],
  "active" : true,
  "gender" : "",
  "birthDate" : '',
  "photo" : [{
    url: ""
  }],
  identifier: [{
    "use": "usual",
    "type": {
      "coding": [
        {
          "system": "http://hl7.org/fhir/v2/0203",
          "code": "MR"
        }
      ]
    },
    "value": ""
  }],
  "test" : false
};


Session.setDefault('contractUpsert', false);
Session.setDefault('selectedContract', false);

export default class ContractDetail extends React.Component {
  getMeteorData() {
    let data = {
      contractId: false,
      contract: defaultContract
    };

    if (Session.get('contractUpsert')) {
      data.contract = Session.get('contractUpsert');
    } else {
      if (Session.get('selectedContract')) {
        data.contractId = Session.get('selectedContract');
        console.log("selectedContract", Session.get('selectedContract'));

        let selectedContract = Contracts.findOne({_id: Session.get('selectedContract')});
        console.log("selectedContract", selectedContract);

        if (selectedContract) {
          data.contract = selectedContract;

          if (typeof selectedContract.birthDate === "object") {
            data.contract.birthDate = moment(selectedContract.birthDate).add(1, 'day').format("YYYY-MM-DD");
          }
        }
      } else {
        data.contract = defaultContract;
      }
    }

    if(process.env.NODE_ENV === "test") console.log("ContractDetail[data]", data);
    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="contractDetail">
        <CardText>
          <TextField
            id='nameInput'
            ref='name'
            name='name'
            floatingLabelText='name'
            value={ get(this, 'data.contract.name[0].text', '')}
            onChange={ this.changeState.bind(this, 'name')}
            fullWidth
            /><br/>
          <TextField
            id='genderInput'
            ref='gender'
            name='gender'
            floatingLabelText='gender'
            hintText='male | female | other | indeterminate | unknown'
            value={ get(this, 'data.contract.gender', '')}
            onChange={ this.changeState.bind(this, 'gender')}
            fullWidth
            /><br/>
          <TextField
            id='birthdateInput'
            ref='birthdate'
            name='birthdate'
            floatingLabelText='birthdate'
            hintText='YYYY-MM-DD'
            value={ get(this, 'data.contract.birthDate', '')}
            onChange={ this.changeState.bind(this, 'birthDate')}
            fullWidth
            /><br/>
          <TextField
            id='photoInput'
            ref='photo'
            name='photo'
            floatingLabelText='photo'
            value={ get(this, 'data.contract.photo[0].url', '')}
            onChange={ this.changeState.bind(this, 'photo')}
            floatingLabelFixed={false}
            fullWidth
            /><br/>
          <TextField
            id='mrnInput'
            ref='mrn'
            name='mrn'
            floatingLabelText='medical record number'
            value={ get(this, 'data.contract.identifier[0].value', '')}
            onChange={ this.changeState.bind(this, 'mrn')}
            fullWidth
            /><br/>
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.contractId) }
        </CardActions>
      </div>
    );
  }
  determineButtons(contractId){
    if (contractId) {
      return (
        <div>
          <RaisedButton id='saveContractButton' className='saveContractButton' label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}} />
          <RaisedButton label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id='saveContractButton'  className='saveContractButton' label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }

  changeState(field, event, value){
    let contractUpdate;

    if(process.env.TRACE) console.log("contractDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new contract
    if (Session.get('contractUpsert')) {
      contractUpdate = Session.get('contractUpsert');
    } else {
      contractUpdate = defaultContract;
    }



    // if there's an existing contract, use them
    if (Session.get('selectedContract')) {
      contractUpdate = this.data.contract;
    }

    switch (field) {
      case "name":
        contractUpdate.name[0].text = value;
        break;
      case "gender":
        contractUpdate.gender = value.toLowerCase();
        break;
      case "birthDate":
        contractUpdate.birthDate = value;
        break;
      case "photo":
        contractUpdate.photo[0].url = value;
        break;
      case "mrn":
        contractUpdate.identifier[0].value = value;
        break;
      default:

    }
    // contractUpdate[field] = value;
    process.env.TRACE && console.log("contractUpdate", contractUpdate);

    Session.set('contractUpsert', contractUpdate);
  }


  // this could be a mixin
  handleSaveButton(){
    if(process.env.NODE_ENV === "test") console.log('handleSaveButton()');
    let contractUpdate = Session.get('contractUpsert', contractUpdate);


    if (contractUpdate.birthDate) {
      contractUpdate.birthDate = new Date(contractUpdate.birthDate);
    }
    if(process.env.NODE_ENV === "test") console.log("contractUpdate", contractUpdate);

    if (Session.get('selectedContract')) {
      if(process.env.NODE_ENV === "test") console.log("Updating contract...");

      delete contractUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      contractUpdate.resourceType = 'Contract';

      Contracts.update({_id: Session.get('selectedContract')}, {$set: contractUpdate }, function(error, result){
        if (error) {
          if(process.env.NODE_ENV === "test") console.log("Contracts.insert[error]", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Contracts", recordId: Session.get('selectedContract')});
          // Session.set('contractUpdate', defaultContract);
          Session.set('contractUpsert', false);
          Session.set('selectedContract', false);
          Session.set('contractPageTabIndex', 1);
          Bert.alert('Contract added!', 'success');
        }
      });
    } else {
      if(process.env.NODE_ENV === "test") console.log("Creating a new contract...", contractUpdate);

      Contracts.insert(contractUpdate, function(error, result) {
        if (error) {
          if(process.env.NODE_ENV === "test")  console.log('Contracts.insert[error]', error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Contracts", recordId: result});
          Session.set('contractPageTabIndex', 1);
          Session.set('selectedContract', false);
          Session.set('contractUpsert', false);
          Bert.alert('Contract added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('contractPageTabIndex', 1);
  }

  handleDeleteButton(){
    Contracts.remove({_id: Session.get('selectedContract')}, function(error, result){
      if (error) {
        if(process.env.NODE_ENV === "test") console.log('Contracts.insert[error]', error);
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Contracts", recordId: Session.get('selectedContract')});
        // Session.set('contractUpdate', defaultContract);
        Session.set('contractUpsert', false);
        Session.set('contractPageTabIndex', 1);
        Session.set('selectedContract', false);
        Bert.alert('Contract removed!', 'success');
      }
    });
  }
}


ReactMixin(ContractDetail.prototype, ReactMeteorData);
