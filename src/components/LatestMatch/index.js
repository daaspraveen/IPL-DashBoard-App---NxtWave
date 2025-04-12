// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  return (
    <div className="latest-matches-card">
      <div className="latest-match-card-box1">
        <p className="competing-team-name">
          {latestMatchDetails.competing_team}
        </p>
        <p className="latest-match-date small-para">
          {latestMatchDetails.date}
        </p>
        <p className="latest-venue small-para">{latestMatchDetails.venue}</p>
        <p className="latest-result small-para">{latestMatchDetails.result}</p>
      </div>
      <img
        className="latest-match-card-img"
        src={latestMatchDetails.competing_team_logo}
        alt={`latest match ${latestMatchDetails.competing_team}`}
      />
      <hr className="latest-hr-line" />
      <div className="latest-match-card-box2">
        <p className="latest-card-right small-para">First Innings</p>
        <p className="latest-card-right x-small-para">
          {latestMatchDetails.first_innings}
        </p>
        <p className="latest-card-right small-para">Second Innings</p>
        <p className="latest-card-right x-small-para">
          {latestMatchDetails.second_innings}
        </p>
        <p className="latest-card-right small-para">Man Of The Match</p>
        <p className="latest-card-right x-small-para">
          {latestMatchDetails.man_of_the_match}
        </p>
        <p className="latest-card-right small-para">Umpires</p>
        <p className="latest-card-right x-small-para">
          {latestMatchDetails.umpires}
        </p>
      </div>
    </div>
  )
}

export default LatestMatch
