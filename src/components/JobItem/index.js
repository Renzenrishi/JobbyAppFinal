import './index.css'

import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'

import {IoLocationSharp} from 'react-icons/io5'

import {BsFillBriefcaseFill} from 'react-icons/bs'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <>
      <Link to={`/jobs/${id}`} className="link-item">
        <li className="job-list-item">
          <div className="company-logo-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="role-container">
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <FaStar fill="#fbbf24" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-desc-container">
            <div className="row">
              <div className="row">
                <IoLocationSharp className="icon" />
                <p className="space-right">{location}</p>
              </div>
              <div className="row">
                <BsFillBriefcaseFill className="icon" />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="desc-container">
            <h1 className="font-size-reduce">Description</h1>
            <p>{jobDescription}</p>
          </div>
        </li>
      </Link>
    </>
  )
}

export default JobItem
