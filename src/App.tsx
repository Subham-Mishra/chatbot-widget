import { Toaster } from 'react-hot-toast'
import { WidgetPage } from 'pages'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<WidgetPage />} />
          <Route path="/chat/:id" element={<WidgetPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-left" />
    </Provider>
  )
}

export { App }
