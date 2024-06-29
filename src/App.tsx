import { Toaster } from 'react-hot-toast'
import { WidgetPage } from 'pages'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <WidgetPage />
      <Toaster position="bottom-left" />
    </Provider>
  )
}

export { App }
