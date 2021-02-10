import { createSlice, createSelector } from '@reduxjs/toolkit'

const defaultTabProps = {
  index: -1,
  title: '',
  message: {
    error: '' as JSX.Element | string,
    warning: '' as JSX.Element | string,
    info: '' as JSX.Element | string
  },
  header: undefined as JSX.Element | undefined,
  body: undefined as JSX.Element | undefined,
  footer: undefined as JSX.Element | undefined,
  okLabel: '送信',
  cancelLabel: 'キャンセル',
  onSubmit: undefined as (() => void) | undefined,
  onClose: undefined as (() => void) | undefined,
  contents: [] as JSX.Element[],
  tabIndex: 0
}

export type TabProps = typeof defaultTabProps

const initialState = {
  show: false,
  onSubmit: undefined as (() => void) | undefined,
  onClose: undefined as (() => void) | undefined,
  contents: [] as JSX.Element[],
  tabIndex: 0
}

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    notify(state: any, action: any) {
      const { type, message } = action.payload

      const content = state.contents[state.tabIndex]
      content.message = { ...defaultTabProps.message }

      content.message[type] = message
      state.contents[state.tabIndex] = content
    },
    setIndex(state, action: any) {
      state.tabIndex = action.payload.index
    },
    show(state: any, action: any) {
      state.show = true
      state.contents = action.payload.contents.map(
        (item: TabProps, index: number) => ({
          ...defaultTabProps,
          ...item,
          index
        })
      )
    },
    hide(state: any) {
      Object.assign(state, initialState)
    }
  }
})

export const { show, hide, notify, setIndex } = slice.actions

export const modalSelector = createSelector(
  (state: any) => {
    return state.ui.modal
  },
  (params: any) => params
)

export default slice.reducer
