const SkillsItem = props => {
  const {details} = props
  const {imageUrl, name} = details

  return (
    <>
      <li className="skill-list-item">
        <img src={imageUrl} alt={name} className="skill-image" />
        <p>{name}</p>
      </li>
    </>
  )
}

export default SkillsItem
