import { Route, Routes } from "react-router-dom"
import { FarmingPage } from "../farm/pages/FarmingPage"
import { CharacterGrid } from './../farm/pages/CharacterGrid';
import { CharacterAdder } from "../farm/pages/CharacterAdder";

export const AppRouter = () => {

  const chars = [{name: 'Burnice', attribute: 'Fire', type: 'Anomaly', smallImg: `/assets/burnice_small.jpg`, bigImg: `assets/burnice_big.webp`}] // Temporary untill API is implemented

  return (
    <Routes>

      <Route path="/*" element={ <FarmingPage /> }/>
      <Route path="/charactergrid" element={ <CharacterGrid /> }></Route>
      <Route path="/characteradder" element={ <CharacterAdder chars={ chars }/> }></Route>
      
    </Routes>
  )
}
