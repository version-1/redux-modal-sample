import React from 'react'
import Header from 'components/templates/header'
import './index.module.scss'

interface Props {
  children: JSX.Element | JSX.Element[]
}

const Layout: React.FC<Props> = ({ children }) => {
  return <div>
    <Header />
    { children }
  </div>
}

export default Layout
