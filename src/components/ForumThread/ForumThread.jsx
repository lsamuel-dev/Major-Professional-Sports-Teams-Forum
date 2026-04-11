import React, { useState } from 'react';

function ForumThread({ team, comments = [], onBack, onAddComment, onDeleteComment, currentUser }) {
  const [newComment, setNewComment] = useState('');

  // Helper to safely get a string name from a user string or object
  const getSafeName = (user) => {
    if (!user) return "User";
    if (typeof user === 'string') return user;
    return user.username || user.name || "User";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  // Strict safety check for the team object
  if (!team || !team.name) return <div style={{ padding: '20px' }}>Loading forum data...</div>;

  const currentUserName = getSafeName(currentUser);

  return (
    <div className="forum-thread" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={onBack} 
        style={{ 
          marginBottom: '20px', 
          cursor: 'pointer',
          background: 'none',
          border: '1px solid #000',
          padding: '5px 10px',
          fontWeight: 'bold'
        }}
      >
        ← BACK TO TEAMS
      </button>

      <div className="thread-header" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px', 
        marginBottom: '30px',
        borderBottom: '4px solid #000',
        paddingBottom: '20px'
      }}>
        {team.badge && <img src={team.badge} alt={team.name} style={{ width: '80px' }} />}
        <h1 style={{ margin: 0, letterSpacing: '1px' }}>
          {(team.name || "TEAM").toUpperCase()} FAN FORUM
        </h1>
      </div>

      <div className="comments-section">
        {comments.length === 0 ? (
          <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>
            No posts yet. Be the first to break the ice!
          </p>
        ) : (
          comments.map((comment, index) => {
            // 1. Get a clean string for the author's name
            const authorName = getSafeName(comment.author);
            
            // 2. Normalize for the ownership check (Lowercase + Trim)
            const commentAuthLower = authorName.toLowerCase().trim();
            const currentAuthLower = currentUserName.toLowerCase().trim();
            
            // 3. Normalize IDs as strings
            const commentId = (comment.author?._id || comment.author?.id || "").toString();
            const currentId = (currentUser?._id || currentUser?.id || "").toString();

            // Match by name OR match by ID
            const isOwner = (commentAuthLower === currentAuthLower && commentAuthLower !== "user") || 
                            (commentId !== "" && commentId === currentId);

            return (
              <div key={comment._id || comment.id || index} className="comment-card" style={{
                border: '3px solid #000',
                margin: '20px 0',
                padding: '20px',
                backgroundColor: '#fff',
                boxShadow: '5px 5px 0px rgba(0,0,0,0.1)'
              }}>
                <div className="comment-meta" style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  borderBottom: '1px solid #eee',
                  paddingBottom: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ 
                      fontWeight: '900', 
                      textTransform: 'uppercase', 
                      letterSpacing: '1px',
                      fontSize: '1rem'
                    }}>
                      {authorName}
                    </span>
                    {isOwner && (
                      <span style={{ 
                        fontSize: '0.6rem', 
                        backgroundColor: '#000', 
                        color: '#fff', 
                        padding: '2px 6px', 
                        fontWeight: 'bold' 
                      }}>
                        YOU
                      </span>
                    )}
                  </div>
                  
                  <span style={{ fontSize: '0.75rem', color: '#888', fontStyle: 'italic' }}>
                    {comment.timestamp}
                  </span>
                </div>
                
                <p style={{ fontSize: '1.1rem', lineHeight: '1.5', margin: '15px 0' }}>
                  {comment.text}
                </p>

                {isOwner && (
                  <div style={{ textAlign: 'right' }}>
                    <button 
                      onClick={() => onDeleteComment(comment._id || comment.id)}
                      style={{
                        backgroundColor: '#ff4444',
                        color: '#fff',
                        border: '2px solid #000',
                        padding: '8px 15px',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        boxShadow: '3px 3px 0px #000'
                      }}
                    >
                      DELETE MY POST
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ 
        marginTop: '40px', 
        borderTop: '5px solid #000', 
        paddingTop: '30px',
        backgroundColor: '#f4f4f4',
        padding: '20px'
      }}>
        <h3 style={{ marginTop: 0 }}>POST A NEW COMMENT</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={`What's on your mind, ${currentUserName}?`}
          style={{ 
            width: '100%', 
            minHeight: '120px', 
            padding: '15px', 
            border: '3px solid #000', 
            marginBottom: '15px',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }}
          required
        />
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '18px', 
            backgroundColor: '#000', 
            color: '#fff', 
            fontWeight: '900', 
            cursor: 'pointer',
            letterSpacing: '3px',
            fontSize: '1.1rem',
            border: 'none',
            textTransform: 'uppercase'
          }}
        >
          POST TO FORUM
        </button>
      </form>
    </div>
  );
}

export default ForumThread;