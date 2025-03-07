import { useNavigate } from "react-router-dom"

export const FarmingPage = () => {
  
  const navigate = useNavigate();

  const handleClickAdd = () => {

    return navigate('/characteradder');
    
  }

  return (
    <div>
      <h3 className="text-center mt-3 mb-5">Welcome to zzzEzFarm, the best place to organize your ZZZ Farming</h3>
      <h4>To get started add a character...</h4>
      <button className="btn btn-primary" onClick={handleClickAdd}>Add <i className="fas fa-add mr-5"></i></button>
    </div>
  )
}
