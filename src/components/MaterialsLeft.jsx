import { useSelector } from "react-redux";
import { materialsNeeded } from "../helpers/materialsNeeded";
import { itemsData } from "../mock/itemsData";

export const MaterialsLeft = ({ character }) => {
  const { items } = useSelector(state => state.inventory);
  const materialsLeft = materialsNeeded({ char: character, items });

  const formattedMaterials = materialsLeft.map((mat) => {
    return{
      ...mat,
      img: itemsData[mat.name]?.img, 
    }
  });

  return (
    <div className="d-flex flex-wrap materials-left gap-2 mt-2">
      {formattedMaterials.map(mat => {
        const amountOwned = items[mat.name]?.amount || 0;
        const isLessThanNeeded = mat.amount > amountOwned;

        return (
          <div
            key={mat.name}
            className={`${isLessThanNeeded ? 'bg-danger' : 'bg-primary'} shadow-sm`}
            style={{ width: "50px", height: "75px"}}
          >
            <img
              src={mat.img}
              alt={mat.name}
              className="img-fluid"
              style={{ maxWidth: "50px", maxHeight: "50px" }}
            />
            <p className="p-0 m-0">{mat.amount || 0}</p>
          </div>
        );
      })}
    </div>
  );
};