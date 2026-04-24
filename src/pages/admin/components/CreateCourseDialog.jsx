import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, Upload, X, ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  createCourse,
  getAdminAllCourses,
} from "@/Store/features/course/course.slice";

const CreateCourseDialog = () => {
  const { instructors } = useSelector((state) => state.admin);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      duration: "",
    },
  });

  const handleInstructorChange = (value) => {
    setSelectedInstructor(value);
    form.setValue("instructor", value);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Adding course...");
    try {
      const result = await dispatch(createCourse(data)).unwrap();
      toast.success(result?.msg || "Course added successfully!", {
        id: toastId,
      });
      form.reset();
      setImage(null);
      setSelectedInstructor(null);
      setIsDialogOpen(false);
      dispatch(getAdminAllCourses());
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : error?.message || "Operation failed",
        { id: toastId },
      );
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 px-5 font-semibold gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Course</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-bold">Add New Course</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new course to your platform.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Course Title
              </Label>
              <Input
                id="title"
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

            <div className="col-span-2 space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Input
                id="description"
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
              <Label htmlFor="instructor" className="text-sm font-medium">
                Instructor
              </Label>
              <Select
                {...form.register("instructor", {
                  required: "Instructor is required",
                })}
                id="instructor"
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
              {form.formState.errors.instructor && (
                <p className="text-destructive text-xs font-medium">
                  {form.formState.errors.instructor.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium">
                Duration
              </Label>
              <Input
                id="duration"
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

            {/* Image Upload */}
            <div className="col-span-2 space-y-3">
              <Label className="text-sm font-medium">Cover Image</Label>
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40 hover:bg-muted/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">
                    {image ? image.name : "Drop image or click to browse"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPEG, PNG cover image
                  </p>
                </div>
              </div>
              {image && (
                <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs">
                  <ImageIcon className="h-3 w-3 text-muted-foreground" />
                  <span className="truncate flex-1">{image.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                    }}
                    className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="pt-4 border-t">
            <Button type="submit" className="w-full font-bold h-11 cursor-pointer">
              Save Course
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourseDialog;
