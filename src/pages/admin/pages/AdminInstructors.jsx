import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstructor } from "@/Store/features/admin/admin.auth.slice";

const AdminInstructors = () => {
  const { instructors, loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  console.log(instructors);

  useEffect(() => {
    dispatch(getAllInstructor());
  }, []);

  return <div>AdminInstructors</div>;
};

export default AdminInstructors;
