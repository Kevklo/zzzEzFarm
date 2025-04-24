import { useSelector } from "react-redux";

export const MaterialCard = ({ title, materials }) => {
  const { items: itemsData } = useSelector((state) => state.apiData);

  const formatName = (name) => name.replace(/_/g, " ");

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div 
        className="card h-100 shadow-sm" 
        style={{ backgroundColor: "#212121", color: "white" }}
      >
        <div className="card-body">
          <h5 className="card-title text-center">{title}</h5>
          <ul className="list-unstyled mt-3">
            {materials?.length > 0 ? (
              materials.map((mat) => {
                const item = itemsData.find(i => i.name === mat.name);
                const imageUrl = item?.imageUrl;

                return (
                  <li
                    key={`${title}-${mat.name}`}
                    className="d-flex align-items-center justify-content-between mb-2"
                  >
                    <span className="flex-grow-1 me-2">
                      {formatName(mat.name)} — {mat.amount || 0}
                    </span>
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={formatName(mat.name)}
                        className="rounded"
                        style={{ 
                          width: "32px", 
                          height: "32px", 
                          objectFit: "contain" 
                        }}
                        title={formatName(mat.name)}
                        loading="lazy"
                      />
                    )}
                  </li>
                );
              })
            ) : (
              <li className="text-muted">No materials available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
