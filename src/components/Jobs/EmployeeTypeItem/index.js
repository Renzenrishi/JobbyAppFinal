import './index.css'

const EmployeeRangeItem = props => {
  const {details, setEmpRange} = props

  const {employmentTypeId, label} = details

  const changeEmployeeRange = () => {
    setEmpRange(employmentTypeId)
  }

  return (
    <>
      <li className="employ-list-item" key={employmentTypeId}>
        <input
          type="checkbox"
          value={employmentTypeId}
          id={employmentTypeId}
          className="employment-input-box"
          onChange={changeEmployeeRange}
        />
        <label htmlFor={employmentTypeId}>{label}</label>
      </li>
    </>
  )
}

export default EmployeeRangeItem
