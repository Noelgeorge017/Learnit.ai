'use client'
import { useState } from 'react';
//import Modal from 'react-modal';
import { useChat } from 'ai/react'
import { getAuthSession } from "@/lib/auth";
import { useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import CopyToClipboard from '@/components/Copytoclipboard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { CopyIcon } from "@radix-ui/react-icons"
 

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MessageCircleWarning, SendHorizontalIcon } from 'lucide-react';

export function DialogCloseButton() {
  //const session = await getAuthSession();
  const ref = useRef<HTMLDivElement>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      initialMessages: [
        {
          id: Date.now().toString(),
          role: 'system',
          content: 'You are an assistant of the organisation Learnit.ai give medium length answers only  also focus more on solving student doubts .'
        }
      ]
    })

  useEffect(() => {
    if (ref.current === null) return
    ref.current.scrollTo(0, ref.current.scrollHeight)
    // ref.current.scrollTop = ref.current.scrollHeight
  }, [messages])
  return (
    <div className='bg-white-900'>
    <Dialog>
      
      <DialogTrigger asChild>
      <div className="fixed bottom-0 right-0 flex items-center justify-center p-4">
        <Button  variant="outline" className="bg-blue-500 text-white py-2 px-4 rounded-md font-medium">Any Doubts?</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
      
          <DialogDescription>
          <section className='text-white bg-white-900'>
      <div className='container flex h-full flex-col items-center justify-center mt-2 mb-2'>
        
        <h1 className='text-4xl mb-4 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-4xl text-transparent bg-gradient-to-r from-purple-400 via-cyan-500 to-blue-500 bg-clip-text bg-repeat-no-repeat bg-size-500% animate-text-shine'>Studypal</h1>
        
        <div className='mt-4 w-full max-w-lg h-full'>
          <ScrollArea
           className='h-[480px] rounded-md border'
            
            ref={ref}
          >
            {error && (
              <div className='text-sm text-red-400'>{error.message}</div>
            )}
            {messages.map(m => (
              <div key={m.id} className='mr-6 whitespace-pre-wrap md:mr-12 mt-4 ml-4'>
                {m.role === 'user' && (
                  <div className='mb-6 flex gap-2'>
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='text-white bg-violet-500 '>Y</AvatarFallback>
                    </Avatar>
                    <div className='mt-2'>
                      <p className='font-semibold text-white'>You</p>
                      <div className='mt-2 text-sm text-white'>
                        {m.content}
                      </div>
                    </div>
                  </div>
                  
                )}

                {m.role === 'assistant' && (
                  <div className='mb-4 flex gap-2'>
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='bg-emerald-500 text-white '>
                        SP
                      </AvatarFallback>
                    </Avatar>
                    <div className='mt-2 w-full'>
                      <div className='flex justify-between'>
                        <p className='font-semibold text-white'>Studypal</p>
                        <CopyToClipboard message={m} className='-mt-1 ' />
                      </div>
                      <div className='mt-4 text-white'>
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>

          <form onSubmit={handleSubmit} className='relative'>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder='Ask me your Doubts...'
              className='pr-12 placeholder:italic placeholder:text-white focus-visible:ring-zinc-500 mt-6'
            />
            <Button
              size='icon'
              type='submit'
              variant='secondary'
              disabled={isLoading}
              className='absolute right-1 top-1 h-8 w-10'
            >
              <SendHorizontalIcon className='h-5 w-5 text-emerald-500' />
            </Button>
          </form>
        </div>
      </div>
    </section>
          </DialogDescription>
       
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <label htmlFor="link" className="sr-only">
              Link
            </label>
            
          </div>
         
        </div>
        <DialogFooter className="sm:justify-start">
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}




