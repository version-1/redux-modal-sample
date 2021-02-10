import React from 'react'
import Header from 'components/templates/header'
import styles from './index.module.scss'
import Modal from 'components/templates/modal'

interface Props {
  children: JSX.Element | JSX.Element[]
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Modal />
      <Header />
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Layout
