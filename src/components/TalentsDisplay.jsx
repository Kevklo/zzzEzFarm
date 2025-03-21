import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

export const TalentsDisplay = ({ talents, handleTalentLevelUp, desiredTalents }) => {

  const talentNames = ["Basic Attack", "Dodge", "Assist", "Special Attack", "Chain Attack"];

  return (
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col d-flex align-items-center justify-content-center"><strong>Talent</strong></div>
        <div className="col d-flex align-items-center justify-content-center"><strong>Current Level</strong></div>
        <div className="col d-flex align-items-center justify-content-center"><strong>Desired Level</strong></div>
        <div className="col text-center"></div>
      </div>


    {talentNames.map((name, index) => (
      <div key={name} className="row mb-2">
        <div className="col-3 d-flex align-items-center justify-content-center">
          <p className="m-0">{name}</p>
        </div>
        <div className="col-3 d-flex align-items-center justify-content-center">
          <button onClick={() => handleTalentLevelUp(index)} type="button" className="talent-button">
            {talents[index]}
          </button>
        </div>
        <div className="col-3 d-flex align-items-center justify-content-center">
          <span>{desiredTalents[index] || "Not set"}</span>
        </div>
        <div className="col-3 d-flex align-items-center justify-content-center">
          {desiredTalents[index] <= talents[index] ? (
            <FaCheckSquare color="orange" />
          ) : (
            <FaRegSquare color="orange" />
          )}
        </div>
      </div>
    ))}
    </div>
  );
};