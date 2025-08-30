import './index.css'

const typeList = []

const FilterTypeAndSalary = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    onChangeEmploymetType,
    onChangeSalaryRange,
  } = props

  const onChangeEmploymetTypeFunction = event => {
    if (event.target.checked === true) {
      typeList.push(event.target.value)
      onChangeEmploymetType(typeList)
    } else {
      const index = typeList.indexOf(event.target.value)

      typeList.splice(index, 1)

      onChangeEmploymetType(typeList)
    }
    console.log(typeList)
  }
  console.log(typeList)
  const onChangeSalaryRangeFunction = event => {
    if (event.target.checked === true) {
      onChangeSalaryRange(event.target.value)
    }
  }

  return (
    <>
      <hr className="seperator" />
      <h1 className="sub-heading">Type of Employment</h1>
      <ul className="type-list">
        {employmentTypesList.map(eachtype => (
          <li className="list-item" key={eachtype.employmentTypeId}>
            <input
              className="checkbox-input"
              id={eachtype.employmentTypeId}
              type="checkbox"
              value={eachtype.employmentTypeId}
              onChange={onChangeEmploymetTypeFunction}
            />
            <label className="input-label" htmlFor={eachtype.employmentTypeId}>
              {eachtype.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="seperator" />
      <h1 className="sub-heading">Salary Range</h1>
      <ul className="type-list">
        {salaryRangesList.map(eachSalary => (
          <li className="list-item" key={eachSalary.salaryRangeId}>
            <input
              className="checkbox-input"
              id={eachSalary.salaryRangeId}
              type="radio"
              name="salary"
              value={eachSalary.salaryRangeId}
              onChange={onChangeSalaryRangeFunction}
            />
            <label className="input-label" htmlFor={eachSalary.salaryRangeId}>
              {eachSalary.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )
}

export default FilterTypeAndSalary
