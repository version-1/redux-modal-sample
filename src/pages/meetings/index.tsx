import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from 'components/templates/layout'
import styles from './index.module.scss'

const zeropadd = (value: number, digit = 2) => {
  return (new Array(digit).fill('0').join('') + String(value)).slice(-digit)
}

const days = '月火水木金土日'

export const App = () => {
  const dispatch = useDispatch()

  return (
    <Layout>
      <h2>Schedule</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            {new Array(7).fill('').map((_: string, index: number) => {
              return (
                <td className={styles.headerCell}>
                  {zeropadd(2)} / {zeropadd(index + 1)} ( {days[index]} )
                </td>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {new Array(4 * 24).fill('').map((_: string, index: number) => {
            const time = index % 4 === 0 ? zeropadd(index / 4) + ':00' : ''
            return (
              <tr className={styles.tr}>
                <th className={`${styles.th} ${time && styles.hour}`}>
                  {time}
                </th>
                {new Array(7).fill('').map((_: string, index: number) => {
                  return <td className={styles.cell}></td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Layout>
  )
}

export default App
