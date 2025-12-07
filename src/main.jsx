import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import PasswordGenerator from './code/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PasswordGenerator />
  </StrictMode>,
)
