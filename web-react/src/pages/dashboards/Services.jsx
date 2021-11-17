import MenuButton from 'components/buttons/MenuButton'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { BarChartFill, Book } from 'react-bootstrap-icons'
import { useHistory } from 'react-router'

const Services = () => {
  const { currentUser, theme } = useContext(MemberContext)
  const history = useHistory()
  return (
    <div className="d-flex align-items-center justify-content-center h-75 nav-margin-top-0">
      <Container>
        <PlaceholderCustom xs={12} as="h1">
          <div className="text-center">
            <h1 className="mb-0  page-header">{`${currentUser.fullName}'s`}</h1>
            <p className={`${theme} menu-subheading`}>Services</p>
          </div>
        </PlaceholderCustom>

        <div className="d-grid gap-2 mt-5 text-left">
          <MenuButton
            iconComponent={Book}
            title="Fellowship Service"
            color="members"
            onClick={() => history.push(`/services/fellowship`)}
          />
          <MenuButton
            iconComponent={BarChartFill}
            title="Trends"
            color="members"
            onClick={() => history.push(`/services/trends`)}
          />
        </div>
      </Container>
    </div>
  )
}

export default Services
