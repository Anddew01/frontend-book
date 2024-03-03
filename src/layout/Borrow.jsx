import React, { useState, useEffect } from "react";
import axios from "axios";

const BorrowBookForm = () => {
  const [formData, setFormData] = useState({
    memberId: "",
    bookId: "",
    status: "Borrowed",
    borrowDate: new Date().toISOString(),
  });

  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8889/book/books", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          setBooks(response.data);
        } else {
          console.error("Error fetching books:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
    };

    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8889/member/members",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          setMembers(response.data);
        } else {
          console.error("Error fetching members:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching members:", error.message);
      }
    };

    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    fetchBooks();
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBorrow = async (e) => {
    e.preventDefault();

    try {
      const selectedMemberId = formData.memberId; // เก็บ memberId ที่เลือกจาก dropdown

      const response = await axios.post(
        "http://localhost:8889/borrow/borrows",
        {
          ...formData,
          userId: selectedMemberId, // ให้ใช้ memberId ที่ถูกเลือกจาก dropdown
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
      alert("หนังสือถูกยืมเรียบร้อยแล้ว");

      setFormData({
        memberId: "",
        bookId: "",
        status: "ยืม",
        borrowDate: new Date().toISOString(),
      });
    } catch (error) {
      console.error(error.message);
      alert("เกิดข้อผิดพลาดขณะทำรายการ กรุณาลองอีกครั้ง");
    }
  };

  return (
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5">
      <div className="text-3xl mb-5">ยืมคืน</div>
      <form className="flex flex-col gap-2" onSubmit={handleBorrow}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">ชื่อสมาชิก</span>
          </div>
          <select
            name="memberId"
            value={formData.memberId} // ให้ใช้ค่าจาก formData
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          >
            <option value="">-- เลือก ชื่อสมาชิก --</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">ชื่อหนังสือ</span>
          </div>
          <select
            name="bookId"
            value={formData.bookId}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          >
            <option value="">-- เลือกหนังสือ --</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">สถานะ</span>
          </div>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          >
            <option value="ยืม">ยืม</option>
            <option value="คืน">คืน</option>
          </select>
        </label>

        <div className="flex gap-5">
          <button type="submit" className="btn btn-outline btn-info mt-7">
            บันทึก
          </button>
        </div>
      </form>
    </div>
  );
};

export default BorrowBookForm;
