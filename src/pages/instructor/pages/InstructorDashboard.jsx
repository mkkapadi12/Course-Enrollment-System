import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCourses } from "@/Store/features/instructor/instructor.auth.slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BookCheck, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const InstructorDashboard = () => {
  const dispatch = useDispatch();
  const { instructor, myCourses, loading } = useSelector(
    (state) => state.instructor,
  );

  useEffect(() => {
    dispatch(getMyCourses());
  }, [dispatch]);

  const activeCourses = myCourses?.filter((course) => course.isActive) || [];

  if (loading && !myCourses?.length) {
    return (
      <div className="space-y-8 w-full">
        <Skeleton className="h-40 rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-violet-200" />
            <span className="text-sm font-medium text-violet-100">
              Welcome back
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {instructor?.name || "Instructor"}! 👋
          </h1>
          <p className="text-violet-100 mt-2 text-sm sm:text-base max-w-md">
            Manage your assigned courses, track your curriculum, and help
            students succeed.
          </p>
        </div>
        {/* Decorative blob */}
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute right-10 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
        <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all duration-200 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Assigned Courses
            </CardTitle>
            <div className="h-9 w-9 rounded-lg bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
              <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground">
              {myCourses?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Courses assigned to you
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all duration-200 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Courses
            </CardTitle>
            <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors">
              <BookCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground">
              {activeCourses.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently live for students
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Recently Assigned
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Your latest course assignments
            </p>
          </div>
          <Link to="/instructor/courses">
            <Button
              variant="outline"
              size="sm"
              className="text-sm font-medium gap-1.5 cursor-pointer"
            >
              View All Courses
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {myCourses?.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {myCourses.slice(0, 3).map((course) => (
              <Card
                key={course._id}
                className="bg-card border-border shadow-sm hover:shadow-md transition-all group overflow-hidden"
              >
                <div className="h-1.5 bg-linear-to-r from-gray-600 to-gray-400" />
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-muted flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-foreground line-clamp-2 leading-snug">
                        {course.title}
                      </p>
                      <Badge
                        variant="outline"
                        className={`mt-2 text-[10px] ${
                          course.isActive
                            ? "border-emerald-200 text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                            : "border-amber-200 text-amber-700 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                        }`}
                      >
                        {course.isActive ? "Live" : "Draft"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-border shadow-sm border-dashed bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center py-14 text-center">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-7 w-7 text-muted-foreground opacity-50" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                No assigned courses
              </h3>
              <p className="text-muted-foreground max-w-sm mt-2 text-sm">
                You haven&apos;t been assigned any courses yet. When an admin
                assigns a course to you, it will appear here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;
