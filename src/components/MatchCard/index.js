// Write your code here
import './index.css'

const MatchCard = props => {
  const {recentMatchesList} = props
  const wonOrLost = recentMatchesList.match_status
  const imgStyle =
    recentMatchesList.competing_team.includes('Kolkata') ||
    recentMatchesList.competing_team.includes('Royal') ||
    recentMatchesList.competing_team.includes('Delhi') ||
    recentMatchesList.competing_team.includes('Punjab')
      ? 'w-80'
      : ''
  return (
    <li className="recent-matches-li-card">
      <div className="recent-img-box">
        <img
          className={`recent-match-img ${imgStyle}`}
          src={recentMatchesList.competing_team_logo}
          alt={`competing team ${recentMatchesList.competing_team}`}
        />
      </div>
      <p className="recent-match-team-name">
        {recentMatchesList.competing_team}
      </p>
      <p className="recent-match-team-result">{recentMatchesList.result}</p>
      <p className={`recent-match-status recent-team-${wonOrLost}`}>
        {recentMatchesList.match_status}
      </p>
    </li>
  )
}

export default MatchCard
