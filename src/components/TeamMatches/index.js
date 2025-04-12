// Write your code here
import {Component} from 'react'
import Loading from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {isLoading: true, teamMatchData: []}

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    this.fetchTeamMatchApi(id)
  }

  fetchTeamMatchApi = async id => {
    // console.log('in fetched teamMatch api')
    const api = `https://apis.ccbp.in/ipl/${id}`
    const callingTeamMatchesApi = await fetch(api)
    const response = await callingTeamMatchesApi.json()
    // console.log(response)
    this.setState({teamMatchData: response, isLoading: false})
  }

  render() {
    const {isLoading, teamMatchData} = this.state
    // console.log(isLoading, teamMatchData)
    const teamBannerImgUrl = teamMatchData.team_banner_url
    const latestMatchDetails = teamMatchData.latest_match_details
    const recentMatches = teamMatchData.recent_matches
    // console.log(latestMatchDetails, recentMatches)
    return (
      <div className="teamMatch-Container">
        {isLoading ? (
          <div className="loading-container" data-testid="loader">
            <Loading type="Oval" color="#fff" width={50} height={50} />
          </div>
        ) : (
          <div className="teamMatch-main-card">
            <img
              className="team-banner-img"
              src={teamBannerImgUrl}
              alt="team banner"
            />
            <p className="latest-match-subpara">Latest Matches</p>
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul className="recent-matches-ul-box">
              {recentMatches.map(eachItem => (
                <MatchCard key={eachItem.id} recentMatchesList={eachItem} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
