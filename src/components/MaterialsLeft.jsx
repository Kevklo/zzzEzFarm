import { useSelector } from "react-redux";
import { materialsNeeded } from "../helpers/materialsNeeded";

export const MaterialsLeft = ({ character }) => {
  const itemsData = useSelector((store) => store.apiData.items);
  const { items } = useSelector(state => state.inventory);
  const materialsLeft = materialsNeeded({ char: character, items });
  
    const formattedMaterials = materialsLeft.map((mat) => {
      const foundItem = itemsData.find((item) => item.name === mat.name)
      return{
        ...mat,
        img: foundItem.imageUrl, 
      }
  });

  return (
    <div className="d-flex flex-wrap materials-left gap-2 mt-2 justify-content-center">
      {formattedMaterials.map(mat => {
        const isLessThanNeeded = mat.amount > 0;
        return (
          <div
            key={mat.name}
            className={`${isLessThanNeeded ? 'bg-danger' : 'bg-success'} shadow-sm`}
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