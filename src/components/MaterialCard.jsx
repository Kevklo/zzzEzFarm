import { itemsData } from "../mock/itemsData";

export const MaterialCard = ({ title, materials }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-center">{title}</h5>
          <ul className="list-unstyled mt-3">
            {materials.length > 0 ? (
              materials.map((mat, index) => (
                <li
                  key={`${title}-${index}`}
                  className="d-flex align-items-center justify-content-between mb-2"
                >
                  <span className="flex-grow-1 me-2">
                    {mat.name.replace(/_/g, " ")} — {mat.amount}
                  </span>
                  {itemsData[mat.name]?.img && (
                    <img
                      src={itemsData[mat.name].img}
                      alt={mat.name}
                      className="rounded"
                      style={{ width: "32px", height: "32px", objectFit: "contain" }}
                      title={mat.name.replace(/_/g, " ")}
                    />
                  )}
                </li>
              ))
            ) : (
              <li className="text-muted">No materials available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
