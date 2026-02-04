"use client"

import { motion, stagger, useAnimate } from "motion/react"
import * as React from "react"
import { cn } from "@/lib/utils"

type TextGenerateEffectProps = Omit<React.ComponentProps<"div">, "children"> & {
  words: string
  filter?: boolean
  duration?: number
  staggerDelay?: number
  highlightWords?: string[] // Words to highlight with primary color
  highlightClassName?: string
}

function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
  staggerDelay = 0.2,
  highlightWords = [],
  highlightClassName = "text-primary",
  ...props
}: TextGenerateEffectProps) {
  const localRef = React.useRef<HTMLDivElement>(null)

  const [scope, animate] = useAnimate()
  const wordsArray = React.useMemo(() => words.split(" "), [words])

  React.useEffect(() => {
    if (scope.current) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration,
          delay: stagger(staggerDelay),
        },
      )
    }
  }, [animate, duration, filter, scope, staggerDelay])

  // Check if a word should be highlighted
  const shouldHighlight = (word: string, idx: number) => {
    // Check if the word (without punctuation) is in highlightWords
    const cleanWord = word.replace(/[.,!?]/g, "")
    return highlightWords.some(hw => 
      cleanWord.toLowerCase() === hw.toLowerCase() || 
      word.toLowerCase() === hw.toLowerCase()
    )
  }

  return (
    <div
      className={cn("font-bold", className)}
      data-slot="text-generate-effect"
      ref={localRef}
      {...props}
    >
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            className={cn(
              "opacity-0 will-change-[transform,opacity,filter]",
              shouldHighlight(word, idx) && highlightClassName
            )}
            key={`${word}-${idx}`}
            style={{
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

export { TextGenerateEffect, type TextGenerateEffectProps }
export default TextGenerateEffect
