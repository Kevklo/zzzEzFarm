import { useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { addExp, removeItems } from "../store/inventory/inventorySlice";
import { useDispatch, useSelector } from "react-redux";
import { itemsData } from "../mock/itemsData";

export function useHandleLevelUp() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.inventory);

  const [SIL_count, setSILCount] = useState(0);

  useEffect(() => {
    setSILCount(items["Senior_Investigator_Log"]?.amount || 0);
  }, [items]);

  const handleLevelUp = useCallback((name) => {
    const { img: SIL_img } = itemsData["Senior_Investigator_Log"];

    if (SIL_count <= 0) {
      Swal.fire({
        icon: "error",
        title: "No Senior Investigator Logs available!",
        text: "You need at least 1 to level up a character.",
      });
      return;
    }

    Swal.fire({
      title: `You have ${SIL_count} Senior Investigator Logs`,
      text: "How many do you want to use?",
      input: "number",
      inputAttributes: { min: "1", max: `${SIL_count}`, step: "1" },
      showCancelButton: true,
      showLoaderOnConfirm: true,
      imageUrl: SIL_img,
      imageWidth: 150,
      imageHeight: 150,
      preConfirm: (amount) => {
        const expAmount = parseInt(amount, 10) * 3000;

        if (isNaN(expAmount) || expAmount <= 0) {
          return Swal.showValidationMessage("Enter a valid number.");
        }
        if (parseInt(amount, 10) > SIL_count) {
          return Swal.showValidationMessage("Not enough Senior Investigator Logs!");
        }

        dispatch(addExp({ expAmount, name }));
        dispatch(removeItems({ amount, name: "Senior_Investigator_Log" }))
      },
    });
  }, [SIL_count, dispatch]);

  return { handleLevelUp };
};