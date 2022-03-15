import { gql } from '@apollo/client'

export const CONSTIUENCY_ARRIVALS_DASHBOARD = gql`
  query ($id: ID) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      admin {
        id
        firstName
        lastName
      }
      arrivalsAdmin {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      bacentasNoActivityCount
      bacentasMobilisingCount
      bacentasOnTheWayCount
      bacentasHaveBeenCountedCount
      bacentasHaveArrivedCount
    }
  }
`

export const COUNCIL_ARRIVALS_DASHBOARD = gql`
  query ($id: ID) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      admin {
        id
        firstName
        lastName
      }
      arrivalsAdmin {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      bacentaCount
    }
  }
`

export const STREAM_ARRIVALS_DASHBOARD = gql`
  query ($id: ID) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      admin {
        id
        firstName
        lastName
      }
      arrivalsAdmin {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      bacentaCount
    }
  }
`

export const CONSTITUENCY_BUSSING_DATA = gql`
  query ($id: ID) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentas {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 4) {
          id
          week
          attendance
          bussingPictures
        }
      }
    }
  }
`

export const BACENTA_ARRIVALS = gql`
  query ($id: ID) {
    bacentas(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      arrivalsCodeOfTheDay
      bussing(limit: 1) {
        id
        serviceDate {
          date
        }
        week
        mobilisationPicture
        bussingPictures
      }
    }
  }
`

export const CONSTITUENCY_LEADER_ARRIVALS = gql`
  query ($id: ID) {
    members(where: { id: $id }, options: { limit: 1 }) {
      id
      firstName
      lastName
      fullName
      leadsConstituency {
        id
        name
      }
      isAdminForConstituency {
        id
        name
      }
    }
  }
`

export const COUNCIL_LEADER_ARRIVALS = gql`
  query ($id: ID) {
    members(where: { id: $id }, options: { limit: 1 }) {
      id
      firstName
      lastName
      fullName
      leadsCouncil {
        id
        name
      }
      isAdminForCouncil {
        id
        name
      }
    }
  }
`

export const STREAM_LEADER_ARRIVALS = gql`
  query ($id: ID) {
    members(where: { id: $id }, options: { limit: 1 }) {
      id
      firstName
      lastName
      fullName
      leadsStream {
        id
        name
      }
      isAdminForStream {
        id
        name
      }
    }
  }
`

export const GATHERINGSERVICE_LEADER_ARRIVALS = gql`
  query ($id: ID) {
    members(where: { id: $id }, options: { limit: 1 }) {
      id
      firstName
      lastName
      fullName
      leadsGatheringService {
        id
        name
      }
      isAdminForGatheringService {
        id
        name
      }
    }
  }
`

export const DISPLAY_BUSSING_RECORDS = gql`
  query DisplayBussingRecords($bussingRecordId: ID!, $bacentaId: ID!) {
    bussingRecords(where: { id: $bussingRecordId }) {
      id
      created_at
      created_by {
        id
        firstName
        lastName
        fullName
      }
      confirmed_by {
        id
        firstName
        lastName
        fullName
      }
      serviceDate {
        date
      }
      week
      mobilisationPicture
      attendance
      bussingPictures
      bussingCost
      bussingTopUp
      offeringRaised
      numberOfBusses
      numberOfCars
      comments
      arrivalTime
    }
    bacentas(where: { id: $bacentaId }) {
      id
      name
      zone {
        number
        bussingTopUp
      }
    }
  }
`
