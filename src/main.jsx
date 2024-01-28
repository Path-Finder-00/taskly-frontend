import ReactDOM from 'react-dom/client'
import App from '@/App/App.jsx'
// import './index.css'
import '@/i18n/config.js'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
