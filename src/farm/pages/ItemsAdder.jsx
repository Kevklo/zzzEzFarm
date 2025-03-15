import { addItem } from "../../store/inventory/inventorySlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";

export const ItemsAdder = ({ items = {} }) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddItem = () => {
    const qty = parseFloat(amount);
    if (!selectedItem || isNaN(qty) || qty <= 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Select a valid item and amount",
      });
      return;
    }

    dispatch(addItem({ name: selectedItem, amount: qty }));
    setAmount("");

    Swal.fire({
      icon: "success",
      title: "Success",
      text: `${qty} ${selectedItem.replace(/_/g, " ")} added to the inventory`,
    });
  };

  return (
    <>
      <h4>Select the item you want to add</h4>
      <div className="card_container">
        {Object.values(items).map((item) => (
          <div key={item.name} className="item_card" onClick={() => setSelectedItem(item.name)}>
            <img src={item.img} alt={item.name} className="item_image" />
            <p>{item.name.replace(/_/g, " ")}</p>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="item_adder">
          <p>Selected: <strong>{selectedItem.replace(/_/g, " ")}</strong></p>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="border p-2 rounded-md w-full mb-2"
          />
          <button className="btn btn-primary" onClick={handleAddItem}>
            Add to inventory
          </button>
        </div>
      )}
    </>
  );
};