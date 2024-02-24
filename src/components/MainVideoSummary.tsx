"use client";
import { Chapter, Course, Unit } from "@prisma/client";
import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { prisma } from "@/lib/db";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  course: Course;
  chapter: Chapter;
  unit: Unit;
  unitIndex: number;
  chapterIndex: number;
};

const MainVideoSummary = ({
  course,
  unit,
  unitIndex,
  chapter,
  chapterIndex,
}: Props) => {
  const [isChecked, setIsChecked] = useState(chapter.completed);

  const chapterId = chapter.id;

  const { mutate: updateComplete, isPending } = useMutation({
    mutationFn: async (chapterId: string) => {
      const payload = {
        chapterId: chapterId,
        boolValue: isChecked,
        courseId: course.id,
      };
      const response = await axios.post("/api/progress/chapter", payload);
      return response.data;
    },
  });

  //

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);

    updateComplete(chapterId);
    return;
  };

  return (
    <div className="flex-[2] mt-16">
      <h4 className="text-sm uppercase text-secondary-foreground/60">
        Unit {unitIndex + 1} &bull; Chapter {chapterIndex + 1}
      </h4>
      <h1 className="text-4xl font-bold">{chapter.name}</h1>
      <iframe
        title="chapter video"
        className="w-full mt-4 aspect-video max-h-[24rem]"
        src={`https://www.youtube.com/embed/${chapter.videoId}`}
        allowFullScreen
      />
      <div className="mt-4">
        <div className="flex justify-between ">
          <h3 className="text-3xl font-semibold">Summary</h3>
          {/* <Checkbox className="ml-4 w-6 h-6" >
          Finished?
          </Checkbox> */}
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isChecked}
              id="terms"
              onCheckedChange={handleCheckboxChange}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Finished the chapter?
            </label>
          </div>
        </div>

        <p className="mt-2 text-secondary-foreground/80">{chapter.summary}</p>
      </div>
    </div>
  );
};

export default MainVideoSummary;
