import Dashboard from "./components/Dashboard"
import Home from "./components/Home"
import { BrowserRouter, Routes, Route,} from "react-router";


function App() {
  

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
