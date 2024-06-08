import './index.css'
import Loader from 'react-loader-spinner'
import {Component} from 'react'

import Cookies from 'js-cookie'

import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'

import {IoLocationSharp} from 'react-icons/io5'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'

import SimilarJobs from '../SimilarJobs'

import SkillsItem from './SkillsItem'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
  initial: 'INITIAL',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsApiStatus: apiStatusConstants.initial,
    jobDetailsData: '',
    similarJobsData: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({jobDetailsApiStatus: apiStatusConstants.isLoading})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const url = `https://apis.ccbp.in/jobs/${id}`

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs

      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills,
        title: jobDetails.title,
        lifeAtCompany: jobDetails.life_at_company,
      }

      const updatedSimilarJobs = similarJobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobDetailsApiStatus: apiStatusConstants.success,
        jobDetailsData: updatedJobDetails,
        similarJobsData: updatedSimilarJobs,
      })
    } else {
      this.setState({jobDetailsApiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetailsView = () => {
    const {jobDetailsData, similarJobsData} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
      lifeAtCompany,
    } = jobDetailsData

    const jobSkills = skills.map(each => ({
      name: each.name,
      imageUrl: each.image_url,
    }))

    const lifeAtCompanyOBJ = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    }

    return (
      <>
        <div className="job-list-item-details">
          <div className="company-logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
            <div className="company-link">
              <h1>Description</h1>
              <a href={companyWebsiteUrl} className="web-link">
                <span className="visit">Visit</span>
                <FaExternalLinkAlt />
              </a>
            </div>
            <p className="para-font">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h2>Skills</h2>
            <ul className="skills-list-items-container">
              {jobSkills.map(eachItem => (
                <SkillsItem details={eachItem} key={eachItem.name} />
              ))}
            </ul>
            <div className="life-at-company-container">
              <h2>Life at Company</h2>
              <div className="life-at-company-desc">
                <p className="para-font">{lifeAtCompanyOBJ.description}</p>
                <img src={lifeAtCompanyOBJ.imageUrl} alt="life at company" />
              </div>
            </div>
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobsData.map(eachItem => (
            <SimilarJobs details={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  renderFailureJobDetails = () => (
    <div className="failure-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetailsApiStatus = () => {
    const {jobDetailsApiStatus} = this.state

    switch (jobDetailsApiStatus) {
      case 'SUCCESS':
        return this.renderJobDetailsView()
      case 'FAILURE':
        return this.renderFailureJobDetails()
      default:
        return this.renderLoadingView()
    }
  }

  render() {
    return (
      <div className="job-item-details-page">
        <Header />
        <div className="job-item-details-content">
          {this.renderJobItemDetailsApiStatus()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
