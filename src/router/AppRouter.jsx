import { Route, Routes } from "react-router-dom"
import { FarmingPage } from "../farm/pages/FarmingPage"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={ <FarmingPage /> }/>
    </Routes>
  )
}
