import { useState } from 'react'
import './App.css'
import AI from "./loading.jsx"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AI></AI>
    </>
  )
}

export default App
