import React from 'react';
import './TeamCard.css';

function TeamCard({ team, onClick }) {
  // Use the API color if available, otherwise default to black
  const borderColor = team.color || '#000';

  return (
    <div 
      className="team-card" 
      onClick={onClick} 
      style={{ borderLeft: `8px solid ${borderColor}` }}
    >
      <div className="team-card-content">
        <img 
          src={team.badge} 
          alt={`${team.name} logo`} 
          className="team-logo" 
        />
        <div className="team-info">
          <h3>{team.name}</h3>
          <p className="league-label">{team.league}</p>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;