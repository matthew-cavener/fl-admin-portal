import { gql } from '@apollo/client'

export const BISH_DASHBOARD_COUNTS = gql`
  query bishDashboardData($id: ID) {
    members(where: { id: $id }) {
      id
      firstName
      lastName
      pictureUrl
      admin {
        id
        firstName
        lastName
        bacenta {
          id
          centre {
            id
            town {
              id
              name
              bishop {
                id
              }
            }
            campus {
              name
              bishop {
                id
              }
            }
          }
        }
      }
    }
    bishopMemberCount(id: $id)
    bishopPastorCount(id: $id)
    bishopCampusTownCount(id: $id)
    bishopCentreCount(id: $id)
    bishopBacentaCount(id: $id)
    bishopSontaMemberCount(id: $id)
  }
`
export const MAKE_BISHOP_ADMIN = gql`
  mutation MakeBishopAdmin($bishopId: ID!, $newAdminId: ID!, $oldAdminId: ID!) {
    RemoveBishopAdmin(bishopId: $bishopId, adminId: $oldAdminId) {
      id
      firstName
      lastName
    }
    MakeBishopAdmin(bishopId: $bishopId, adminId: $newAdminId) {
      id
      firstName
      lastName
      isAdminForCouncil {
        id
        admin {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const BACENTA_LEADER_DASHBOARD = gql`
  query bacentaLeaderDashboard($bacentaId: ID!) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      serviceLogs {
        id
        historyRecord
        serviceRecords {
          created_at
          attendance
          income
          serviceDate {
            date
          }
        }
      }
    }
    bacentaMemberCount(id: $bacentaId)
  }
`

export const SERVANTS_DASHBOARD = gql`
  query servantsDashboard($id: ID!) {
    members(where: { id: $id }) {
      id
      firstName
      lastName
      fullName
      pictureUrl
      leadsBacenta {
        id
        name
        stream
        memberCount

        services {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }
      }
      leadsCentre {
        id
        name
        stream
        memberCount

        services {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        bacentaServiceAggregate {
          week
          attendance
          income
        }
      }
    }
  }
`

export const SERVANTS_LEADERSHIP = gql`
  query servantIsLeader($id: ID!) {
    members(where: { id: $id }) {
      id
      firstName
      lastName
      fullName
      pictureUrl

      # The person leads in the Bacenta side

      leadsTown {
        id
        name
        stream
        memberCount
        leader {
          id
          firstName
          lastName
          fullName
        }
        services {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
        }
      }
      leadsCampus {
        id
        name
        stream
        memberCount
        leader {
          id
          firstName
          lastName
          fullName
        }
        services {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
        }
      }
      leadsSonta {
        id
        name
        stream
      }
      leadsMinistry {
        id
      }
    }
  }
`

export const SERVANTS_ADMIN = gql`
  query servantIsAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      # The person is an admin
      isAdminForTown {
        id
        name
        stream
        memberCount
        leader {
          id
          firstName
          lastName
          fullName
        }
        services {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
        }
      }
      isAdminForCampus {
        id
        name
        stream
        memberCount
        leader {
          id
          firstName
          lastName
          fullName
        }
        services {
          id
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
        }
      }
      isAdminForCouncil {
        id
        name
        stream
        memberCount
        leader {
          id
          firstName
          lastName
          fullName
        }
        services {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
        }
      }
    }
  }
`

export const SERVANT_CHURCHES_COUNT = gql`
  query churchesLed($id: ID!) {
    members(where: { id: $id }) {
      id
      memberCount
      basontaMembershipCount
      leadsBacentaCount
      leadsCentreCount
      leadsConstituencyCount
      leadsCouncilCount
    }
  }
`
