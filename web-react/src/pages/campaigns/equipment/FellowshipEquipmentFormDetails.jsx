import React, { useContext } from 'react'
import { Container, Row, Table, Button } from 'react-bootstrap'
import HeadingSecondary from 'components/HeadingSecondary'
//import BaseComponent from 'components/base-component/BaseComponent'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { MemberContext } from 'contexts/MemberContext'
//import { useNavigate } from 'react-router'
import { CampaignContext } from 'contexts/CampaignContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { useQuery } from '@apollo/client'
import { FELLOWSHIP_EQUIPMENT_RECORD } from '../CampaignQueries'

const FellowshipEquipmentFormDetails = () => {
  const { currentUser } = useContext(MemberContext)
  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const { theme } = useContext(MemberContext)
  //const navigate = useNavigate()
  const { equipmentRecordId } = useContext(CampaignContext)
  const { data, loading, error } = useQuery(FELLOWSHIP_EQUIPMENT_RECORD, {
    variables: { equipmentRecordId: equipmentRecordId },
  })

  const offeringBags = data?.equipmentRecords[0]?.offeringBags
  //const date = data?.equipmentRecords[0]?.date;

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <Container>
        <HeadingPrimary className="text-center">
          Equipment Campaign
        </HeadingPrimary>
        <HeadingSecondary className="text-center pb-4">{`${church?.name} ${churchType}`}</HeadingSecondary>
        <div className="pb-5">
          <Row>
            <Table variant={theme} striped bordered>
              <tbody>
                <tr>
                  <td>Date </td>
                  <td>26 Jan 2022</td>
                </tr>
                <tr>
                  <td>Number of Offering Bags </td>
                  <td>{offeringBags}</td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </div>
        <div className="d-flex justify-content-center pt-5">
          <Button
            className={`btn-trends ${theme} px-5`}
            onClick={() => {
              alert('Hello')
            }}
          >
            Continue
          </Button>
        </div>
      </Container>
    </BaseComponent>
  )
}

export default FellowshipEquipmentFormDetails
