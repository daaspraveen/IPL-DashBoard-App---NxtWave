// Write your code here
import {Component} from 'react'
import {PieChart, Pie, Legend, Cell} from 'recharts'
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
    if (callingTeamMatchesApi.ok) {
      const response = await callingTeamMatchesApi.json()
      // console.log(response)
      this.setState({teamMatchData: response, isLoading: false})
    }
  }

  doBackPage = () => {
    // console.log('clicked back btn')
    const {history} = this.props
    history.push('/')
  }

  renderStats = () => {
    // console.log('in stats')
    const {teamMatchData} = this.state

    if (!teamMatchData && !teamMatchData.recent_matches) return null
    const totalMatchPlayInfo = [
      {
        name: 'Won',
        value: 0,
      },
      {
        name: 'Lost',
        value: 0,
      },
      {
        name: 'Drawn',
        value: 0,
      },
    ]
    teamMatchData.recent_matches.forEach(eachMatch => {
      if (eachMatch.match_status === 'Won') {
        totalMatchPlayInfo[0].value += 1
      } else if (eachMatch.match_status === 'Lost') {
        totalMatchPlayInfo[1].value += 1
      } else {
        totalMatchPlayInfo[2].value += 1
      }
    })
    // console.log('totalMatchPlayInfo : ', totalMatchPlayInfo)
    const pieColors = ['seagreen', 'orangered', 'blue']
    // const renderCustomLabel = ({name, value}) => `${name}: ${value}`
    return (
      <div className="pie-container" data-testid="team-pie-chart">
        <h3>Statistics</h3>
        <PieChart width={600} height={300}>
          <Pie
            data={totalMatchPlayInfo}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            labelLine={false}
            label
          >
            {totalMatchPlayInfo.map(each => (
              <Cell
                key={`cell-${each.name}`} // ✅ Use unique name as key
                fill={
                  pieColors[
                    totalMatchPlayInfo.findIndex(
                      info => info.name === each.name,
                    ) % pieColors.length
                  ]
                }
              />
            ))}
          </Pie>
          <Legend
            layout="horizontal"
            data-testid="pie-chart-legend"
            verticalAlign="bottom"
            align="center"
            iconType="square"
            iconSize={10}
          />
        </PieChart>
      </div>
    )
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
            <button type="button" onClick={this.doBackPage}>
              Back
            </button>
            <img
              className="team-banner-img"
              src={teamBannerImgUrl}
              alt="team banner"
            />
            {this.renderStats()}
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
