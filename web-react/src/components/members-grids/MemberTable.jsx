import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Spinner from '../Spinner.jsx'
import userIcon from '../../img/user.png'
import './MemberTable.css'
import TabletDesktopView from '../responsive-design/TabletDesktopView'
import MobileView from '../responsive-design/MobileView'
import { ChurchContext } from 'contexts/ChurchContext.js'
import { transformCloudinaryImg } from 'global-utils.js'

const MemberTable = (props) => {
  const {
    memberData,
    memberError,
    memberLoading,
    offset,
    numberOfRecords,
  } = props

  const { clickCard } = useContext(ChurchContext)
  const history = useHistory()

  if (memberLoading || memberError) {
    return (
      <div className="container d-flex justify-content-center">
        <div className="mt-5 pt-5">
          <Spinner />
        </div>
      </div>
    )
  } else if (!memberData) {
    return (
      <div className="container d-flex justify-content-center">
        <div>There does not seem to be any data to display for you</div>
      </div>
    )
  } else {
    return (
      // Web View Full Screen without filters applied
      <>
        <TabletDesktopView>
          <div className="container member-grid">
            <div className="row">
              {memberData.map((soul, index) => {
                if (index < offset) {
                  return null
                } else if (index >= offset + numberOfRecords - 1) {
                  return null
                }
                return (
                  <div className="col-auto " key={index}>
                    <div
                      className="card grid-card fade-in"
                      onClick={() => {
                        clickCard(soul)
                        history.push('/member/displaydetails')
                      }}
                    >
                      <img
                        className="card-img-top"
                        src={
                          transformCloudinaryImg(soul?.pictureUrl) || userIcon
                        }
                        alt={soul?.firstName + ' ' + soul?.lastName}
                      />

                      <p className="card-title text-center pt-2">
                        {soul?.firstName + ' ' + soul?.lastName}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </TabletDesktopView>

        {/* Mobile View */}
        <MobileView>
          <div className="member-grid container">
            {memberData.map((soul, index) => {
              if (index < offset) {
                return null
              } else if (index >= offset + numberOfRecords) {
                return null
              }

              return (
                <div
                  key={index}
                  className="card mobile-search-card p-2 py-3 my-4"
                  onClick={() => {
                    clickCard(soul)
                    history.push('/member/displaydetails')
                  }}
                >
                  <div className="media">
                    <img
                      className="mr-3 rounded-circle img-search"
                      src={transformCloudinaryImg(soul?.pictureUrl) || userIcon}
                      alt={`${soul?.firstName} ${soul?.lastName}`}
                    />
                    {/* )} */}
                    <div className="media-body">
                      <h5 className="mt-0">{`${soul?.firstName} ${soul?.lastName}`}</h5>
                      {soul?.bacenta ? (
                        <div>
                          <span className="font-weight-bold">Bacenta:</span>{' '}
                          {soul?.bacenta.name}{' '}
                        </div>
                      ) : null}
                      {soul?.ministry && (
                        <div>
                          <span className="font-weight-bold">Ministry:</span>{' '}
                          {soul?.ministry.name}{' '}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </MobileView>
      </>
    )
  }
}

export default MemberTable