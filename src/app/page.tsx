"use client";
import Link from "next/link";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/components/ui/button";
// Replace with the correct path to your image
import imageSrc from "./images/img.png";

export default function Component() {
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
                  "Learnit.ai    provide Simple Steps, Structured Learning",
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  "Learnit.ai    Learn Anytime, Anywhere - Your Classroom on the Go",
                  1000,
                  "Learnit.ai    Effortless Learning: Join, Explore, Master",
                  1000,
                  "Learnit.ai       Flexible Learning Paths, Unlimited Possibilities",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: "2em", display: "inline-block" }}
                repeat={Infinity}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-gray-1100 text-white">
          <section className="container mx-auto px-4 py-16 flex flex-col items-center">
            <h1 className="text-2xl py-6 mb-4 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-transparent bg-gradient-to-r from-purple-400 via-cyan-500 to-blue-500 bg-clip-text bg-repeat-no-repeat bg-size-500% animate-text-shine">
              Flexible & Limitless Learning <br /> Craft your learning journey
              ...
            </h1>
          </section>
          <div>
            <div className="flex justify-center items-center py-20 space-x-8">
              <div className="text-center ">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 via-purple-500 mb-4">
                  Seamless Learning
                </h2>
                <p className="text-lg">
                  Engage in learning using our <br /> curated course structure.
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 via-purple-500 mb-4">
                  Customized Experience
                </h2>
                <p className="text-lg">
                  Learning crafted to your <br /> preferences and study goals .
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 via-purple-500 mb-4">
                  Flexible interface
                </h2>
                <p className="text-lg">
                  All-round learning with <br /> lectures, summary, quizzes etc.
                </p>
              </div>
            </div>
          </div>

          <footer className="bg-gray-950 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <div className="text-white">
                  <p>© 2023 Learnit.ai. All rights reserved.</p>
                </div>
                <div className="flex space-x-6">
                  <a className="text-gray-400 hover:text-white" href="#">
                    Privacy Policy
                  </a>
                  <a className="text-gray-400 hover:text-white" href="#">
                    Terms of Service
                  </a>
                  <a className="text-gray-400 hover:text-white" href="#">
                    Support
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
