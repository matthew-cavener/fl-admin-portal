import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ChurchContext } from '../../contexts/ChurchContext'

export const ChurchButton = (props) => {
  const { church } = props
  const { clickCard } = useContext(ChurchContext)

  return (
    <Link to={`/${church.__typename.toLowerCase()}/displaydetails`}>
      <button
        className="card-buttons py-2 px-3 text-center text-nowrap text-white"
        onClick={() => {
          clickCard(church)
        }}
      >
        {church.name}
      </button>
    </Link>
  )
}
