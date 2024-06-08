import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import SalaryRangeItem from './SalaryRangeItem'

import EmployeeRangeItem from './EmployeeTypeItem'

import JobItem from '../JobItem'

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
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
  initial: 'INITIAL',
}

class Jobs extends Component {
  state = {
    profileApiStatus: apiStatusConstants.initial,
    profileData: '',
    jobsData: [],
    jobsApiStatus: apiStatusConstants.initial,
    employmentType: [],
    salaryRange: '',
    searchInputVal: '',
    search: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsData()
  }

  setSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobsData)
  }

  setEmpRange = id => {
    const {employmentType} = this.state

    if (employmentType.includes(id)) {
      this.setState(
        prevState => ({
          employmentType: prevState.employmentType.filter(type => type !== id),
        }),
        this.getJobsData,
      )
    } else {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, id],
        }),
        this.getJobsData,
      )
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInputVal: event.target.value})
  }

  getSearchResult = () => {
    const {searchInputVal} = this.state
    this.setState({search: searchInputVal}, this.getJobsData)
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getSearchResult()
    }
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.isLoading})

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)

    if (response.ok) {
      const stringifyResponse = await response.json()

      const data = stringifyResponse.profile_details

      const updatedData = {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }

      this.setState({
        profileApiStatus: apiStatusConstants.success,
        profileData: updatedData,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  getJobsData = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.isLoading})

    const {employmentType, salaryRange, search} = this.state

    const stringifiedEmpRange = employmentType.join(',')

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const url = `https://apis.ccbp.in/jobs?employment_type=${stringifiedEmpRange}&minimum_package=${salaryRange}&search=${search}`

    const responseX = await fetch(url, options)

    if (responseX.ok) {
      const dataX = await responseX.json()
      const jobsList = dataX.jobs

      const updatedJobsList = jobsList.map(jobItem => ({
        companyLogoUrl: jobItem.company_logo_url,
        employmentType: jobItem.employment_type,
        id: jobItem.id,
        jobDescription: jobItem.job_description,
        location: jobItem.location,
        packagePerAnnum: jobItem.package_per_annum,
        rating: jobItem.rating,
        title: jobItem.title,
      }))

      this.setState({
        jobsApiStatus: apiStatusConstants.success,
        jobsData: updatedJobsList,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileContainer = () => {
    const {profileData} = this.state

    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureProfile = () => (
    <div className="failure-profile-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderProfileApiStatus = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case 'SUCCESS':
        return this.renderProfileContainer()
      case 'FAILURE':
        return this.renderFailureProfile()
      default:
        return this.renderLoadingView()
    }
  }

  renderEmploymentTypesList = () => (
    <div className="employment-container">
      <h1>Type of Employment</h1>
      <ul className="employment-list-container">
        {employmentTypesList.map(eachItem => (
          <EmployeeRangeItem
            details={eachItem}
            key={eachItem.employmentTypeId}
            setEmpRange={this.setEmpRange}
          />
        ))}
      </ul>
    </div>
  )

  renderSalaryRange = () => (
    <div className="employment-container">
      <h1>Salary Range</h1>
      <ul className="employment-list-container">
        {salaryRangesList.map(eachItem => (
          <SalaryRangeItem
            details={eachItem}
            key={eachItem.salaryRangeId}
            setSalaryRange={this.setSalaryRange}
          />
        ))}
      </ul>
    </div>
  )

  renderJobs = () => {
    const {jobsData} = this.state

    return (
      <ul className="jobs-container">
        {jobsData.map(eachJob => (
          <JobItem jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderNoJobs = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1>No Jobs Found</h1>
      <p className="no-jobs-desc">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsItemsList = () => {
    const {jobsData} = this.state

    const renderJobs =
      jobsData.length > 0 ? this.renderJobs() : this.renderNoJobs()

    return renderJobs
  }

  renderFailureJobsView = () => (
    <div className="failure-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="retry-button" onClick={this.getJobsData}>
        Retry
      </button>
    </div>
  )

  renderJobsApiStatus = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case 'SUCCESS':
        return this.renderJobsItemsList()
      case 'FAILURE':
        return this.renderFailureJobsView()
      default:
        return this.renderLoadingView()
    }
  }

  render() {
    return (
      <div className="jobs-page">
        <Header />
        <div className="jobs-page-container">
          <div className="section-1">
            {this.renderProfileApiStatus()}
            <hr className="line" />
            {this.renderEmploymentTypesList()}
            <hr className="line" />
            {this.renderSalaryRange()}
          </div>
          <div className="section-2">
            <div className="search-container">
              <input
                type="search"
                className="search-bar"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                className="search-button"
                data-testid="searchButton"
                onClick={this.getSearchResult}
              >
                {/* eslint-disable-next-line */}
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsApiStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
