import { Route, Routes } from "react-router-dom"
import { FarmingPage } from "../farm/pages/FarmingPage"
import { CharacterGrid } from './../farm/pages/CharacterGrid';
import { CharacterAdder } from "../farm/pages/CharacterAdder";
import { NavBar } from "../UI/NavBar";
import { CharacterInfoPage } from "../components/CharacterInfoPage";
import { characterData } from '../mock/characterData'  //? Temporary until API is implemented
import { itemsData } from '../mock/itemsData'
import { ItemsInventory } from "../farm/pages/ItemsInventory";
import { ItemsAdder } from "../farm/pages/ItemsAdder";

export const AppRouter = () => {


  //? const chars = Fetch( URL ).JSON
  //? const items = Fetch( URL ).JSON

  return (
    <>
      <NavBar />
      <Routes>

        <Route path="/*" element={ <FarmingPage /> }/>
        <Route path="/charactergrid" element={ <CharacterGrid characterData = { characterData }/> }></Route>
        <Route path="/characteradder" element={ <CharacterAdder characterData = { characterData }/> }></Route>
        <Route path="/characterinfopage/:name" element={ <CharacterInfoPage characterData = { characterData }/> }></Route>
        <Route path="/itemsinventory" element={ <ItemsInventory items={ itemsData }/> }></Route>
        <Route path="/itemsadder" element={ <ItemsAdder items={ itemsData }/> }></Route>

      </Routes>
    </>
  )
}
