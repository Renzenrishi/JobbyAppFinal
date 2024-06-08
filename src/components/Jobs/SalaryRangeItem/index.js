import './index.css'

const SalaryRangeItem = props => {
  const {details, setSalaryRange} = props
  const {salaryRangeId, label} = details

  const changeSalaryRange = () => {
    setSalaryRange(salaryRangeId)
  }

  return (
    <>
      <li className="salary-list-item" key={salaryRangeId}>
        <input
          type="radio"
          value={salaryRangeId}
          id={salaryRangeId}
          name="salary"
          className="salary-input-box"
          onChange={changeSalaryRange}
        />
        <label htmlFor={salaryRangeId}>{label}</label>
      </li>
    </>
  )
}

export default SalaryRangeItem
