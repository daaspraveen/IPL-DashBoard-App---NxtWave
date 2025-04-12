// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {isloading: true, teamCardData: []}

  componentDidMount() {
    this.fetchTeamCardApi()
  }

  fetchTeamCardApi = async () => {
    const callingApi = await fetch('https://apis.ccbp.in/ipl')
    const response = await callingApi.json()
    // console.log('response : ', response)
    const formattedData = response.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      imageUrl: eachItem.team_image_url,
    }))
    // console.log('formattedData ', formattedData)
    this.setState({teamCardData: formattedData, isloading: false})
  }

  render() {
    const {isloading, teamCardData} = this.state
    // console.log(teamCardData[0])
    return (
      <div className="main-container">
        {isloading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#fff" width={50} height={50} />
          </div>
        ) : (
          <div className="home-container">
            <div className="logo-box">
              <img
                className="logo-img"
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl logo"
                width="100px"
              />
              <h1 className="main-heading">IPL Dashboard</h1>
            </div>
            <ul className="teamcard-ul-box">
              {teamCardData.map(eachItem => (
                <TeamCard key={eachItem.id} teamCardDetails={eachItem} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Home
