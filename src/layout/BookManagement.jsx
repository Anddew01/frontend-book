// BookManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditBookForm from "./EditBookForm";

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8889/book/books",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
    };

    fetchBooks();
  }, []);

  const handleEditBook = (editedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === editedBook.id ? editedBook : book
      )
    );
    setShowEditForm(false);
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8889/book/delete/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== bookId)
      );
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  };

  return (
    <div className="p-5 border w-4/6 min-w-[1000px] mx-auto rounded mt-5">
      {showEditForm && (
        <EditBookForm
          bookId={editBookId}
          onClose={() => setShowEditForm(false)}
          onEdit={handleEditBook}
        />
      )}
      <h2 className="text-3xl m-5">จัดการหนังสือ</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="mb-2">
            <div className="m-1">ชื่อหนังสือ : {book.title}</div>
            <div className="m-1 mb-3">ชื่อผู้แต่ง : {book.author}</div>
            <div className="m-1 mb-3">ประเภท : {book.genre}</div>
            <div className="m-1 mb-3">จำนวนหน้า : {book.pageCount}</div>
            <div>
              <button
                onClick={() => {
                  setShowEditForm(true);
                  setEditBookId(book.id);
                }}
                className="btn btn-outline btn-info btn-sm mr-2 ml-2 mb-2"
              >
                แก้ไข
              </button>
              <button
                onClick={() => handleDeleteBook(book.id)}
                className="btn btn-outline btn-info btn-sm"
              >
                ลบรายการ
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookManagement;
