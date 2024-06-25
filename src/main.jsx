import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from '@/App/App.jsx'
import '@/i18n/config.js'
import browserHistory from './browserHistory'
import icon from '@/App/assets/taskly_icon.png' // Even though it seems like it is not used, it has to stay here or else the icon will not render

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router history={browserHistory}>
    <App />
  </Router>
)
