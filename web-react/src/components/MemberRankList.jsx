import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { ChurchContext } from '../contexts/ChurchContext'
import { capitalise } from '../global-utils'

const MemberRankList = ({ member }) => {
  const { clickCard, determineStream } = useContext(ChurchContext)
  const history = useHistory()

  //To Display Ranks on the Member Card
  let rank = {
    bishop: [],
    campusLeader: [],
    townLeader: [],
    sontaLeader: [],
    basontaLeader: [],
    centreLeader: [],
    bacentaLeader: [],
    bishopAdmin: [],
    constituencyAdmin: [],
  }

  const updateRank = (member, churchType) => {
    if (churchType === 'bishop') {
      if (member.townBishop[0]) {
        member.townBishop.map((church) => {
          rank.bishop.push({
            name: church.name,
            church: church,
            id: church.id,
            __typename: church.__typename,
          })
          return null
        })
        return
      } else if (member.campusBishop[0]) {
        member.campusBishop.map((church) => {
          rank.bishop.push({
            name: church.name,
            church: church,
            id: church.id,
            __typename: church.__typename,
          })
          return null
        })
        return
      }
    }

    if (churchType === 'bishopAdmin') {
      member.isBishopAdminFor.map((adminFor) => {
        rank.bishopAdmin.push({
          admin: true,
          name: `Bishop ${adminFor.firstName} ${adminFor.lastName}`,
          id: adminFor.id,
          __typename: 'Bishop',
        })
        return null
      })
      return
    }

    if (churchType === 'constituencyAdmin') {
      if (member.isCampusAdminFor[0]) {
        member.isCampusAdminFor.map((adminFor) => {
          rank.constituencyAdmin.push({
            constituency: true,
            name: `${adminFor.name}`,
            id: adminFor.id,
            __typename: adminFor.__typename,
          })
          return null
        })
        return
      } else if (member.isTownAdminFor[0]) {
        member.isTownAdminFor.map((adminFor) => {
          rank.constituencyAdmin.push({
            constituency: true,
            name: `${adminFor.name}`,
            id: adminFor.id,
            __typename: adminFor.__typename,
          })
          return null
        })
        return
      }
    }

    member[`leads${capitalise(churchType)}`].map((church) => {
      let ch = church.__typename.toLowerCase()

      rank[`${ch}Leader`].push({
        name: church.name,
        centre: church.centre,
        sonta: church.sonta,
        campus: church.campus,
        town: church.town,
        bishop: church.bishop,
        id: church.id,
        link: '',
        __typename: church.__typename,
      })
      return null
    })
    return null
  }

  if (member.leadsBacenta[0]) {
    updateRank(member, 'bacenta')
  }
  if (member.leadsCentre[0]) {
    updateRank(member, 'centre')
  }
  if (member.leadsTown[0]) {
    updateRank(member, 'town')
  }
  if (member.leadsCampus[0]) {
    updateRank(member, 'campus')
  }
  if (member.leadsSonta[0]) {
    updateRank(member, 'sonta')
  }
  if (member.leadsBasonta[0]) {
    updateRank(member, 'basonta')
  }
  if (member.leadsMinistry[0]) {
    updateRank(member, 'ministry')
  }
  if (member.townBishop[0]) {
    updateRank(member, 'bishop')
  }
  if (member.campusBishop[0]) {
    updateRank(member, 'bishop')
  }
  if (member.isBishopAdminFor[0]) {
    updateRank(member, 'bishopAdmin')
  }
  if (member.isCampusAdminFor[0]) {
    updateRank(member, 'constituencyAdmin')
  }
  if (member.isTownAdminFor[0]) {
    updateRank(member, 'constituencyAdmin')
  }

  return (
    <div className="font-weight-light card-text text-center">
      {member.townBishop[0] || member.campusBishop[0] ? (
        <span
          onClick={() => {
            determineStream(member)
            history.push('/dashboard')
          }}
        >{`Bishop in the First Love Centre`}</span>
      ) : (
        //Rank Discussions */}
        Object.entries(rank).map((rank) => {
          return rank[1].map((place, i) => {
            let leader

            if (place.__typename === 'Campus' || place.__typename === 'Town') {
              leader = 'CO'
            } else {
              leader = 'Leader'
            }

            if (place.admin || place.constituency) {
              leader = 'Admin'
            }

            return (
              <span
                key={i}
                onClick={() => {
                  clickCard(place)
                  history.push(place.link)
                }}
              >
                <span className="font-weight-bold">{`${place.__typename} ${leader}`}</span>
                {` for ${place.name}`}
                <br />
              </span>
            )
          })
        })
      )}
    </div>
  )
}

export default MemberRankList
