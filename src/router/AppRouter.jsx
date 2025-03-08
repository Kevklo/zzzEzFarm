import { Route, Routes } from "react-router-dom"
import { FarmingPage } from "../farm/pages/FarmingPage"
import { CharacterGrid } from './../farm/pages/CharacterGrid';
import { CharacterAdder } from "../farm/pages/CharacterAdder";
import { NavBar } from "../UI/NavBar";
import { CharacterInfoPage } from "../components/CharacterInfoPage";
import { characterData } from '../mock/characterData'  //? Temporary until API is implemented

export const AppRouter = () => {


  //? const chars = Fetch( URL ).JSON

  return (
    <>
      <NavBar />
      <Routes>

        <Route path="/*" element={ <FarmingPage /> }/>
        <Route path="/charactergrid" element={ <CharacterGrid chars={ characterData }/> }></Route>
        <Route path="/characteradder" element={ <CharacterAdder chars={ characterData }/> }></Route>
        <Route path="/characterinfopage/:name" element={ <CharacterInfoPage chars={ characterData }/> }></Route>

      </Routes>
    </>
  )
}
