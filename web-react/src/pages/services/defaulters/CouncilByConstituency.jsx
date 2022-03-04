import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import { TelephoneFill, Whatsapp } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'
import { COUNCIL_BY_CONSTITUENCY } from './DefaultersQueries'

const CouncilByConstituency = () => {
  const { councilId, clickCard } = useContext(ChurchContext)
  const { currentUser, setCurrentUser } = useContext(MemberContext)
  const { data, loading, error } = useQuery(COUNCIL_BY_CONSTITUENCY, {
    variables: {
      id: councilId,
    },
  })
  const navigate = useNavigate()

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container
        className={`fw-bold large-number pb-3`}
      >{`${data?.councils[0].name} Council By Constituency`}</Container>
      <Row>
        {data?.councils[0].constituencies.map((constituency, i) => (
          <Col key={i} xs={12} className="mb-3">
            <Card>
              <Card.Header className="fw-bold">{`${constituency.name} Constituency`}</Card.Header>
              <Card.Body
                onClick={() => {
                  clickCard(constituency)
                  setCurrentUser({
                    ...currentUser,
                    currentChurch: constituency,
                  })
                  sessionStorage.setItem(
                    'currentUser',
                    JSON.stringify({
                      ...currentUser,
                      currentChurch: constituency,
                    })
                  )

                  navigate('/services/defaulters/dashboard')
                }}
              >
                <div>
                  Active Fellowships {constituency.activeFellowshipCount}
                </div>
                <div>
                  Services This Week {constituency.servicesThisWeekCount}
                </div>
                <div
                  className={
                    constituency.formDefaultersThisWeekCount ? 'bad' : 'good'
                  }
                >
                  Form Not Filled This Week{' '}
                  {constituency.formDefaultersThisWeekCount}
                </div>
                <div
                  className={
                    constituency.bankedThisWeekCount ===
                    constituency.servicesThisWeekCount
                      ? 'good'
                      : 'bad'
                  }
                >
                  Banked This Week {constituency.bankedThisWeekCount}
                </div>
                <div
                  className={
                    constituency.bankingDefaultersThisWeekCount ? 'bad' : 'good'
                  }
                >
                  Not Banked This Week{' '}
                  {constituency.bankingDefaultersThisWeekCount}
                </div>
                <div
                  className={
                    constituency.cancelledServicesThisWeekCount && 'bad'
                  }
                >
                  Cancelled Services This Week{' '}
                  {constituency.cancelledServicesThisWeekCount}
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="mb-2">
                  Contact Admin: {constituency?.admin?.fullName}
                </div>
                <a href={`tel:${constituency?.admin?.phoneNumber}`}>
                  <Button variant="primary">
                    <TelephoneFill /> Call
                  </Button>
                </a>
                <a
                  href={`https://wa.me/${constituency?.admin?.whatsappNumber}`}
                  className="ms-3"
                >
                  <Button variant="success">
                    <Whatsapp /> WhatsApp
                  </Button>
                </a>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </BaseComponent>
  )
}

export default CouncilByConstituency
