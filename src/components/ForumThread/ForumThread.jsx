import React from 'react';
import './ForumThread.css';

function ForumThread({ team, comments, onBack, onAddComment, onDeleteComment }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.comment.value;
    if (!text.trim()) return;
    
    onAddComment({ text, timestamp: new Date().toLocaleString() });
    e.target.reset();
  };

  return (
    <div className="forum-thread">
      <button onClick={onBack} className="back-button">← Back to Teams</button>
      
      <div className="forum-header">
        <img src={team.badge} alt={team.name} className="forum-logo" />
        <h2>{team.name} Fan Forum</h2>
        <p>League: {team.league}</p>
      </div>

      <div className="comment-section">
        <h3>Discussion</h3>
        <div className="comment-list">
          {comments.length === 0 ? (
            <p>No posts yet. Be the first to break the ice!</p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="comment-card" style={{ position: 'relative' }}>
                <p className="comment-text">{comment.text}</p>
                <small className="comment-meta">{comment.timestamp}</small>
                <button 
                  className="delete-btn"
                  onClick={() => onDeleteComment(comment.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmit} className="comment-form">
          <textarea 
            name="comment" 
            placeholder="Share your thoughts on the game..."
            required
          ></textarea>
          <button type="submit">Post to Thread</button>
        </form>
      </div>
    </div>
  );
}

export default ForumThread;