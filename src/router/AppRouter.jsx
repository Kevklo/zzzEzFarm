import { Route, Routes } from "react-router-dom"
import { FarmingPage } from "../farm/pages/FarmingPage"
import { CharacterGrid } from './../farm/pages/CharacterGrid';
import { CharacterAdder } from "../farm/pages/CharacterAdder";
import { NavBar } from "../UI/NavBar";
import { CharacterInfoPage } from "../components/CharacterInfoPage";
import { ItemsInventory } from "../farm/pages/ItemsInventory";
import { ItemsAdder } from "../farm/pages/ItemsAdder";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData } from './../store/apiData/thunks';
import { LoadingPage } from './../UI/LoadingPage';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { loading, characters: characterData, items: itemsData } = useSelector((state) => state.apiData);


  useEffect(() => {
    dispatch(fetchApiData());
  }, [dispatch]);

  if(loading === 'pending') {
    return <LoadingPage />
  }

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
