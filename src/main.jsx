import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from '@/App/App.jsx'
// import './index.css'
import '@/i18n/config.js'
import browserHistory from './browserHistory'
import icon from '@/App/assets/taskly_icon.png'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router history={browserHistory}>
    <App />
  </Router>
)
