import { CardText, CardTitle, TextField, Tab, Tabs } from 'material-ui';
import { GlassCard, Glass, VerticalCanvas, FullPageCanvas } from 'meteor/clinical:glass-ui';

import ContractDetail from './ContractDetail';
import ContractTable from './ContractTable';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

import { Session } from 'meteor/session';

let defaultContract = {
  index: 2,
  id: '',
  username: '',
  email: '',
  given: '',
  family: '',
  gender: ''
};
Session.setDefault('contractFormData', defaultContract);
Session.setDefault('contractSearchFilter', '');
Session.setDefault('powerOfAttorneyState', 'Illinois');

export class PowerOfAttorneyPreview extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      contract: defaultContract,
      currentContract: null,
      powerOfAttorneyState: Session.get('powerOfAttorneyState')
    };


    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("PowerOfAttorneyPreview[data]", data);
    return data;
  }



  render() {
    console.log('React.version: ' + React.version);


    var countyRecorder;
    if(this.data.powerOfAttorneyState === "North Carolina"){
      countyRecorder = <TextField
        id='countyRecorder'
        type='text'
        errorStyle={{color: 'gray'}}
        errorText="County Recorder"        
        style={{width: '500px'}}    
        />
    }

    return (
      <div id="contractsPage">
        <VerticalCanvas>
          <GlassCard height="auto" width='768'>
            <CardTitle
              title="Power of Attorney"
            />
            <CardText style={{padding: '60px'}}>
                
                <p>THIS Power of Attorney is given by me, <b>Jessica Argonaut</b> (the "Principal"), in the State of Illinois, on this 9th day of May, 2018.</p>
                <br/>

                <h4>Previous Power of Attorney</h4>
                <p>I REVOKE any previous power of attorney granted by me.</p>
                <br/>
                
                <h4>Attorney-in-fact</h4>
                <p>I APPOINT <b>Aaron Advocate</b> to act as my Attorney-in-fact.</p> 
                <br/>
                
                <h4>Governing Law</h4>
                <p>This document will be governed by the laws of the <b>{this.data.powerOfAttorneyState}</b>.  Further, my Attorney-in-fact is drected to act in accordance with the laws of the {this.data.powerOfAttorneyState} at any time they may be acting on my behalf.</p>
                <br/>
                
                <h4>Liability of Attorney-in-fact</h4>
                <p>My Attoryney-in-fact will not be liable to me, my estate, my heirs, successors or assigns for any action taken or not taken under this document, except for willful misconfuct or gross negligence.</p>
                <br/>

                <h4>Effective Date</h4>
                <p>This Power of Attorney will start immediately and will cease to be in effect upon a finding of my mental incapcity or mental infirmity which may occur after my execution of this Power of Attorney.</p>
                <br/>
                
                <h4>Powers of Attorney in Fact</h4>
                <p>My Attorney-in-fact has authority to do anything on my behalf that I may lawfully do by an attorney-in-fact (the "General Power").</p>

                <br />
                <TextField
                  id='Signatory'
                  type='text'
                  errorStyle={{color: 'gray'}}
                  errorText="Signatory"    
                  style={{width: '500px'}}    
                  /><br/>

                <br />
                <TextField
                  id='witness1'
                  type='text'
                  errorStyle={{color: 'gray'}}
                  errorText="Witness 1"        
                  style={{width: '500px'}}    
                  /><br/>


                <br />
                <TextField
                  id='witness2'
                  type='text'
                  errorStyle={{color: 'gray'}}
                  errorText="Witness 2"        
                  style={{width: '500px'}}    
                  /><br/>

                <br />
                { countyRecorder }
                <br/>

            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}



ReactMixin(PowerOfAttorneyPreview.prototype, ReactMeteorData);

export default PowerOfAttorneyPreview;