import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCourses } from "@/Store/features/instructor/instructor.auth.slice";
import { BookOpen, Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import AssignedCourseCard from "../components/AssignedCourseCard";

const MyAssignedCourses = () => {
  const dispatch = useDispatch();
  const { myCourses, loading } = useSelector((state) => state.instructor);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState("all"); // 'all', 'active', 'draft'

  useEffect(() => {
    dispatch(getMyCourses());
  }, [dispatch]);

  const filteredCourses = myCourses?.filter((course) => {
    const matchesSearch =
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterActive === "all" ||
      (filterActive === "active" && course.isActive) ||
      (filterActive === "draft" && !course.isActive);

    return matchesSearch && matchesStatus;
  });

  if (loading && !myCourses?.length) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-950">
            <BookOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            My Assigned Courses
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl ml-13">
          Manage and monitor all the courses assigned to you by administrators.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-card p-3 rounded-xl border border-border shadow-sm">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 w-full bg-muted/50 border-none focus-visible:ring-1"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        <div className="flex w-full sm:w-auto items-center gap-2 p-1 bg-muted/50 rounded-lg">
          <Button
            variant={filterActive === "all" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilterActive("all")}
            className="h-8 flex-1 sm:flex-none cursor-pointer"
          >
            All
          </Button>
          <Button
            variant={filterActive === "active" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilterActive("active")}
            className="h-8 flex-1 sm:flex-none cursor-pointer"
          >
            Live
          </Button>
          <Button
            variant={filterActive === "draft" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilterActive("draft")}
            className="h-8 flex-1 sm:flex-none cursor-pointer"
          >
            Draft
          </Button>
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <AssignedCourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border border-border border-dashed">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            <Filter className="h-8 w-8 text-muted-foreground opacity-50" />
          </div>
          <h3 className="text-lg font-bold">No courses found</h3>
          <p className="text-sm text-muted-foreground text-center max-w-sm mt-2">
            {searchQuery || filterActive !== "all"
              ? "We couldn't find any courses matching your current filters. Try adjusting your search."
              : "You haven't been assigned any courses yet."}
          </p>
          {(searchQuery || filterActive !== "all") && (
            <Button
              variant="outline"
              className="mt-6 cursor-pointer"
              onClick={() => {
                setSearchQuery("");
                setFilterActive("all");
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAssignedCourses;
