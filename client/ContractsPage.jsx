import { CardText, CardTitle } from 'material-ui/Card';
import { Tab, Tabs } from 'material-ui/Tabs';
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

export class ContractsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      tabIndex: Session.get('contractPageTabIndex'),
      contract: defaultContract,
      contractSearchFilter: '',
      currentContract: null
    };

    if (Session.get('contractFormData')) {
      data.contract = Session.get('contractFormData');
    }
    if (Session.get('contractSearchFilter')) {
      data.contractSearchFilter = Session.get('contractSearchFilter');
    }
    if (Session.get("selectedContract")) {
      data.currentContract = Session.get("selectedContract");
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("ContractsPage[data]", data);
    return data;
  }

  handleTabChange(index){
    Session.set('contractPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedContract', false);
    Session.set('contractUpsert', false);
  }

  render() {
    console.log('React.version: ' + React.version);
    return (
      <div id="contractsPage">
        <FullPageCanvas>
          <GlassCard height="auto">
            <CardTitle
              title="Contracts"
            />
            <CardText>
              <Tabs id='contractsPageTabs' default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
                 <Tab className="newContractTab" label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                   <ContractDetail id='newContract' />
                 </Tab>
                 <Tab className="contractListTab" label='Contracts' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                   <ContractTable showBarcodes={true} />
                 </Tab>
                 <Tab className="contractDetailTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                   <ContractDetail id='contractDetails' currentContract={this.data.currentContract} />
                 </Tab>
             </Tabs>


            </CardText>
          </GlassCard>
        </FullPageCanvas>
      </div>
    );
  }
}



ReactMixin(ContractsPage.prototype, ReactMeteorData);

export default ContractsPage;