import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBagFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobItem: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        title: fetchedData.job_details.title,
        skills: fetchedData.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: fetchedData.job_details.life_at_company.description,
          imageUrl: fetchedData.job_details.life_at_company.image_url,
        },
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        similarJobs: fetchedData.similar_jobs.map(eachSimilar => ({
          companyLogoUrl: eachSimilar.company_logo_url,
          employmentType: eachSimilar.employment_type,
          id: eachSimilar.id,
          jobDescription: eachSimilar.job_description,
          location: eachSimilar.location,
          rating: eachSimilar.rating,
          title: eachSimilar.title,
        })),
      }
      console.log(updatedData)
      this.setState({
        jobItem: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="jd-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jd-jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jd-jobs-failure-img"
      />
      <h1 className="jd-jobs-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="jd-jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="jd-retry-button"
        type="button"
        onClick={this.getJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemDetailsPage = () => {
    const {jobItem} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      title,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      similarJobs,
    } = jobItem

    return (
      <div className="container">
        <div className="jd-jobitem-container">
          <div className="jd-logo-title-container">
            <img
              className="jd-company-logo"
              alt="job details company logo"
              src={companyLogoUrl}
            />
            <div className="jd-name-rating-container">
              <h1 className="jd-company-name">{title}</h1>
              <div className="jd-rating-container">
                <FaStar size="20" color="#fbbf24" />
                <p className="jd-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="jd-location-salary-container">
            <div className="jd-icon-type-container">
              <div className="jd-location-type-card-container">
                <MdLocationOn size="20" color="#cbd5e1" />
                <p className="jd-loc-type-text">{location}</p>
              </div>
              <div className="jd-location-type-card-container">
                <BsBagFill size="20" color="#cbd5e1" />
                <p className="jd-loc-type-text">{employmentType}</p>
              </div>
            </div>
            <div>
              <p className="jd-salary">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="jd-seperator" />
          <div className="jd-description-link-container">
            <h4 className="jd-description-heading">Description</h4>
            <div className="jd-company-url-container">
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className="jd-visit-link"
              >
                <p className="jd-visit">Visit</p>{' '}
                <FaExternalLinkAlt size="15" color="#4f46e5" />
              </a>
            </div>
          </div>

          <p className="jd-description">{jobDescription}</p>
          <h4 className="jd-description-heading">Skills</h4>
          <ul className="jd-skill-list-container">
            {skills.map(eachSkill => (
              <li key={eachSkill.name} className="jd-link-item">
                <img
                  className="jd-skill-pic"
                  alt={eachSkill.name}
                  src={eachSkill.imageUrl}
                />
                <p className="jd-skill-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h4 className="jd-description-heading">Life at Company</h4>
          <div className="life-at-company-container">
            <p className="jd-life-at-company">{lifeAtCompany.description}</p>
            <img
              className="life-at-pic"
              alt="life at company"
              src={lifeAtCompany.imageUrl}
            />
          </div>
        </div>
        <h4 className="jd-description-heading">Similar Jobs</h4>
        <ul className="similar-list-container">
          {similarJobs.map(eachSimilar => (
            <li key={eachSimilar.id} className="similar-container">
              <div className="sm-jd-logo-title-container">
                <img
                  className="sm-jd-company-logo"
                  alt="similar job company logo"
                  src={eachSimilar.companyLogoUrl}
                />
                <div className="sm-jd-name-rating-container">
                  <h1 className="sm-jd-company-name">{eachSimilar.title}</h1>
                  <div className="sm-jd-rating-container">
                    <FaStar size="20" color="#fbbf24" />
                    <p className="sm-jd-rating">{eachSimilar.rating}</p>
                  </div>
                </div>
              </div>
              <h4 className="sm-jd-description-heading">Description</h4>
              <p className="sm-jd-description">{eachSimilar.jobDescription}</p>
              <div className="sm-jd-icon-type-container">
                <div className="sm-jd-location-type-card-container">
                  <MdLocationOn size="20" color="#cbd5e1" />
                  <p className="sm-jd-loc-type-text">{eachSimilar.location}</p>
                </div>
                <div className="sm-jd-location-type-card-container">
                  <BsBagFill size="20" color="#cbd5e1" />
                  <p className="sm-jd-loc-type-text">
                    {eachSimilar.employmentType}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderJobItem = () => {
    console.log('hi')
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetailsPage()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">{this.renderJobItem()}</div>
      </>
    )
  }
}

export default JobItemDetails
