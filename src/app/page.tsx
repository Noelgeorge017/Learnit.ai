"use client"
import Link from "next/link";
import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';


// Replace with the correct path tour image
import imageSrc from "./images/img.png";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { getAuthSession } from "@/lib/auth";

export default async function Component() {


 

  return (
    <section>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 lg:flex-row-reverse">
          {/* Image on the left side */}
          <div className="w-full lg:w-1/2">
            <Image
              src={imageSrc}
              alt="Learnit.AI image"
              className="w-full h-90 object-cover rounded-lg lg:w-1/7"
            />
          </div>

          {/* Text content on the right side with type animation */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="space-y-2 mt-3">
              <h1 className="text-3xl mb-4 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-transparent bg-gradient-to-r from-purple-400 via-cyan-500 to-blue-500 bg-clip-text bg-repeat-no-repeat bg-size-500% animate-text-shine">
                Welcome to Learnit.AI
              </h1>

              {/* Use TypeAnimation for each text segment */}
              
                <TypeAnimation
                      sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Learnit.ai    provide Simple Steps, Structured Learning',
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                        'Learnit.ai    Learn Anytime, Anywhere - Your Classroom on the Go',
                        1000,
                        'Learnit.ai    Effortless Learning: Join, Explore, Master',
                        1000,
                        'Learnit.ai       Flexible Learning Paths, Unlimited Possibilities',
                        1000
                      ]}
                      wrapper="span"
                      speed={50}
                      style={{ fontSize: '2em', display: 'inline-block' }}
                      repeat={Infinity}
                    />

            
              
            </div>
            <div className="space-x-4">
              {/* <Button
                className="inline-flex mt-5 h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            
                onClick={()=>{
                  signIn("google")

                }}
              >
                Sign In to Create a Course
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}