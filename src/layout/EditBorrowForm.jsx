// EditBorrowForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditBorrowForm = ({ borrowId, onClose, onEdit }) => {
  const [formData, setFormData] = useState({
    status: "",
  });

  useEffect(() => {
    const fetchBorrow = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8889/borrow/borrows/${borrowId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchBorrow();
  }, [borrowId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditBorrow = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8889/borrow/borrows/${borrowId}`,
        { status: formData.status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // อัพเดต state ของ borrow ทันที
      onEdit(response.data);

      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5">
      <div className="text-3xl mb-5">แก้ไขการยืมคืน</div>
      <form className="flex flex-col gap-2" onSubmit={handleEditBorrow}>
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
            บันทึกการแก้ไข
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline btn-warning mt-7"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBorrowForm;
