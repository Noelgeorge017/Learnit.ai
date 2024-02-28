// /api/course/createChapters

import { prisma } from "@/lib/db";
import { strict_output } from "@/lib/gpt";
import { getUnsplashImage } from "@/lib/unsplash";
import { courseSchema } from "@/validators/course";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { units, title,lang,edlevel } = courseSchema.parse(body);
    let summarised_text: string | null = body.summarised_text ?? null;
    

    type outputUnits = {
      title: string;
      chapters: {
        youtube_search_query: string;
        chapter_title: string;
      }[];
    }[];
    // console.log(units);
    // console.log(title);
    // console.log(summarised_text);
    console.log(lang);
    console.log(edlevel);
    let sample_units: outputUnits = [
      {
        title: "Unit 1: Introduction to Calculus",
        chapters: [
          {
            youtube_search_query: "Introduction to Calculus",
            chapter_title: "Chapter 1 : What is Calculus",
          },
          {
            youtube_search_query: "History of  Calculus",
            chapter_title: "Chapter 2 : History of Calculus",
          },
        ],
      },
      {
        title: "Unit 2: Introduction to differentiatiom",
        chapters: [
          {
            youtube_search_query: "Introduction to diff",
            chapter_title: "Chapter 1 : What is diff",
          },
          {
            youtube_search_query: "History of  diff",
            chapter_title: "Chapter 2 : History of diff",
          },
        ],
      },
    ];

   

    let output_units: outputUnits = [];
    if (!summarised_text) {
      output_units = await strict_output(
        "you are an AI capable of  curating course content coming up relevant chapter titles for a course , finding  relevant youtube videos for each chapter  ",
        new Array(units.length).fill(
          `	It is your job to create a course about ${title} and from taking inspiration from the units given, it is compulsary to include the units mentioned:\n ${units}  
       \n The user has requested to create chapters for each of the above units.The name or title of the units must be unique. Then, for each chapter, provide a detailed youtube search query  which should  mention ${edlevel}  which is used mention the users education level and this youtube search query can be used to find an informative educational video for each chapter. Each query should give an educational informative course in youtube.`
        ),
        {
          title: "title of the unit",
          chapters:
            "an array of chapters, each chapter should have a youtube_search_query and a chapter_title key in the JSON object",
        }
      );
    } else {
      output_units = await strict_output(
        "you are an AI capable of  curating course content coming up relevant chapter titles for a course , finding  relevant youtube videos for each chapter  ",
        new Array(2).fill(
          `	It is your job to create a course about ${title} and from taking inspiration from the summarised content :${
            "\n" + summarised_text + "\n\n"
          }  
          The user has requested to create chapters for each of the above units.The name or title of the units must be unique. Then, for each chapter, provide a detailed youtube search query  which should    mention ${edlevel}  which is used mention the users education level and this youtube search query can be used to find an informative educational video for each chapter. Each query should give an educational informative course in youtube.`
        ),
        {
          title: "title of the unit",
          chapters:
            "an array of chapters of length at least 3 , each chapter should have a youtube_search_query and a chapter_title key in the JSON object",
        }
      );
    }

    const imageSearchTerm = await strict_output(
      "you are an AI capable of finding the most relevant image for a course",
      `Please provide a good image search term for the title of a course about ${title}. This search term will be fed into the unsplash API, so make sure it is a good search term that will return good results`,
      {
        image_search_term: "a good search term for the title of the course",
      }
    );

    const course_image = await getUnsplashImage(
      imageSearchTerm.image_search_term
    );
    const course = await prisma.course.create({
      data: {
        name: title,
        image: course_image,
      },
    });
    for (const unit of output_units) {
      console.log(unit.chapters)
      const title = unit.title;
      const prismaUnit = await prisma.unit.create({
        data: {
          name: title,
          courseId: course.id,
        },
      });
      await prisma.chapter.createMany({
        data: unit.chapters.map((chapter) => {
          return {
            name: chapter.chapter_title,
            youtubeSearchQuery: chapter.youtube_search_query,
            unitId: prismaUnit.id,
            language: lang,
          };
        }),
      });
    }
    

     
    return NextResponse.json({ course_id: course.id });
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error);
      return new NextResponse("invalid body", { status: 400 });
    }
    // } else if ((error as any).response && (error as any).response.status === 429) {

    //     return new NextResponse("The service is temporarily unavailable due to rate limits. Please try again in a few minutes.", { status: 429 });
    //   }
    else {
      console.error("Unexpected error:", error); // Log unexpected errors
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 504 }
      );
    }
  }
}
