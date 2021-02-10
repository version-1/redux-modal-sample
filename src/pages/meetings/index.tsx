import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from 'components/templates/layout'
import styles from './index.module.scss'
import { show, notify } from 'modules/ui/modal'
import ReservationForm from 'components/organisms/contact/ReservationForm'

const zeropadd = (value: number, digit = 2) => {
  return (new Array(digit).fill('0').join('') + String(value)).slice(-digit)
}

const days = '月火水木金土日'

const dates = new Array(7).fill('').map((_, index) => {
  return `${zeropadd(2)} / ${zeropadd(index + 1)} ( ${days[index]} )`
})

export const App = () => {
  const dispatch = useDispatch()

  return (
    <Layout>
      <h2>Schedule</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            {dates.map((_: string, index: number) => {
              return <td className={styles.headerCell}>{dates[index]}</td>
            })}
          </tr>
        </thead>
        <tbody>
          {new Array(4 * 24).fill('').map((_: string, rowIndex: number) => {
            const time =
              rowIndex % 4 === 0 ? zeropadd(rowIndex / 4) + ':00' : ''
            return (
              <tr className={styles.tr}>
                <th className={`${styles.th} ${time && styles.hour}`}>
                  {time}
                </th>
                {new Array(7).fill('').map((_: string, colIndex: number) => {
                  const datetime = `${dates[colIndex]} ${zeropadd(
                    Math.floor(rowIndex / 4)
                  )} : ${zeropadd((rowIndex % 4) * 15)}`
                  return (
                    <td
                      className={styles.cell}
                      onClick={() => {
                        dispatch(
                          show({
                            contents: [
                              {
                                title: '新規予約',
                                body: (
                                  <ReservationForm
                                    name="予約 太郎"
                                    datetime={datetime}
                                  />
                                ),
                                onSubmit: () => {
                                  console.log('submit 1')
                                  dispatch(
                                    notify({
                                      type: 'error',
                                      message: 'エラーが発生しました'
                                    })
                                  )
                                },
                                okLabel: '予約'
                              },
                              {
                                title: 'ゲスト予約',
                                body: (
                                  <ReservationForm
                                    name="ゲスト"
                                    datetime={datetime}
                                  />
                                ),
                                onSubmit: () => {
                                  console.log('submit 2')
                                  dispatch(
                                    notify({
                                      type: 'info',
                                      message: '予約が完了しました'
                                    })
                                  )
                                },
                                okLabel: '予約'
                              },
                              {
                                title: 'システム予約',
                                body: (
                                  <ReservationForm
                                    name="システム"
                                    datetime={datetime}
                                  />
                                ),
                                onSubmit: () => {
                                  console.log('submit 3')
                                },
                                okLabel: '予約'
                              }
                            ]
                          })
                        )
                      }}
                    ></td>
                  )
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
