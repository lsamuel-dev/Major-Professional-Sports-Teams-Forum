import React, { useState, useEffect } from 'react';
import './App.css';
import TeamList from './components/TeamList/TeamList';
import ForumThread from './components/ForumThread/ForumThread';
import Login from './components/Login/Login';

function App() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Initialize user session from LocalStorage
  const [user, setUser] = useState(() => {
    return localStorage.getItem('forum_user') || null;
  });

  // 2. Initialize all forum comments from LocalStorage
  const [allComments, setAllComments] = useState(() => {
    const saved = localStorage.getItem('forum_comments');
    return saved ? JSON.parse(saved) : {};
  });

  // 3. PERSISTENCE: Sync User session to LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('forum_user', user);
    } else {
      localStorage.removeItem('forum_user');
    }
  }, [user]);

  // 4. PERSISTENCE: Sync Comments to LocalStorage
  useEffect(() => {
    localStorage.setItem('forum_comments', JSON.stringify(allComments));
  }, [allComments]);

  // 5. API FETCH: Get teams for NFL, NBA, MLB, and NHL
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
        console.error("Critical API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  // 6. CRUD: Add Comment with Author Tagging
  const addComment = (teamId, commentText) => {
    const teamComments = allComments[teamId] || [];
    const newComment = {
      id: Date.now(),
      text: commentText,
      author: user, // Tags the post with the logged-in username
      timestamp: new Date().toLocaleString()
    };

    setAllComments({
      ...allComments,
      [teamId]: [...teamComments, newComment]
    });
  };

  // 7. CRUD: Delete Comment
  const deleteComment = (teamId, commentId) => {
    const teamComments = allComments[teamId] || [];
    setAllComments({
      ...allComments,
      [teamId]: teamComments.filter(c => c.id !== commentId)
    });
  };

  return (
    <div className="App">
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <>
          <header style={{ 
            padding: '20px', 
            borderBottom: '3px solid #000', 
            textAlign: 'center', 
            backgroundColor: '#fff',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ width: '100px' }}></div> 
            <h1 style={{ margin: 0, letterSpacing: '2px', fontSize: '1.2rem' }}>
              MAJOR PROFESSIONAL SPORTS TEAMS FORUM
            </h1>
            <div className="user-controls" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                ID: {user}
              </span>
              <button 
                onClick={() => setUser(null)}
                style={{
                  padding: '5px 12px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.8rem'
                }}
              >
                LOGOUT
              </button>
            </div>
          </header>
          
          <main style={{ padding: '20px', minHeight: '80vh' }}>
            {loading ? (
              <div style={{ textAlign: 'center', marginTop: '50px', fontWeight: 'bold' }}>
                CONNECTING TO THE SPORTS DATABASE...
              </div>
            ) : !selectedTeam ? (
              <TeamList 
                teams={teams} 
                onSelectTeam={setSelectedTeam} 
              />
            ) : (
              <ForumThread 
                team={selectedTeam} 
                currentUser={user} // Passes the logged-in user for the Delete check
                comments={allComments[selectedTeam.id] || []} 
                onBack={() => setSelectedTeam(null)}
                onAddComment={(text) => addComment(selectedTeam.id, text)}
                onDeleteComment={(commentId) => deleteComment(selectedTeam.id, commentId)}
              />
            )}
          </main>
        </>
      )}
    </div>
  );
}

export default App;