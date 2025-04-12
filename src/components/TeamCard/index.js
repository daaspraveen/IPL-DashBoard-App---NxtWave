// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamCardDetails} = props
  return (
    <Link className="teamcard-link" to={`/team-matches/${teamCardDetails.id}`}>
      <li className="teamcard-li-card">
        <img
          className="teamcard-li-img"
          src={teamCardDetails.imageUrl}
          alt={teamCardDetails.name}
        />
        <p className="teamcard-li-name">{teamCardDetails.name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
