"use client";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { courseSchema } from "@/validators/course";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Plus, Trash, Upload } from "lucide-react";
import { Separator } from "./ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { uploadToS3 } from "@/lib/s3";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
type Props = {};
type Input = z.infer<typeof courseSchema>;

const CreateCourseForm = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<Input>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      units: [],
      lang: "en",
      edlevel: "Btech CSE",
    },
  });
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: createChapters, isPending } = useMutation({
    mutationFn: async ({ title, units, lang,edlevel }: Input) => {
      let s3_url = null;
      let summarised_text = null;
      if (file) {
        s3_url = await uploadToS3(file);
        console.log("s3_url", s3_url);
        const data = {
          url: s3_url,
        };
        //
        try {
          const res = await axios.post(
            "https://learnit-ai-backend.onrender.com/extract-pdf",
            data
          );
          // console.log("summarised_text", res.data.extractedText.content);
          summarised_text = res.data.extractedText.content;
        } catch (error) {
          summarised_text = null;
        }
      }
      const payload = {
        units,
        title,
        lang,
        summarised_text,
        edlevel
      };
      console.log(payload);
      const response = await axios.post("/api/course/createChapters", payload);
      return response.data;
    },
  });
  function onSubmit(data: Input) {
    if (!file && data.units.some((unit) => unit === "")) {
      toast({
        title: "Error",
        description: "Please fill all the units",
        variant: "destructive",
      });
      return;
    }
    createChapters(data, {
      onSuccess: ({ course_id }) => {
        toast({
          title: "Success",
          description: "Course created successfully",
        });
        router.push(`/create/${course_id}`);
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });
  }
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                  <FormLabel className="flex-[1] text-xl">Title</FormLabel>
                  <FormControl className="flex-[6]">
                    <Input
                      placeholder="Enter the main topic of the course"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="lang"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                <FormLabel className="flex-[1] text-xl mr-2">
                  Language
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="flex-[6]">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="edlevel"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                <FormLabel className="flex-[1] text-xl mr-2">
                  Education
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="flex-[6]">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Education Level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Btech CSE">Btech CSE</SelectItem>
                    <SelectItem value="Btech EEE">Btech EEE</SelectItem>
                    <SelectItem value="Class 12">Class 12</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <AnimatePresence>
            {form.watch("units").map((_, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    height: { duration: 0.2 },
                  }}
                >
                  <FormField
                    key={index}
                    control={form.control}
                    name={`units.${index}`}
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                          <FormLabel className="flex-[1] text-xl">
                            Unit {index + 1}
                          </FormLabel>
                          <FormControl className="flex-[6]">
                            <Input
                              placeholder="Enter subtopic of the course"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div className="flex items-center justify-center mt-6">
            <Separator className="flex-[1]" />
            <div className="mx-4">
              <Button
                type="button"
                variant="secondary"
                className="font-semibold"
                onClick={() => {
                  form.setValue("units", [...form.watch("units"), ""]);
                }}
              >
                Add Unit
                <Plus className="w-4 h-4 ml-2 text-green-500" />
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="font-semibold ml-2"
                onClick={() => {
                  form.setValue("units", form.watch("units").slice(0, -1));
                }}
              >
                Remove Unit
                <Trash className="w-4 h-4 ml-2 text-red-500" />
              </Button>
              {/* upload pdf */}
              <Button
                variant="secondary"
                type="button"
                className="ml-2 font-semibold"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = ".pdf";
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (!file) return;
                    setFile(file);
                  };
                  input.click();
                }}
              >
                Upload PDF <Upload className="w-4 h-4 ml-2 " />
              </Button>
            </div>

            <Separator className="flex-[1]" />
          </div>

          {file && (
            <div className="flex items-center justify-center mt-4">
              <Separator className="flex-[1]" />
              <span>{file.name}</span>
              <div className="mx-4">
                <Button
                  variant="secondary"
                  type="button"
                  className="ml-2 font-semibold"
                  onClick={() => {
                    setFile(null);
                    console.log(form.watch());
                  }}
                >
                  Remove File <Trash className="w-4 h-4 ml-2 text-red-500" />
                </Button>
              </div>
              <Separator className="flex-[1]" />
            </div>
          )}

          <Button
            disabled={isPending}
            type="submit"
            className="w-full mt-6"
            size="lg"
          >
            {isPending ? (
              <span className="flex">
                Please wait while we create the course
                <Loader2 className=" w-4 h-4 animate-spin ml-4" />
              </span>
            ) : (
              "Lets Go!"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCourseForm;
