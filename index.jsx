
import ContractsPage from './client/ContractsPage';
import ContractTable from './client/ContractTable';

var DynamicRoutes = [{
  'name': 'ContractPage',
  'path': '/contracts',
  'component': ContractsPage,
  'requireAuth': true
}];

// var DynamicRoutes = [];

var SidebarElements = [{
  'primaryText': 'Contracts',
  'to': '/contracts',
  'href': '/contracts'
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  ContractsPage,
  ContractTable
};


