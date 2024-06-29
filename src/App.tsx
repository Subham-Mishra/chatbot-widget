import { Fragment } from 'react'
import { Toaster } from 'react-hot-toast'
import { WidgetPage } from 'pages'

const App = () => {
  return (
    <Fragment>
      <WidgetPage />
      <Toaster position="bottom-left" />
    </Fragment>
  )
}

export { App }
