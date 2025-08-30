import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBagFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {employmentData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = employmentData

  return (
    <div className="jobitem-container">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="logo-title-container">
          <img
            className="company-logo"
            alt="company logo"
            src={companyLogoUrl}
          />
          <div className="name-rating-container">
            <h1 className="company-name">{title}</h1>
            <div className="rating-container">
              <FaStar size="20" color="#fbbf24" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-salary-container">
          <div className="icon-type-container">
            <div className="location-type-card-container">
              <MdLocationOn size="20" color="#cbd5e1" />
              <p className="loc-type-text">{location}</p>
            </div>
            <div className="location-type-card-container">
              <BsBagFill size="20" color="#cbd5e1" />
              <p className="loc-type-text">{employmentType}</p>
            </div>
          </div>
          <div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="seperator" />
        <h4 className="description-heading">Description</h4>
        <p className="description">{jobDescription}</p>
      </Link>
    </div>
  )
}

export default JobItem
