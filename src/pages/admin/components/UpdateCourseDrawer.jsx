import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  updateCourse,
  getAdminAllCourses,
} from "@/Store/features/course/course.slice";

const UpdateCourseDrawer = ({ course, open, onOpenChange }) => {
  const { instructors } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [selectedInstructor, setSelectedInstructor] = useState("");

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      duration: "",
    },
  });

  // Pre-fill the form when course changes
  useEffect(() => {
    if (course && open) {
      form.reset({
        title: course.title || "",
        description: course.description || "",
        duration: course.duration || "",
      });
      // The course.instructor is populated in backend, so course.instructor could be an object.
      const instructorId =
        typeof course.instructor === "object"
          ? course.instructor?._id
          : course.instructor;
      setSelectedInstructor(instructorId || "");
      form.setValue("instructor", instructorId || "");
    }
  }, [course, open, form]);

  const handleInstructorChange = (value) => {
    setSelectedInstructor(value);
    form.setValue("instructor", value);
  };

  const onSubmit = async (data) => {
    if (!course) return;
    const toastId = toast.loading("Updating course...");
    try {
      await dispatch(updateCourse({ id: course._id, course: data })).unwrap();
      toast.success("Course updated successfully!", { id: toastId });
      onOpenChange(false);
      dispatch(getAdminAllCourses());
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : error?.message || "Update failed",
        { id: toastId },
      );
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-full sm:w-[500px] rounded-none">
        <DrawerHeader className="text-left border-b pb-4 pt-6 px-6 flex justify-between items-center">
          <div>
            <DrawerTitle className="text-xl font-bold">
              Update Course
            </DrawerTitle>
            <DrawerDescription>
              Modify the details for the selected course.
            </DrawerDescription>
          </div>
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full cursor-pointer"
            >
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="update-title" className="text-sm font-medium">
                Course Title
              </Label>
              <Input
                id="update-title"
                placeholder="e.g. Master React in 30 Days"
                {...form.register("title", {
                  required: "Title is required",
                })}
              />
              {form.formState.errors.title && (
                <p className="text-destructive text-xs font-medium">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="update-description"
                className="text-sm font-medium"
              >
                Description
              </Label>
              <Input
                id="update-description"
                placeholder="Brief overview..."
                {...form.register("description", {
                  required: "Description is required",
                })}
              />
              {form.formState.errors.description && (
                <p className="text-destructive text-xs font-medium">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="update-instructor"
                className="text-sm font-medium"
              >
                Instructor
              </Label>
              <Select
                id="update-instructor"
                value={selectedInstructor}
                onValueChange={handleInstructorChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select instructor" />
                </SelectTrigger>
                <SelectContent>
                  {instructors?.map((instructor) => (
                    <SelectItem key={instructor._id} value={instructor._id}>
                      {instructor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...form.register("instructor", {
                  required: "Instructor is required",
                })}
              />
              {form.formState.errors.instructor && (
                <p className="text-destructive text-xs font-medium">
                  {form.formState.errors.instructor.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="update-duration" className="text-sm font-medium">
                Duration
              </Label>
              <Input
                id="update-duration"
                placeholder="30 days"
                {...form.register("duration", {
                  required: "Duration is required",
                })}
              />
              {form.formState.errors.duration && (
                <p className="text-destructive text-xs font-medium">
                  {form.formState.errors.duration.message}
                </p>
              )}
            </div>
          </div>

          <DrawerFooter className="border-t px-6 py-4 flex-row justify-end gap-3 bg-muted/20">
            <DrawerClose asChild>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </DrawerClose>
            <Button
              type="submit"
              className="gap-2 font-semibold cursor-pointer"
            >
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default UpdateCourseDrawer;
