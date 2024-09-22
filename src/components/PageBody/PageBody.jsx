import React from 'react'
import {Login, Register, GuideChart} from "../../components"
import './PageBody.css'

const PageBody = ({currentPage}) => {
  switch (currentPage) {
    case 'login':
      return <Login />;
    case 'register':
      return <Register />;
    default:
      return <GuideChart />;
  }
}

export default PageBody