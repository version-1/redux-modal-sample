import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { hide, modalSelector, setIndex, TabProps } from 'modules/ui/modal'

const MODAL_WIDTH = 600

const Modal = () => {
  const { show, contents, tabIndex, onClose: onModalClose } = useSelector(
    modalSelector
  )
  const dispatch = useDispatch()
  const withHide = (cb?: () => void) => {
    return () => {
      if (cb) {
        cb()
        return
      }
      dispatch(hide())
    }
  }

  // タブの切り替えに使う数値、モーダルの幅だけ左にずらず
  // モーダルの幅が変わる時はMODAL_WIDTHが要変更
  const slideDelta = -tabIndex * MODAL_WIDTH

  return (
    <div
      className={`${styles.container} ${show ? styles.show : styles.hidden}`}
    >
      <div className={styles.tabContainer}>
        <div className={styles.tabHeader}>
          <ul>
            {contents.map((content: TabProps) => {
              const active = content.index === tabIndex

              return (
                <li
                  key={`tab-` + content.index}
                  className={`${styles.tabItem} ${
                    active && styles.tabItemActive
                  }`}
                  onClick={() => {
                    // 一気にindexを変化させると動きががたつくので
                    // 1ずつタブのindexをかえるように変更
                    const diff = content.index - tabIndex
                    const distance = Math.abs(diff)
                    for (let i = 1; i <= distance; i++) {
                      const index =
                        diff > 0 ? tabIndex + i : tabIndex - i
                      const interval = 100 * i
                      setTimeout(() => dispatch(setIndex({ index })), interval)
                    }
                  }}
                >
                  {content.title}
                </li>
              )
            })}
          </ul>
          <div className={styles.close} onClick={withHide(onModalClose)}>
            <span>x</span>
          </div>
        </div>
        <div className={styles.tabBody}>
          {contents.map((content: TabProps) => {
            const {
              title,
              header,
              footer,
              body,
              onSubmit,
              onClose,
              okLabel,
              cancelLabel
            } = content
            const active = content.index === tabIndex

            return (
              <div
                key={`content-${content.index}`}
                className={`${styles.tabContent}`}
                style={{
                  transform: `translateX(${slideDelta}px)`
                }}
              >
                <div className={`${styles.header}`}>
                  {header ? header : <h3>{title}</h3>}
                </div>
                <div className={`${styles.content}`}>{body}</div>
                <div className={`${styles.footer}`}>
                  {footer ? (
                    footer
                  ) : (
                    <ul>
                      <li>
                        <button onClick={withHide(onSubmit)}>{okLabel}</button>
                      </li>
                      <li>
                        <button onClick={withHide(onClose)}>
                          {cancelLabel}
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Modal
