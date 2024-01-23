import { useState } from 'react'

// import MenuSidebar from '@/components/MenuSidebar'
// import MenuTopbar from '@/components/MenuTopbar'
import Project from '@/Project'
import LoginForm from '@/Project/Login'

import './fontStyles.css'

const App = () => {

  const [user, setUser] = useState(null)

  return (
    <>
      {user === null && <h2>log in to application</h2>}
      {user === null && <LoginForm setUser={setUser} />}
      {user && <Project />}
    </>
  )
}

export default App