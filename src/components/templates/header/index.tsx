import React from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <h1>Contact List</h1>
      </div>
      <div className={styles.menu}>
        <ul>
          <li>
            <Link to="/">Top</Link>
          </li>
          <li>
            <Link to="/meetings">Meeting</Link>
          </li>
          <li>
            <Link to="/users">Profile</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
