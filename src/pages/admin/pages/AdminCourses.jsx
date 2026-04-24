import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Search, X, GraduationCap } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import {
  deleteCourse,
  getAdminAllCourses,
  updateCourseStatus,
} from "@/Store/features/course/course.slice";

import CreateCourseDialog from "../components/CreateCourseDialog";
import AdminCourseList from "../components/AdminCourseList";
import UpdateCourseDrawer from "../components/UpdateCourseDrawer";

const AdminCourses = () => {
  const { admincourses, loading } = useSelector((state) => state.course) || {
    admincourses: [],
    loading: false,
  };
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  // Drawer state
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState(null);

  const handleUpdateStatus = async (id, isActive) => {
    const toastId = toast.loading("Updating course status...");
    try {
      await dispatch(updateCourseStatus({ id, isActive })).unwrap();
      toast.success("Course status updated successfully!", { id: toastId });
      dispatch(getAdminAllCourses());
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : error?.message || "Update failed",
        { id: toastId },
      );
    }
  };

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting course...");
    try {
      const result = await dispatch(deleteCourse(id)).unwrap();
      dispatch(getAdminAllCourses());
      toast.success(result?.message || "Course deleted!", { id: toastId });
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : error?.message || "Delete failed",
        { id: toastId },
      );
    }
  };

  const openUpdateDrawer = (course) => {
    setCourseToEdit(course);
    setIsUpdateDrawerOpen(true);
  };

  useEffect(() => {
    dispatch(getAdminAllCourses());
  }, [dispatch]);

  const filteredCourses = admincourses?.filter(
    (c) =>
      c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading && !admincourses?.length) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-36" />
        </div>
        <Skeleton className="h-[400px] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-950">
            <GraduationCap className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Courses
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage your educational catalog
            </p>
          </div>
        </div>

        <CreateCourseDialog />
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <AdminCourseList
        courses={filteredCourses}
        searchQuery={searchQuery}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDelete}
        onEdit={openUpdateDrawer}
      />

      <UpdateCourseDrawer
        course={courseToEdit}
        open={isUpdateDrawerOpen}
        onOpenChange={setIsUpdateDrawerOpen}
      />
    </div>
  );
};

export default AdminCourses;
