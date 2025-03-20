export const OwnedItemCard = ({item, handleOnClick}) => {

  const { name, img, amount } = item;

  return (
    <button onClick={ handleOnClick } className="character-card">
      <div>
        <p>{ name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, " ") }</p>
        <p>amount: {amount}</p>
        <img src={img} draggable='false' alt={name} />
      </div>
    </button>
  )
}