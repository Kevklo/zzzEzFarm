import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTotalMaterials } from "../helpers/getTotalMaterials";

import { MaterialCard } from "./MaterialCard";

export const CharacterInfoPage = ({ characterData = {} }) => {
  const { name } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState({
    name: "",
    type: "",
    attribute: "",
    bigImg: "",
  });

  useEffect(() => {
    if (name && characterData[name]) {
      const { type, attribute, images } = characterData[name];
      const bigImg = images.large
      setCharacter({ name, type, attribute, bigImg });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setCharacter({
        name: "Not Found",
        type: "",
        attribute: "",
        bigImg: "",
      });
    }
  }, [name, characterData]);

  const {
    skillMaterials = [],
    promotionMaterials = [],
    coreSkillMaterials = [],
  } = getTotalMaterials(name) || {};

  return isLoading ? (
    <div className="text-center mt-5">Loading...</div>
  ) : (
    <section className="container mt-2 mb-4 rounded shadow">
      <h2 className={`text-center mb-4 ${character.attribute.toLowerCase()}-card-header`}>
        {character.name.toUpperCase()[0] + character.name.slice(1)}
      </h2>

      <div className="row align-items-center">
        {character.bigImg && (
          <div className="col-12 col-md-5 text-center mb-4 mb-md-0">
            <img
              src={character.bigImg}
              alt={character.name}
              className="img-fluid"
              draggable="false"
            />
          </div>
        )}

        <div className="col-12 col-md-7">
          <div className="mb-3">
            <span className={`badge ${character.type.toLowerCase()} me-2 text-capitalize`}>
              Type: {character.type}
            </span>
            <span className={`badge ${character.attribute.toLowerCase()} text-capitalize`}>
              Attribute: {character.attribute}
            </span>
          </div>

          <div className="row g-3">
            <MaterialCard title="Promotion Materials" materials={promotionMaterials} />
            <MaterialCard title="Core Skill Materials" materials={coreSkillMaterials} />
            <MaterialCard title="Talent Level-up Materials" materials={skillMaterials} />
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <Link to="/charactergrid">
          <button className="btn btn-warning mb-3">Back</button>
        </Link>
      </div>
    </section>
  );
};