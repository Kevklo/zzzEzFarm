import { useSelector } from "react-redux";
import { OwnedItemCard } from "../../components/OwnedItemCard";
import { useNavigate } from "react-router-dom";

export const ItemsInventory = ({items = []}) => {  

  const navigate = useNavigate();
  const { items: itemsOnInventory } = useSelector((state) => state.inventory);

  const handleClickAdd = () => {

    return navigate('/itemsAdder');
    
  }
  

    return (
      Object.keys(itemsOnInventory).length < 1 ?
      <div>
        <h3 className="text-center mt-3 mb-5">It seems you don't have any items yet...</h3>
        <button className="btn btn-primary" onClick={ handleClickAdd }>Add<i className="fas fa-add mr-5"></i></button>
      </div>
      :       
      <div className="item-container">  
        {Object.values(itemsOnInventory).map( ( i ) => (
          <OwnedItemCard key={i.name} item={{...i, img: items[i.name].img}}/>
        ))}
      </div>

    )  
}
