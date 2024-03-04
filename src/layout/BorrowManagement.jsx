import React, { useEffect, useState } from "react";
import axios from "axios";

const BorrowManagement = () => {
  const [borrows, setBorrows] = useState([]);

  const handleReturn = async (borrowId) => {
    try {
      const shouldReturn = window.confirm(
        "คุณแน่ใจหรือไม่ที่จะทำการคืนหนังสือ?"
      );
      if (!shouldReturn) {
        return;
      }

      await axios.put(
        `http://localhost:8889/borrow/borrows/${borrowId}`,
        { status: "คืน" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // อัพเดท borrows state หลังจากทำรายการคืนสำเร็จ
      setBorrows((borrows) =>
        borrows.map((borrow) =>
          borrow.id === borrowId ? { ...borrow, status: "คืน" } : borrow
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  };
  
  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const token = localStorage.getItem("token");

        const borrowResponse = await axios.get(
          "http://localhost:8889/borrow/borrows",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const membersResponse = await axios.get(
          "http://localhost:8889/member/members",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const booksResponse = await axios.get(
          "http://localhost:8889/book/books",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const borrowDataWithDetails = borrowResponse.data.map((borrow) => {
          const book = booksResponse.data.find(
            (book) => book.id === borrow.bookId
          );
          const member = membersResponse.data.find(
            (member) => member.id === borrow.memberId
          );

          return {
            ...borrow,
            bookTitle: book ? book.title : "N/A",
            memberIdCard: member ? member.memberIdCard : "N/A",
            memberName: member ? member.name : "N/A",
            memberAddress: member ? member.address : "N/A",
          };
        });

        setBorrows(borrowDataWithDetails);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchBorrows();
  }, []);

  const handleDelete = async (borrowId) => {
    try {
      const shouldDelete = window.confirm("คุณแน่ใจหรือไม่ที่จะลบรายการนี้?");
      if (!shouldDelete) {
        return;
      }

      await axios.delete(`http://localhost:8889/borrow/borrows/${borrowId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBorrows((borrows) =>
        borrows.filter((borrow) => borrow.id !== borrowId)
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="p-5 border w-4/6 min-w-[1000px] mx-auto rounded mt-5">
      <h2 className="text-3xl m-5">การยืมคืนหนังสือ</h2>
      <ul>
        {borrows.map((borrow) => (
          <li key={borrow.id} className="mb-2">
            <div className="m-1">ชื่อหนังสือ : {borrow.bookTitle}</div>
            <div className="m-1 mb-3">เลขบัตร : {borrow.memberIdCard}</div>
            <div className="m-1 mb-3">ชื่อสมาชิก : {borrow.memberName}</div>
            <div className="m-1 mb-3">ที่อยู่ : {borrow.memberAddress}</div>
            <div className="m-1 mb-3">วันที่ยืม : {borrow.borrowDate}</div>
            <div className="m-1 mb-3">สถานะ : {borrow.status}</div>
            <div className="flex">
              {borrow.status === "ยืม" && (
                <button
                  onClick={() => handleReturn(borrow.id)}
                  className="btn btn-outline btn-info btn-sm mr-2"
                >
                  คืนหนังสือ
                </button>
              )}
              <button
                onClick={() => handleDelete(borrow.id)}
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

export default BorrowManagement;
