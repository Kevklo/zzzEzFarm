export const TalentsDisplay = ( {talents, handleTalentLevelUp} ) => {

  const talentNames = ["Basic Attack", "Dodge", "Assist", "Special Attack", "Chain Attack"];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-1" />
        {talentNames.map((name, index) => (
          <div key={name} className="col-2">
            <p className="row-12">{name}</p>
          </div>
        ))}
        <div className="col-1" />
      </div>
      <div className="row mb-3">
        <div className="col-1"/>
          {talents.map((level, index) => (
           <div key={index} className="col-2 text-center">
            <button disabled={level == 12} onClick={() => handleTalentLevelUp(index) } className="btn">{level}</button>
           </div> 
          ))
          }
        <div className="col-1"/>
      </div>
    </div>
  );

}