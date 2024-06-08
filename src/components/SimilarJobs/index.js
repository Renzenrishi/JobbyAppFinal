import './index.css'

import {FaStar} from 'react-icons/fa'

import {IoLocationSharp} from 'react-icons/io5'

import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobs = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details

  return (
    <>
      <li className="similar-job-list-item">
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
        <div className="desc-container">
          <h1 className="font-size-reduce">Description</h1>
          <p>{jobDescription}</p>
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
      </li>
    </>
  )
}

export default SimilarJobs
