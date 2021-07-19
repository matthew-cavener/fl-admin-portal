import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../components/formik-components/FormikControl'
import {
  GET_CAMPUS_CENTRES,
  GET_TOWN_CENTRES,
  BISHOP_MEMBER_DROPDOWN,
  GET_MINISTRIES,
} from '../../queries/ListQueries.js'
import { CREATE_SONTA_MUTATION } from './CreateMutations'
import NavBar from '../../components/nav/NavBar'
import ErrorScreen from '../../components/ErrorScreen'
import LoadingScreen from '../../components/LoadingScreen'
import { ChurchContext } from '../../contexts/ChurchContext'
import { capitalise, makeSelectOptions } from 'global-utils'
import { DISPLAY_CAMPUS, DISPLAY_TOWN } from 'pages/display/ReadQueries'

function CreateSonta() {
  const { church, bishopId, campusId, townId, setSontaId } = useContext(
    ChurchContext
  )

  const { data: ministryListData, loading: ministryListLoading } = useQuery(
    GET_MINISTRIES
  )
  const { data: townData, loading: townLoading } = useQuery(DISPLAY_TOWN, {
    variables: { id: church.church === 'town' ? townId : campusId },
  })
  const { data: campusData, loading: campusLoading } = useQuery(
    DISPLAY_CAMPUS,
    {
      variables: { id: church.church === 'town' ? townId : campusId },
    }
  )

  const isCampus = church.church === 'campus'
  const campusTownLoading = isCampus ? campusLoading : townLoading

  const campusTownData = isCampus ? campusData?.campuses[0] : townData?.towns[0]

  const initialValues = {
    ministrySelect: '',
    leaderId: '',
    campusTown: campusTownData?.name ?? '',
  }

  const history = useHistory()

  const validationSchema = Yup.object({
    ministrySelect: Yup.string().required('You must choose a ministry'),
    leaderId: Yup.string().required('Please choose a leader from the dropdown'),
  })

  const [CreateSonta] = useMutation(CREATE_SONTA_MUTATION, {
    onCompleted: (data) => {
      setSontaId(data.CreateSonta.id)
    },
    refetchQueries: [
      { query: GET_CAMPUS_CENTRES, variables: { id: bishopId } },
      { query: GET_TOWN_CENTRES, variables: { id: bishopId } },
    ],
  })

  if (ministryListData && campusTownData) {
    const ministryOptions = makeSelectOptions(ministryListData.ministries)

    const sontasNotInCampusTown = ministryOptions.filter((ministry) => {
      return !campusTownData.sontas.some(
        (sonta) => sonta['name'] === `${campusTownData?.name} ${ministry.key}`
      )
    })

    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      CreateSonta({
        variables: {
          ministryId: values.ministrySelect,
          leaderId: values.leaderId,
          townCampusId: campusTownData?.id,
        },
      }).then(() => {
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        history.push('/sonta/displaydetails')
      })
    }

    return (
      <>
        <NavBar />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <div className="body-card py-4 container mt-5">
              <div className="container infobar">Start a New Sonta</div>
              <Form>
                <div className="form-group">
                  <div className="row row-cols-1 row-cols-md-2">
                    {/* <!-- Create Sonta Div --> */}
                    <div className="col mb-2">
                      <div className="form-row row-cols-2">
                        <div className="col-10">
                          <label className="label">{`${capitalise(
                            church.church
                          )}:`}</label>
                          <div className="pl-2">
                            <p>{`${campusTownData?.name} ${capitalise(
                              church.church
                            )}`}</p>
                          </div>
                        </div>
                      </div>

                      <div className="form-row row-cols-3">
                        <div className="col-10">
                          <FormikControl
                            className="form-control"
                            label="Ministry*"
                            control="select"
                            name="ministrySelect"
                            options={sontasNotInCampusTown}
                            defaultOption="Ministry"
                          />
                        </div>
                      </div>
                      <div className="row d-flex align-items-center">
                        <div className="col">
                          <FormikControl
                            control="combobox2"
                            name="leaderId"
                            placeholder="Select a Leader"
                            setFieldValue={formik.setFieldValue}
                            optionsQuery={BISHOP_MEMBER_DROPDOWN}
                            queryVariable1="id"
                            variable1={bishopId}
                            queryVariable2="nameSearch"
                            suggestionText="name"
                            suggestionID="id"
                            dataset="bishopMemberDropdown"
                            aria-describedby="Bishop Member List"
                            className="form-control"
                            error={formik.errors.leaderId}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center m">
                  <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    className="btn btn-primary px-5 py-3"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </>
    )
  } else if (campusTownLoading || ministryListLoading) {
    return <LoadingScreen />
  } else {
    return <ErrorScreen />
  }
}

export default CreateSonta
