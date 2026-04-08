import React from 'react';
import TeamCard from './TeamCard/TeamCard';
import './TeamList.css';

function TeamList({ teams, onSelectTeam }) {
  return (
    <div className="team-list-container">
      <h2>Select a Team</h2>
      <div className="team-grid">
        {teams.map(team => (
          <TeamCard 
            key={team.id} 
            team={team} 
            onClick={() => onSelectTeam(team)} 
          />
        ))}
      </div>
    </div>
  );
}

export default TeamList;
