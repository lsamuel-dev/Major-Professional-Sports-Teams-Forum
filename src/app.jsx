import React, { useState, useEffect } from 'react';
import './App.css';
import TeamList from './components/TeamList/TeamList';
import ForumThread from './components/ForumThread/ForumThread';

function App() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allComments, setAllComments] = useState({});

  useEffect(() => {
    const fetchLeagues = async () => {
      setLoading(true);
      try {
        const leagues = ['NFL', 'NBA', 'MLB', 'NHL'];
        const fetchPromises = leagues.map(league => 
          fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${league}`)
            .then(res => res.json())
        );

        const results = await Promise.all(fetchPromises);

        const combinedTeams = results.flatMap(data => {
          return data.teams ? data.teams.map(t => ({
            id: t.idTeam,
            name: t.strTeam,
            league: t.strLeague,
            badge: t.strBadge,
            color: "#000"
          })) : [];
        });

        setTeams(combinedTeams);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  const addComment = (teamId, newComment) => {
    const teamComments = allComments[teamId] || [];
    setAllComments({
      ...allComments,
      [teamId]: [...teamComments, { id: Date.now(), ...newComment }]
    });
  };

  const deleteComment = (teamId, commentId) => {
    const teamComments = allComments[teamId] || [];
    setAllComments({
      ...allComments,
      [teamId]: teamComments.filter(c => c.id !== commentId)
    });
  };

  return (
    <div className="App">
      <header style={{ 
        padding: '20px', 
        borderBottom: '3px solid #000', 
        textAlign: 'center', 
        backgroundColor: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <h1 style={{ margin: 0, letterSpacing: '2px' }}>MAJOR PROFESSIONAL SPORTS TEAMS FORUM</h1>
      </header>
      
      <main style={{ padding: '20px', minHeight: '80vh' }}>
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '50px', fontWeight: 'bold' }}>
            SCUTTLING THE DATABASE... FETCHING TEAMS...
          </div>
        ) : !selectedTeam ? (
          <TeamList 
            teams={teams} 
            onSelectTeam={setSelectedTeam} 
          />
        ) : (
          <ForumThread 
            team={selectedTeam} 
            comments={allComments[selectedTeam.id] || []} 
            onBack={() => setSelectedTeam(null)}
            onAddComment={(comment) => addComment(selectedTeam.id, comment)}
            onDeleteComment={(commentId) => deleteComment(selectedTeam.id, commentId)}
          />
        )}
      </main>
    </div>
  );
}

export default App;