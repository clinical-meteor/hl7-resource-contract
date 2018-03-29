import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import { HTTP } from 'meteor/http';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';

//import { Contracts } from '../../lib/Contracts';
import { Session } from 'meteor/session';
import { has, get } from 'lodash';
import { TableNoData } from 'meteor/clinical:glass-ui'

import FaFilePdfO from 'react-icons/lib/fa/file-pdf-o';

export class ContractTable extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        hideOnPhone: {
          visibility: 'visible',
          display: 'table'
        },
        cellHideOnPhone: {
          visibility: 'visible',
          display: 'table',
          paddingTop: '16px'
        },
        cell: {
          paddingTop: '16px'
        }
      },
      selected: [],
      contracts: []
    };

    let query = {};
    let options = {
      sort: { issued: -1 }
    };

    // number of items in the table should be set globally
    if (get(Meteor, 'settings.public.defaults.paginationLimit')) {
      options.limit = get(Meteor, 'settings.public.defaults.paginationLimit');
    }
    // but can be over-ridden by props being more explicit
    if(this.props.limit){
      options.limit = this.props.limit;  
    }

    // data.contracts = [];
    data.contracts = Contracts.find(query, options).map(function(document){
      let result = {
        _id: document._id,
        issued: moment(get(document, 'issued', null)).format("YYYY-MM-DD"),
        subjectReference: get(document, 'subject.0.display', '') ? get(document, 'subject.0.display', '') : get(document, 'subject.0.reference', '').split('/')[1].toUpperCase(),
        type: get(document, 'type.text', ''),
        agentCount: document.agent.length,
        agentDisplay: get(document, 'agent.0.actor.display', ''),
        // subType: get(document, 'subType.0.coding.0.code', ''),
        // display: get(document, 'subType.0.coding.0.display', ''),
        signature: get(document, 'signer.0.party.display', ''),
      };

      return result;
    });

    if (Session.get('appWidth') < 768) {
      data.style.hideOnPhone.visibility = 'hidden';
      data.style.hideOnPhone.display = 'none';
      data.style.cellHideOnPhone.visibility = 'hidden';
      data.style.cellHideOnPhone.display = 'none';
    } else {
      data.style.hideOnPhone.visibility = 'visible';
      data.style.hideOnPhone.display = 'table-cell';
      data.style.cellHideOnPhone.visibility = 'visible';
      data.style.cellHideOnPhone.display = 'table-cell';
    }

    return data;
  }
  rowClick(id){
    Session.set('contractsUpsert', false);
    Session.set('selectedContract', id);
    Session.set('contractPageTabIndex', 2);
  }

  render () {
    let tableRows = [];
    let footer;

    if(this.data.contracts.length === 0){
      footer = <TableNoData />
    } else {
      for (var i = 0; i < this.data.contracts.length; i++) {
        tableRows.push(
          <tr key={i} className="contractRow" style={{cursor: "pointer"}}>

            <td className='issued' onClick={ this.rowClick.bind('this', this.data.contracts[i]._id)} style={{minWidth: '100px', paddingTop: '16px'}}>{this.data.contracts[i].issued }</td>
            <td className='subjectReference' onClick={ this.rowClick.bind('this', this.data.contracts[i]._id)} style={this.data.style.cell}>{this.data.contracts[i].subjectReference }</td>
            <td className='type' style={this.data.style.cell}>{this.data.contracts[i].type}</td>
            {/* <td className='subtype' style={this.data.style.cellHideOnPhone}>{this.data.contracts[i].subType}</td>
            <td className='display' style={this.data.style.cellHideOnPhone}>{this.data.contracts[i].display}</td> */}
            <td className='agentCount' style={this.data.style.cellHideOnPhone}>{this.data.contracts[i].agentCount}</td> 
            <td className='agentDisplay' style={this.data.style.cellHideOnPhone}>{this.data.contracts[i].agentDisplay}</td> 
            <td className='signature' style={this.data.style.cellHideOnPhone}>{this.data.contracts[i].signature}</td>
            <td className='file' >
            <FaFilePdfO style={this.data.style.cellHideOnPhone} style={{fontSize: '120%'}} />
            </td>
          </tr>
        );
      }
    }

    return(
      <div>
        <Table id='contractsTable' hover >
          <thead>
            <tr>

              <th className='issued' style={{minWidth: '100px'}}>issued</th>
              <th className='subjectReference' style={this.data.style.cellHideOnPhone}>subject</th>
              <th className='type'>type</th>
              {/* <th className='subtype'>subtype</th>
              <th className='display'>display</th> */}
              <th className='agentCount' style={this.data.style.cellHideOnPhone}># agents</th>
              <th className='agentDisplay' style={this.data.style.cellHideOnPhone}>agent</th>
              <th className='signature' style={this.data.style.cellHideOnPhone} >signature</th>
              <th className='file' style={this.data.style.cellHideOnPhone} >file</th>

            </tr>
          </thead>
          <tbody>
            { tableRows }
          </tbody>
        </Table>
        { footer }
      </div>
    );
  }
}


ReactMixin(ContractTable.prototype, ReactMeteorData);
export default ContractTable;