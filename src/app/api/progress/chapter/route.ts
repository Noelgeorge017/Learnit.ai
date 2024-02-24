import { prisma } from "@/lib/db";
import { stat } from "fs";
import { NextResponse } from "next/server";
import { z } from "zod";


const bodyParser = z.object({
    chapterId: z.string(),
    boolValue: z.boolean(),
    courseId: z.string()
  });

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { chapterId,boolValue} = bodyParser.parse(body);
    console.log("bool",boolValue)
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });
    if (!chapter) {
      return NextResponse.json(
        {
          success: false,
          error: "Chapter not found",
        },
        { status: 404 }
      );
    }
  
      chapter.completed = true;
      await prisma.chapter.update({
        where: {
          id: chapterId,
        },
        data: {
            completed: boolValue,
        },
      });
      



    return NextResponse.json({ message: "Updatation successfull" });
  } catch (error) {
    console.error(error);
    return new NextResponse("Updation Not Successful", { status: 400 });
  }
}
