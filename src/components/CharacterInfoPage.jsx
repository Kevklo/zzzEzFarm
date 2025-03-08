import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const CharacterInfoPage = ({chars = {}}) => {
  const { name } = useParams(); // Obtener el nombre del personaje desde la URL
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState({
    name: "",
    type: "",
    attribute: "",
    bigImg: "",
    ascensionMaterials: [],
    coreSkillMaterials: [],
    talentMaterials: [],
  });

  useEffect(() => {
    if (name && chars[name]) {
      const { type, attribute, bigImg, ascensionMaterials, coreSkillMaterials, talentMaterials } = chars[name];
      setCharacter({ name, type, attribute, bigImg, ascensionMaterials, coreSkillMaterials, talentMaterials });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setCharacter({ name: "Not Found", type: "", attribute: "", bigImg: "", ascensionMaterials: [], coreSkillMaterials: [], talentMaterials: [] });
    }
  }, [name]); // Dependemos de `name` para cuando cambie la URL

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section>
      <h2>{character.name.toUpperCase()[0] + character.name.slice(1)}</h2>

      <div className="d-flex flex-row justify-content-around align-items-center position-relative">
        {character.bigImg && (
          <img className="big_img mx-3" src={character.bigImg} alt={character.name} draggable="false" />
        )}

        <div className="char-info-grid">
          <div className={`type ${character.type}`}>Type: {character.type}</div>
          <div className={`attribute ${character.attribute}`}>Attribute: {character.attribute}</div>

          <div className="materials">
            <h5>Ascension Materials</h5>
            <ul>
              {character.ascensionMaterials.length > 0 ? (
                character.ascensionMaterials.map((item, index) => (
                  <li key={`asc-${index}`}>{item}</li>
                ))
              ) : (
                <li>No materials available</li>
              )}
            </ul>
          </div>

          <div className="materials">
            <h5>Core Skill Materials</h5>
            <ul>
              {character.coreSkillMaterials.length > 0 ? (
                character.coreSkillMaterials.map((item, index) => (
                  <li key={`core-${index}`}>{item}</li>
                ))
              ) : (
                <li>No materials available</li>
              )}
            </ul>
          </div>

          <div className="talent_materials materials">
            <h5>Talent Level-up Materials</h5>
            <ul>
              {character.talentMaterials.length > 0 ? (
                character.talentMaterials.map((item, index) => (
                  <li key={`talent-${index}`}>{item}</li>
                ))
              ) : (
                <li>No materials available</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <Link to="/charactergrid">
        <button className="btn btn-primary mt-5">Back</button>
      </Link>
    </section>
  );
};