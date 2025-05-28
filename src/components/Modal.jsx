import React from 'react';
import './Modal.css';

const EditModal = ({ book, onClose, onSave, onInputChange }) => {
  if (!book) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Book</h2>
        
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={book.title || ''}
            onChange={onInputChange}
            className="modal-input"
          />
        </div>

        <div className="form-group">
          <label>Cover URL</label>
          <input
            type="text"
            name="coverUrl"
            value={book.coverUrl || 'No cover available'}
            onChange={onInputChange}
            className="modal-input"
          />
        </div>

        <div className="form-group">
          <label>Pages</label>
          <input
            type="number"
            name="pages"
            value={book.pages || ''}
            onChange={onInputChange}
            className="modal-input"
          />
        </div>

        <div className="form-group">
          <label>Published Year</label>
          <input
            type="text"
            name="publishedYear"
            value={book.publishedYear || ''}
            onChange={onInputChange}
            className="modal-input"
          />
        </div>

        <div className="form-group">
          <label>ISBN</label>
          <input
            type="text"
            name="isbn"
            value={book.isbn || ''}
            onChange={onInputChange}
            className="modal-input"
          />
        </div>

        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={book.author || ''}
            onChange={onInputChange}
            className="modal-input"
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={book.status || 'New'}
            onChange={onInputChange}
            className="modal-select"
          >
            <option value="New">New</option>
            <option value="Reading">Reading</option>
            <option value="Finished">Finished</option>
          </select>
        </div>

        <div className="modal-actions">
          <button className="action-btn cancel-btn" onClick={onClose}>Cancel</button>
          <button className="action-btn save-btn" onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;