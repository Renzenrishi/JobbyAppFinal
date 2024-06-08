import './index.css'

import Cookies from 'js-cookie'

import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const goToJobsPage = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <div className="home-page-container">
      <Header />
      <div className="home-page-content">
        <h1 className="home-page-heading">Find The Job That Fits Your Life</h1>
        <p className="home-para-desc">
          Millions of people are searching for jobs, salary information,company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button
            type="button"
            className="logout-button"
            onClick={goToJobsPage}
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
