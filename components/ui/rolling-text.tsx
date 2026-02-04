"use client"

import { motion, type Transition, type UseInViewOptions, useInView } from "motion/react"
import * as React from "react"
import { cn } from "@/lib/utils"

const ENTRY_ANIMATION = {
  initial: { rotateX: 0 },
  animate: { rotateX: 90 },
}

const EXIT_ANIMATION = {
  initial: { rotateX: 90 },
  animate: { rotateX: 0 },
}

const formatCharacter = (char: string) => (char === " " ? "\u00A0" : char)

type RollingTextProps = Omit<React.ComponentProps<"span">, "children"> & {
  transition?: Transition
  inView?: boolean
  inViewMargin?: UseInViewOptions["margin"]
  inViewOnce?: boolean
  text: string
  highlightWords?: string[]
  highlightClassName?: string
  repeatInterval?: number // milliseconds between animation repeats
}

function RollingText({
  ref,
  transition = { duration: 0.5, delay: 0.1, ease: "easeOut" },
  inView = false,
  inViewMargin = "0px",
  inViewOnce = true,
  text,
  highlightWords = [],
  highlightClassName = "text-primary",
  repeatInterval,
  className,
  ...props
}: RollingTextProps) {
  const localRef = React.useRef<HTMLSpanElement>(null)
  React.useImperativeHandle(ref as any, () => localRef.current!)

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  })
  const isInView = !inView || inViewResult

  // Animation cycle counter for repeating
  const [animationKey, setAnimationKey] = React.useState(0)

  React.useEffect(() => {
    if (!repeatInterval || !isInView) return

    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1)
    }, repeatInterval)

    return () => clearInterval(interval)
  }, [repeatInterval, isInView])

  // Parse text into words with their character indices
  const wordsWithIndices = React.useMemo(() => {
    const words: { word: string; startIdx: number; isHighlighted: boolean }[] = []
    let currentWord = ""
    let wordStartIdx = 0

    for (let i = 0; i <= text.length; i++) {
      const char = text[i]
      if (char === " " || i === text.length) {
        if (currentWord) {
          const cleanWord = currentWord.replace(/[.,!?]/g, "")
          const isHighlighted = highlightWords.some(
            hw => cleanWord.toLowerCase() === hw.toLowerCase() || 
                  currentWord.toLowerCase() === hw.toLowerCase()
          )
          words.push({ word: currentWord, startIdx: wordStartIdx, isHighlighted })
        }
        if (char === " ") {
          words.push({ word: " ", startIdx: i, isHighlighted: false })
        }
        currentWord = ""
        wordStartIdx = i + 1
      } else {
        currentWord += char
      }
    }
    return words
  }, [text, highlightWords])

  let charIndex = 0

  return (
    <span data-slot="rolling-text" className={cn(className)} {...(props as any)} ref={localRef} key={animationKey}>
      {wordsWithIndices.map((wordData, wordIdx) => {
        const characters = wordData.word.split("")
        const wordStartCharIdx = charIndex
        charIndex += characters.length

        return (
          <span 
            key={wordIdx} 
            className={cn(
              "inline-block whitespace-nowrap",
              wordData.isHighlighted && highlightClassName
            )}
          >
            {characters.map((char, idx) => {
              const globalCharIdx = wordStartCharIdx + idx
              return (
                <span
                  aria-hidden="true"
                  className="relative inline-block perspective-[9999999px] transform-3d w-auto"
                  key={idx}
                >
                  <motion.span
                    animate={isInView ? ENTRY_ANIMATION.animate : undefined}
                    className="absolute inline-block backface-hidden origin-[50%_25%]"
                    initial={ENTRY_ANIMATION.initial}
                    transition={{
                      ...transition,
                      delay: globalCharIdx * (transition?.delay ?? 0),
                    }}
                  >
                    {formatCharacter(char)}
                  </motion.span>
                  <motion.span
                    animate={isInView ? EXIT_ANIMATION.animate : undefined}
                    className="absolute inline-block backface-hidden origin-[50%_100%]"
                    initial={EXIT_ANIMATION.initial}
                    transition={{
                      ...transition,
                      delay: globalCharIdx * (transition?.delay ?? 0) + 0.3,
                    }}
                  >
                    {formatCharacter(char)}
                  </motion.span>
                  <span className="invisible">{formatCharacter(char)}</span>
                </span>
              )
            })}
          </span>
        )
      })}

      <span className="sr-only">{text}</span>
    </span>
  )
}

export { RollingText, type RollingTextProps }
export default RollingText
