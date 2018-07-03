import { CardActions, CardText, SelectField, MenuItem, TextField, RaisedButton } from 'material-ui';
import { insertContract, removeContractById, updateContract } from 'meteor/clinical:hl7-resource-contract';

import { get, has, set } from 'lodash';

import { Bert } from 'meteor/clinical:alert';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

import { Contracts } from '../lib/Contracts';
import { Session } from 'meteor/session';

import { GlassCard, VerticalCanvas } from 'meteor/clinical:glass-ui'

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

export class PowerOfAttorneyForm extends React.Component {
  getMeteorData() {
    let data = {
      customWidth: {
        width: 150
      },
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

    if(process.env.NODE_ENV === "test") console.log("PowerOfAttorneyForm[data]", data);
    return data;
  }

  render() {
    return (
      <VerticalCanvas>
        <GlassCard>
        <div id={this.props.id} className="contractDetail">
        <CardText>
          <SelectField
            floatingLabelText="Type"
            value={1}
            fullWidth
          >
            <MenuItem value={1} primaryText="Power of Attorney" />
          </SelectField><br/>
          <TextField
            id='subjectInput'
            ref='subject'
            name='subject'
            floatingLabelText='Full Name of Subject (i.e. Patient)'
            hintText='Jason Argonaut'
            // value={ get(this, 'data.contract.name[0].text', '')}
            // onChange={ this.changeState.bind(this, 'name')}
            fullWidth
            /><br/>
          <TextField
            id='agentNameInput'
            ref='agentName'
            name='agentName'
            floatingLabelText='Full Name of Agent'
            hintText='agent name'
            // value={ get(this, 'data.contract.gender', '')}
            // onChange={ this.changeState.bind(this, 'gender')}
            fullWidth
            /><br/>
          <TextField
            id='issuedDateInput'
            ref='issuedDate'
            name='issuedDate'
            floatingLabelText='Issued Date'
            hintText='YYYY-MM-DD'
            // value={ get(this, 'data.contract.birthDate', '')}
            // onChange={ this.changeState.bind(this, 'birthDate')}
            fullWidth
            /><br/>       
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.contractId) }
        </CardActions>
      </div>
        </GlassCard>
      </VerticalCanvas>
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
        <div>
          <RaisedButton id='previewContractButton'  className='saveContractButton' label="Preview" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}} />
          <RaisedButton id='cancelContractButton'  className='saveContractButton' label="Cencel" primary={false} onClick={this.handleCancelButton.bind(this)} />
        </div>
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


ReactMixin(PowerOfAttorneyForm.prototype, ReactMeteorData);
export default PowerOfAttorneyForm;