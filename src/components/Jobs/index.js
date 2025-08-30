import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobItem from '../JobItem'
import FilterTypeAndSalary from '../FilterTypeAndSalary'
import Profile from '../Profile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    employmentType: [],
    salaryRange: salaryRangesList[0].salaryRangeId,
    searchInput: '',
    employmentList: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getEmploymentData()
  }

  getEmploymentData = async () => {
    console.log('function reached')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {employmentType, salaryRange, searchInput} = this.state
    const queryParameter = `?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const apiUrl = `https://apis.ccbp.in/jobs${queryParameter}`
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      console.log(updatedData)
      this.setState({
        employmentList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickIconButton = () => {
    this.getEmploymentData()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeEmploymetType = type => {
    this.setState({employmentType: type}, this.getEmploymentData)
  }

  onChangeSalaryRange = salaryRange => {
    this.setState({salaryRange}, this.getEmploymentData)
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.getEmploymentData}
      >
        Retry
      </button>
    </div>
  )

  renderJobsListView = () => {
    const {employmentList} = this.state
    const shouldShowProductsList = employmentList.length > 0

    return shouldShowProductsList ? (
      <div className="employment-container">
        <ul className="employment-list">
          {employmentList.map(eachEmployment => (
            <JobItem employmentData={eachEmployment} key={eachEmployment.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-job-heading">No Jobs Found</h1>
        <p className="no-job-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderEmployment = () => {
    console.log('hi')
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, employmentType} = this.state
    console.log(employmentType)
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-filter-container">
            <Profile />
            <FilterTypeAndSalary
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              onChangeEmploymetType={this.onChangeEmploymetType}
              onChangeSalaryRange={this.onChangeSalaryRange}
            />
          </div>
          <div className="search-jobs-container">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                onChange={this.onChangeSearchInput}
                value={searchInput}
                placeholder="Search"
              />
              <button
                className="button"
                data-testid="searchButton"
                type="button"
                onClick={this.getEmploymentData}
              >
                <BsSearch size="20" color="#cbd5e1" />
              </button>
            </div>
            {console.log('hello')}
            {this.renderEmployment()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
