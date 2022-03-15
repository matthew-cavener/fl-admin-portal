import { permitArrivals, permitLeaderAdmin } from 'permission-utils'

export const menuItems = [
  { name: 'Home', to: '/', roles: ['all'] },
  {
    name: 'Directory',
    exact: true,
    to: '/directory',
    subMenus: [
      { name: 'Members', to: '/directory/members' },
      { name: 'Churches', to: '/directory/churches' },
    ],
    roles: ['all'],
  },
  {
    name: 'Services',
    to: '/services/church-list',
    roles: permitLeaderAdmin('Fellowship'),
  },
  {
    name: 'Arrivals',
    to: '/arrivals',
    roles: [...permitLeaderAdmin('Bacenta'), ...permitArrivals('Bacenta')],
  },
  {
    name: 'Campaigns',
    to: '/campaigns/churchlist',
    roles: permitLeaderAdmin('Constituency'),
  },
  {
    name: 'Maps',
    to: '/maps',
    roles: ['adminGatheringService'],
  },
  {
    name: 'Reconciliation',
    to: '/recon',
    roles: ['adminGatheringService'],
  },
]
