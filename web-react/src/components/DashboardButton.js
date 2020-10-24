import React from 'react'
import { Link } from 'react-router-dom'

export const DashboardButton = (props) => {
  return (
    <div className="col">
      <Link to={`${props.btnLink}`}>
        <button className="btn btn-primary btn-lg mb-4 mx-2">
          {props.btnText}
        </button>
      </Link>
    </div>
  )
}
