
import ContractsPage from './client/ContractsPage';
import ContractTable from './client/ContractTable';
import ContractDetail from './client/ContractDetail';
import PowerOfAttorneyForm from './client/PowerOfAttorneyForm';
import PowerOfAttorneyPreview from './client/PowerOfAttorneyPreview';

var DynamicRoutes = [{
  'name': 'ContractPage',
  'path': '/contracts',
  'component': ContractsPage,
  'requireAuth': true
}, {
  'name': 'PowerOfAttorneyPage',
  'path': '/power-of-attorney-form',
  'component': PowerOfAttorneyForm
}, {
  'name': 'PowerOfAttorneyPreview',
  'path': '/power-of-attorney',
  'component': PowerOfAttorneyPreview
}];

var SidebarElements = [{
  'primaryText': 'Contracts',
  'to': '/contracts',
  'href': '/contracts'
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  ContractsPage,
  ContractTable,

  PowerOfAttorneyPreview,
  PowerOfAttorneyPage
};


