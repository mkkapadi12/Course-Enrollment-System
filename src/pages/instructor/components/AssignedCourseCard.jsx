import React from "react";
import { Clock, BookOpen, Layers } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AssignedCourseCard = ({ course }) => {
  return (
    <Card className="group overflow-hidden bg-card transition-all hover:shadow-md border-border flex flex-col h-full py-0">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={
            course.image?.url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              course.title || "Course",
            )}&background=111827&color=fff&size=200 `
          }
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {course.isActive ? (
            <Badge className="bg-emerald-500/90 hover:bg-emerald-500/90 text-white border-transparent backdrop-blur-sm">
              Live
            </Badge>
          ) : (
            <Badge
              variant="secondary"
              className="bg-background/90 backdrop-blur-sm"
            >
              Draft
            </Badge>
          )}
          {course.price === 0 && (
            <Badge className="bg-blue-500/90 hover:bg-blue-500/90 text-white border-transparent backdrop-blur-sm">
              Free
            </Badge>
          )}
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between mb-1 gap-2">
          <Badge
            variant="outline"
            className="text-[10px] font-medium bg-muted/50"
          >
            {course.category || "General"}
          </Badge>
          {course.price > 0 && (
            <span className="font-bold text-sm text-foreground">
              ${course.price.toFixed(2)}
            </span>
          )}
        </div>
        <CardTitle className="text-base font-bold line-clamp-1 group-hover:text-primary transition-colors">
          {course.title || "Untitled Course"}
        </CardTitle>
        <CardDescription className="text-xs line-clamp-2 mt-1 min-h-[32px]">
          {course.description || "No description available for this course."}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 mt-auto">
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border mt-2">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary/70" />
            <span>{course.duration || "Self-paced"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-primary/70" />
            <span>Assigned</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignedCourseCard;
