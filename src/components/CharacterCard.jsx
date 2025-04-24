export const CharacterCard = ({character, handleOnClick}) => {
  const { name, attribute, type, images } = character;
  return (
    <button onClick={ handleOnClick } className="character-card">
      <div>
        <p>{ name.charAt(0).toUpperCase() + name.slice(1) }</p>
        <img draggable='false' src={ images.small } alt={name} />
      </div>
    </button>

  )
}
