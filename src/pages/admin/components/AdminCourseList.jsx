import React from "react";
import { BookOpen, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AdminCourseList = ({
  courses,
  searchQuery,
  onUpdateStatus,
  onDelete,
  onEdit,
}) => {
  return (
    <>
      {/* Desktop Table */}
      <Card className="hidden md:block overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[70px] text-xs font-semibold uppercase tracking-wider pl-6">
                  Cover
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">
                  Course Info
                </TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider">
                  Category
                </TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider">
                  Price
                </TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses?.length > 0 ? (
                courses.map((course) => (
                  <TableRow
                    key={course._id}
                    className="group transition-colors"
                  >
                    <TableCell className="pl-6 py-3">
                      <div className="h-10 w-14 rounded-lg bg-muted overflow-hidden border border-border">
                        <img
                          src={
                            course.image?.url ||
                            `https://ui-avatars.com/api/?name=${course.title}&background=random`
                          }
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">
                          {course.title || "Untitled Course"}
                        </span>
                        <span className="text-xs text-muted-foreground mt-0.5 line-clamp-1 max-w-[300px]">
                          {course.description || "No description"}
                        </span>
                        <span className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1 font-medium">
                          By: {course.instructor?.name || "Unknown"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className="font-medium">
                        {course.category || "General"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold tabular-nums">
                      {course.price > 0
                        ? `$${course.price.toFixed(2)}`
                        : "Free"}
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={course.isActive}
                        onCheckedChange={(newValue) =>
                          onUpdateStatus(course._id, newValue)
                        }
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1 pr-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all cursor-pointer"
                          onClick={() => onEdit(course)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all cursor-pointer"
                          onClick={() => onDelete(course._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center">
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                        <BookOpen className="h-6 w-6 opacity-40" />
                      </div>
                      <div>
                        <p className="font-medium">No courses found</p>
                        <p className="text-xs mt-0.5">
                          {searchQuery
                            ? "Try a different search term"
                            : "Start by adding your first course"}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {courses?.length > 0 ? (
          courses.map((course) => (
            <Card
              key={course._id}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-14 w-18 rounded-lg bg-muted overflow-hidden border border-border shrink-0">
                    <img
                      src={
                        course.image?.url ||
                        `https://ui-avatars.com/api/?name=${course.title}&background=random`
                      }
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm truncate">
                        {course.title || "Untitled Course"}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
                          onClick={() => onEdit(course)}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                          onClick={() => onDelete(course._id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {course.description || "No description"}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      By: {course.instructor?.name || "Unknown"}
                    </p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <Badge variant="secondary" className="h-5 text-[10px]">
                        {course.category || "General"}
                      </Badge>
                      <span className="text-xs font-semibold tabular-nums">
                        {course.price > 0
                          ? `$${course.price.toFixed(2)}`
                          : "Free"}
                      </span>
                      <div className="flex items-center gap-1.5 ml-auto">
                        <span className="text-[10px] text-muted-foreground">
                          {course.isActive ? "Active" : "Inactive"}
                        </span>
                        <Switch
                          checked={course.isActive}
                          onCheckedChange={(newValue) =>
                            onUpdateStatus(course._id, newValue)
                          }
                          className="scale-75"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
              <BookOpen className="h-8 w-8 opacity-30" />
              <p className="text-sm font-medium">No courses found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default AdminCourseList;
