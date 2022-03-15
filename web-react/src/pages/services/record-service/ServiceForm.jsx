import MinusSign from 'components/buttons/PlusMinusSign/MinusSign'
import PlusSign from 'components/buttons/PlusMinusSign/PlusSign'
import FormikControl from 'components/formik-components/FormikControl'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { ServiceContext } from 'contexts/ServiceContext'
import { Col, Container, Row } from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import SubmitButton from 'components/formik-components/SubmitButton'
import { throwErrorMsg } from 'global-utils'

const ServiceForm = ({
  church,
  churchId,
  churchType,
  RecordServiceMutation,
}) => {
  const { setServiceRecordId } = useContext(ServiceContext)
  const navigate = useNavigate()

  const initialValues = {
    serviceDate: new Date().toISOString().slice(0, 10),
    cediIncome: '',
    foreignCurrency: '',
    numberOfTithers: '',
    attendance: '',
    treasurers: [''],
    treasurerSelfie: '',
    servicePicture: '',
  }

  const validationSchema = Yup.object({
    serviceDate: Yup.date()
      .max(new Date(), 'Service could not possibly have happened after today')
      .required('Date is a required field'),
    cediIncome: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .required('You cannot submit this form without entering your income'),
    foreignCurrency: Yup.string(),
    numberOfTithers: Yup.number()
      .typeError('Please enter a valid number')
      .integer('You cannot enter decimals here')
      .required(
        'You cannot submit this form without entering your number of tithers'
      ),
    attendance: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .integer('You cannot have attendance with decimals!')
      .required('You cannot submit this form without entering your attendance'),
    treasurerSelfie: Yup.string().required('You must take a treasurers selfie'),
    servicePicture: Yup.string().required(
      'Please submit a picture of your service'
    ),
    treasurers: Yup.array()
      .min(2, 'You must have at least two treasurers')
      .of(Yup.string().required('Please pick a name from the dropdown')),
  })

  const onSubmit = (values, onSubmitProps) => {
    if (values.treasurers[0] === values.treasurers[1]) {
      throwErrorMsg('You cannot choose the same treasurer twice!')
      return
    } else {
      onSubmitProps.setSubmitting(true)
      RecordServiceMutation({
        variables: {
          churchId: churchId,
          serviceDate: values.serviceDate,
          attendance: parseInt(values.attendance),
          income: parseFloat(values.cediIncome),
          foreignCurrency: values.foreignCurrency,
          numberOfTithers: parseInt(values.numberOfTithers),
          treasurers: values?.treasurers,
          treasurerSelfie: values.treasurerSelfie,
          servicePicture: values.servicePicture,
        },
      }).then((res) => {
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        setServiceRecordId(res.data.RecordService.id)
        navigate(`/${churchType}/service-details`)
      })
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
    >
      {(formik) => (
        <Container>
          <HeadingPrimary>Record Your Service Details</HeadingPrimary>
          <h5 className="text-secondary">{`${church?.name} ${church?.__typename}`}</h5>

          <Form className="form-group">
            <Row className="row-cols-1 row-cols-md-2">
              {/* <!-- Service Form--> */}
              <Col className="mb-2">
                <div className="form-row d-flex justify-content-center">
                  <Col>
                    <small htmlFor="dateofservice" className="form-text label">
                      Date of Service*
                      <i className="text-secondary">(Day/Month/Year)</i>
                    </small>
                    <FormikControl
                      control="input"
                      name="serviceDate"
                      type="date"
                      placeholder="dd/mm/yyyy"
                      aria-describedby="dateofservice"
                    />
                    <FormikControl
                      control="input"
                      name="attendance"
                      label="Attendance*"
                    />
                    <FormikControl
                      control="input"
                      name="cediIncome"
                      label="Income (in Cedis)*"
                    />
                    <FormikControl
                      control="input"
                      name="foreignCurrency"
                      label="Foreign Currency (if any)*"
                    />
                    <FormikControl
                      control="input"
                      name="numberOfTithers"
                      label="Number of Tithers*"
                    />
                    <small className="label">Treasurers (minimum of 2)</small>
                    <FieldArray name="treasurers">
                      {(fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps
                        const { values } = form
                        const { treasurers } = values
                        {
                          formik.values.treasurers
                        }
                        return (
                          <>
                            {treasurers.map((treasurer, index) => (
                              <Row key={index} className="form-row">
                                <Col>
                                  <FormikControl
                                    control="memberSearch"
                                    name={`treasurers[${index}]`}
                                    placeholder="Start typing"
                                    setFieldValue={formik.setFieldValue}
                                    aria-describedby="Member List"
                                    error={
                                      !Array.isArray(formik.errors.treasurers)
                                        ? formik.errors.treasurers
                                        : formik.errors.treasurers &&
                                          formik.errors.treasurers[index]
                                    }
                                  />
                                </Col>

                                <Col className="col-auto d-flex">
                                  <PlusSign onClick={() => push()} />
                                  {index > 0 && (
                                    <MinusSign onClick={() => remove(index)} />
                                  )}
                                </Col>
                              </Row>
                            ))}
                          </>
                        )
                      }}
                    </FieldArray>
                    <Col className="my-2 mt-5">
                      <small>Upload Treasurer Selfie*</small>
                      <FormikControl
                        control="imageUpload"
                        name="treasurerSelfie"
                        uploadPreset={
                          process.env.REACT_APP_CLOUDINARY_TREASURERS
                        }
                        placeholder="Choose"
                        setFieldValue={formik.setFieldValue}
                        aria-describedby="ImageUpload"
                      />
                    </Col>
                    <Col className="my-2">
                      <small className="mb-3">
                        Upload a Picture of Your Service*
                      </small>
                      <FormikControl
                        control="imageUpload"
                        name="servicePicture"
                        uploadPreset={process.env.REACT_APP_CLOUDINARY_SERVICES}
                        placeholder="Choose"
                        setFieldValue={formik.setFieldValue}
                        aria-describedby="UploadServicePicture"
                      />
                    </Col>
                    <div className="d-flex justify-content-center mt-5">
                      <SubmitButton formik={formik} />
                    </div>
                  </Col>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      )}
    </Formik>
  )
}

export default ServiceForm
