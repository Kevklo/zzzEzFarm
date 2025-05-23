import { addItem } from "../../store/inventory/inventorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";

export const ItemsAdder = ({ items = {} }) => {
  const itemsData = useSelector((store) => store.apiData.items);
  const dispatch = useDispatch();
  const [amounts, setAmounts] = useState({});
  const handleChange = (itemName, value) => {
    setAmounts({
      ...amounts,
      [itemName]: value || 0
    });
  };

  const handleAddItems = () => {
    const addedItems = [];

    Object.entries(amounts).forEach(([itemName, amount]) => {
      amount = parseInt(amount);
      if( amount > 0) {
        dispatch(addItem({name: itemName, amount}));
        addedItems.push({name: itemName, amount});
      }
    });
    if (addedItems.length > 0) {
      Swal.fire({
        title: "Items Added!",
        html: addedItems
        .map((item) => {
          const img = itemsData.find((i) => i.name === item.name).imageUrl;
          return `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span>${item.name.replace(/_/g, " ")} — ${item.amount}</span>
              <img src="${img}" alt="${item.name}" style="width: 32px; height: 32px; margin-left: 10px;" />
            </div>
          `;
        })
        .join(""),
      icon: "success",
    });
    setAmounts({});
  }};

  return (
    <div className="container mt-2 mb-3">
      <h4>Select the items you want to add</h4>
      <div className="item-container">
        {Object.values(items).map((item) => (
          <div key={item.name} className="item-card">
            <img src={item.imageUrl} alt={item.name} className="item-image" />
            <p>{item.name.replace(/_/g, " ")}</p>
            <input type="number" min="0" className="item-input" 
              value={amounts[item.name] || ""}
              onChange={(e) => handleChange(item.name, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-success" onClick={handleAddItems}>
          Add Selected Items
        </button>
      </div>
    </div>
    
  );
};