// AddBookForm.js
import React, { useState } from "react";
import axios from "axios";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    pageCount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8889/book/books",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);

      // แสดงข้อความเมื่อการเพิ่มหนังสือสำเร็จ
      alert("เพิ่มหนังสือเรียบร้อย");

      // รีเซ็ตค่าข้อมูลหลังจากเพิ่มหนังสือเรียบร้อย
      setFormData({
        title: "",
        author: "",
        genre: "",
        pageCount: 0,
      });
    } catch (error) {
      console.error(error.message);

      // แสดงข้อผิดพลาดที่เกิดขึ้นในส่วนของ frontend
      alert("เกิดข้อผิดพลาดขณะเพิ่มหนังสือ กรุณาลองอีกครั้ง");
    }
  };

  return (
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5">
      <div className="text-3xl mb-5">เพิ่มหนังสือ</div>
      <form className="flex flex-col gap-2" onSubmit={handleAddBook}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">ชื่อหนังสือ</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">ชื่อผู้แต่ง</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">ประเภท</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">จำนวนหน้า</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full max-w-xs"
            name="pageCount"
            value={formData.pageCount}
            onChange={handleChange}
          />
        </label>

        <div className="flex gap-5">
          <button type="submit" className="btn btn-outline btn-info mt-7">
            เพิ่มหนังสือ
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
