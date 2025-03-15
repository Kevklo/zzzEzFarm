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
      <div className="row">
        <div className="col-1"/>
          {talents.map((level, index) => (
           <div key={index} className="col-2 text-center">
            <button onClick={() => handleTalentLevelUp(index) }><p>{level}</p></button>
           </div> 
          ))
          }
        <div className="col-1"/>
      </div>
    </div>
  );

}