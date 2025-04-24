import { useSelector } from "react-redux";
import { OwnedItemCard } from "../../components/OwnedItemCard";
import { useNavigate } from "react-router-dom";

export const ItemsInventory = ({items = []}) => {  

  const navigate = useNavigate();
  const { items: itemsOnInventory } = useSelector((state) => state.inventory);

  const handleClickAdd = () => {
    return navigate('/itemsAdder');
  }
  const getItemImage = (itemName) => {
    const foundItem = items.find(item => item.name === itemName);
    return foundItem?.imageUrl || '';
  };

    return (
      Object.keys(itemsOnInventory).length < 1 ?
      <div className="mb-3">
        <h3 className="text-center mt-3 mb-4">It seems you don't have any items yet...</h3>
        <button className="btn btn-success" onClick={ handleClickAdd }>Add<i className="fas fa-add mr-5"></i></button>
      </div>
      :       
      <div className="card-container mb-4">  
        {Object.values(itemsOnInventory).map( ( i ) => (
          <OwnedItemCard key={i.name} item={{...i, img: getItemImage(i.name)}}/>
        ))}
      </div>

    )  
}
