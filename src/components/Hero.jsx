import React, { useState, useEffect } from 'react';
import './Hero.css';
import EditModal from './Modal';

const Hero = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [deletingBookId, setDeletingBookId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('https://lavina.onrender.com/books');
      const result = await response.json();
      if (response.ok && result.isOk && Array.isArray(result.data)) {
        setBooks(result.data);
      } else {
        setError('Failed to fetch or invalid data format');
      }
    } catch (err) {
      setError('Network error');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      setDeletingBookId(id);
      
      // Опционально: отправка запроса на сервер для удаления
      const response = await fetch(`https://lavina.onrender.com/books/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        // Удаляем книгу из состояния только после успешного удаления на сервере
        setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
      } else {
        console.error('Failed to delete book');
        setDeletingBookId(null); // Сбрасываем, если удаление не удалось
      }
    } catch (err) {
      console.error('Delete error:', err);
      setDeletingBookId(null);
    }
  };

  const openEditModal = (book) => {
    setSelectedBook(book);
    setEditStatus(book.status || 'New');
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!selectedBook) return;
    
    try {
      // Опционально: отправка изменений на сервер
      const response = await fetch(`https://lavina.onrender.com/books/${selectedBook.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...selectedBook, status: editStatus }),
      });
      
      if (response.ok) {
        // Обновляем состояние только после успешного обновления на сервере
        setBooks(prevBooks =>
          prevBooks.map(book =>
            book.id === selectedBook.id ? { ...book, status: editStatus } : book
          )
        );
      } else {
        console.error('Failed to update book');
      }
    } catch (err) {
      console.error('Update error:', err);
    } finally {
      setShowModal(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'New': 'status-new',
      'Reading': 'status-reading',
      'Finished': 'status-finished'
    };
    return statusClasses[status] || 'status-default';
  };

  const filteredBooks = books.filter(book => {
    const term = searchTerm.toLowerCase();
    return (
      book.title?.toLowerCase().includes(term) ||
      book.author?.toLowerCase().includes(term) ||
      book.isbn?.toLowerCase().includes(term)
    );
  });

  if (loading) return <div className="hero-container"><div className="loading">Loading books...</div></div>;
  if (error) return <div className="hero-container"><div className="error">Error: {error}</div></div>;

  return (
    <div className="hero-container">
      <header className="hero-header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">✓</span>
            <span className="logo-text">Books</span>
            <span className="logo-list">List</span>
          </div>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search by title, author, or ISBN"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="header-right">
          <div className="profile-avatar">A</div>
        </div>
      </header>

      <main className="hero-main">
        <div className="hero-title-section">
          <h1 className="hero-title">
            You've got <span className="title-number">{filteredBooks.length}</span> book{filteredBooks.length !== 1 ? 's' : ''}
          </h1>
          <p className="hero-subtitle">Your books today</p>
          <button className="create-book-btn">+ Create a book</button>
        </div>

        <div className="books-grid">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className={`book-card ${deletingBookId === book.id ? 'fade-out' : ''}`}
            >
              <div className="book-card-content">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-cover">Cover: <a href={book.coverUrl || '#'} className="book-link">{book.coverUrl}</a></p>
                <p className="book-pages">Pages: {book.pages}</p>
                <p className="book-published">Published: {book.published}</p>
                <p className="book-isbn">Isbn: {book.isbn}</p>
                <div className="book-footer">
                  <span className="book-author">{book.author} / {book.year}</span>
                </div>
                <div className="book-status-container">
                  <span className={`book-status ${getStatusBadge(book.status)}`}>
                    {book.status}
                  </span>
                </div>
              </div>
              <div className="book-actions">
                <button onClick={() => openEditModal(book)} className="action-btn edit-btn">✎</button>
                <button onClick={() => deleteBook(book.id)} className="action-btn delete-btn">🗑</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showModal && (
        <EditModal
          book={selectedBook}
          editStatus={editStatus}
          setEditStatus={setEditStatus}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Hero;