import CharacterCounter from './pages/CharacterCounter'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <CharacterCounter />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
