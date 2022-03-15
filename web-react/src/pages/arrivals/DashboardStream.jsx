import { useMutation, useQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'
import { MAKE_STREAMARRIVALS_ADMIN } from './arrivalsMutations'
import { STREAM_ARRIVALS_DASHBOARD } from './arrivalsQueries'
import { throwErrorMsg } from 'global-utils'
import BaseComponent from 'components/base-component/BaseComponent'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import Popup from 'components/Popup/Popup'
import { Form, Formik } from 'formik'
import FormikControl from 'components/formik-components/FormikControl'
import SubmitButton from 'components/formik-components/SubmitButton'
import RoleView from 'auth/RoleView'
import { permitAdmin, permitArrivals } from 'permission-utils'
import MenuButton from 'components/buttons/MenuButton'

const StreamDashboard = () => {
  const { isOpen, togglePopup, streamId } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(STREAM_ARRIVALS_DASHBOARD, {
    variables: { id: streamId },
  })
  const [MakeStreamArrivalsAdmin] = useMutation(MAKE_STREAMARRIVALS_ADMIN)
  const stream = data?.streams[0]

  const initialValues = {
    adminName: stream?.arrivalsAdmin
      ? `${stream?.arrivalsAdmin?.firstName} ${stream?.arrivalsAdmin?.lastName}`
      : '',
    adminSelect: stream?.arrivalsAdmin?.id ?? '',
  }
  const validationSchema = Yup.object({
    adminSelect: Yup.string().required(
      'Please select an Admin from the dropdown'
    ),
  })

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)

    MakeStreamArrivalsAdmin({
      variables: {
        streamId: streamId,
        newAdminId: values.adminSelect,
        oldAdminId: initialValues.adminSelect || 'no-old-admin',
      },
    })
      .then(() => {
        togglePopup()
        onSubmitProps.setSubmitting(false)
        alert('stream Arrivals Admin has been changed successfully')
      })
      .catch((e) => throwErrorMsg(e))
  }

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary loading={loading}>
          {stream?.name} stream Arrivals
        </HeadingPrimary>
        {isOpen && (
          <Popup handleClose={togglePopup}>
            <b>Change Arrivals Admin</b>
            <p>Please enter the name of the new arrivals rep</p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <Row className="form-row">
                    <Col>
                      <FormikControl
                        control="memberSearch"
                        name="adminSelect"
                        initialValue={initialValues?.adminName}
                        placeholder="Select an Admin"
                        setFieldValue={formik.setFieldValue}
                        aria-describedby="Member Search"
                        error={formik.errors.admin}
                      />
                    </Col>
                  </Row>

                  <SubmitButton formik={formik} />
                </Form>
              )}
            </Formik>
          </Popup>
        )}

        <Card>
          <Card.Header>Arrivals Summary</Card.Header>
        </Card>
        <div className="d-grid gap-2">
          <RoleView
            roles={[...permitAdmin('stream'), ...permitArrivals('Stream')]}
          >
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => togglePopup()}
            >
              Change Arrivals Admin
            </Button>
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => navigate('/stream/arrivals-helpers')}
            >
              Arrivals Helpers
            </Button>
          </RoleView>
          <MenuButton
            title="Bacentas Yet to Submit"
            onClick={() => navigate('/arrivals/bacentas-no-activity')}
            icon
            iconBg
            noCaption
          />
          <MenuButton
            title="Bacentas That Have Submitted"
            onClick={() => navigate('/arrivals/bacentas-on-the-way')}
            icon
            iconBg
            noCaption
          />
          <MenuButton
            title="Bacentas That Have Been Counted"
            onClick={() => navigate('/arrivals/bacentas-have-been-counted')}
            icon
            iconBg
            noCaption
          />
        </div>
      </Container>
    </BaseComponent>
  )
}

export default StreamDashboard
