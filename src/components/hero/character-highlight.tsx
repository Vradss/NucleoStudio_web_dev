'use client'

import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useRef } from 'react';
import styles from './character-highlight.module.css';

interface CharacterHighlightProps {
  paragraph?: string
}

function Paragraph({paragraph = "Hacemos que tu producto se entienda en el lenguaje de tus clientes, para que digan 'esto es lo que necesito' desde la primera interacción"}) {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"]
  })

  // Secuencia de palabras que deben ser destacadas (solo esta frase completa)
  const highlightPhrase = ['esto', 'es', 'lo', 'que', 'necesito']
  
  // Función para limpiar palabras de comillas y signos de puntuación
  const cleanWord = (word: string) => {
    return word.replace(/['",.!?;:]/g, '').toLowerCase()
  }

  const words = paragraph.split(" ")
  
  // Función para determinar si una palabra está en la secuencia destacada
  const getIsHighlighted = (index: number): boolean => {
    // Verificar si desde este índice hacia adelante forma la secuencia completa
    if (index + highlightPhrase.length > words.length) {
      return false
    }
    
    // Verificar si las siguientes palabras coinciden con la secuencia
    for (let i = 0; i < highlightPhrase.length; i++) {
      const cleanedWord = cleanWord(words[index + i])
      if (cleanedWord !== highlightPhrase[i]) {
        return false
      }
    }
    
    return true
  }
  
  // Determinar qué palabras están destacadas y agruparlas
  const highlightedIndices = new Set<number>()
  let highlightStartIndex = -1
  let highlightEndIndex = -1
  
  for (let i = 0; i <= words.length - highlightPhrase.length; i++) {
    if (getIsHighlighted(i)) {
      // Marcar todas las palabras de la secuencia
      highlightStartIndex = i
      highlightEndIndex = i + highlightPhrase.length - 1
      for (let j = 0; j < highlightPhrase.length; j++) {
        highlightedIndices.add(i + j)
      }
      // Saltar las palabras que ya marcamos
      i += highlightPhrase.length - 1
      break // Solo queremos la primera ocurrencia
    }
  }
  
  // Crear grupos de palabras: antes, destacada, después
  const renderWords = () => {
    const elements: React.ReactNode[] = []
    
    for (let i = 0; i < words.length; i++) {
      const start = i / words.length
      const end = start + (1 / words.length)
      const isHighlighted = highlightedIndices.has(i)
      
      if (isHighlighted && i === highlightStartIndex) {
        /**
         * SECCIÓN: Frase destacada "esto es lo que necesito"
         * 
         * Esta sección agrupa todas las palabras de la frase destacada en un solo grupo
         * para que se animen juntas y se mantengan unidas visualmente.
         * Las palabras mantienen su formato original (sin conversión a mayúsculas).
         */
        
        // Inicio de la frase destacada - agrupar todas juntas
        const highlightedWords: React.ReactNode[] = []
        for (let j = 0; j < highlightPhrase.length; j++) {
          const wordIndex = i + j
          const wordStart = wordIndex / words.length
          const wordEnd = wordStart + (1 / words.length)
          
          // CÓDIGO ANTERIOR - Comentado: conversión a mayúsculas eliminada
          // const wordText = words[wordIndex].toUpperCase()
          
          // Usar la palabra original sin convertir a mayúsculas
          const wordText = words[wordIndex]
          
          highlightedWords.push(
            <Word 
              key={wordIndex} 
              progress={scrollYProgress} 
              range={[wordStart, wordEnd]} 
              isHighlighted={true}
              keepTogether={true}
            >
              {wordText}
            </Word>
          )
        }
        
        /**
         * CÓDIGO ANTERIOR - Comentado para referencia:
         * 
         * // Versión anterior sin salto de línea condicional
         * // elements.push(
         * //   <span key={`group-${i}`} className={styles.highlightGroup}>
         * //     {highlightedWords}
         * //   </span>
         * // )
         */
        
        /**
         * Renderizar el grupo destacado con salto de línea solo en desktop
         * - En móvil: el texto continúa en la misma línea
         * - En desktop (lg: 1024px+): se fuerza un salto de línea después de la frase destacada
         * El elemento span invisible ocupa todo el ancho (w-full basis-full) para forzar
         * el salto de línea en un contenedor flex
         */
        elements.push(
          <React.Fragment key={`group-${i}`}>
            {/* 
             * CONTENEDOR DE LA FRASE DESTACADA "ESTO ES LO QUE NECESITO"
             * 
             * Aquí puedes cambiar la fuente agregando clases de Tailwind:
             * - font-geist-super: fuente superbold
             * - font-artifictrial-regular: fuente regular
             * - font-geist-semibold: fuente semibold (actual del párrafo)
             * - font-space-mono: fuente monoespaciada
             * 
             * Ejemplo para cambiar a superbold: className={`${styles.highlightGroup} font-geist-super`}
             */}
            <span className={`${styles.highlightGroup} font-geist-super`}>
              {highlightedWords}
            </span>
            {/* Salto de línea solo en desktop - ocupa todo el ancho para forzar salto */}
            <span className="hidden lg:block w-full basis-full" style={{ height: 0 }} aria-hidden="true" />
          </React.Fragment>
        )
        i += highlightPhrase.length - 1 // Saltar las palabras ya procesadas
      } else if (!isHighlighted) {
        // Palabra normal
        elements.push(
          <Word 
            key={i} 
            progress={scrollYProgress} 
            range={[start, end]} 
            isHighlighted={false}
          >
            {words[i]}
          </Word>
        )
      }
    }
    
    return elements
  }
  
  return (
    <p 
      ref={container}         
      className={`${styles.paragraph} font-geist-semibold`}
    >
      {renderWords()}
    </p>
  )
}

export function CharacterHighlight({ paragraph }: CharacterHighlightProps) {
  return (
    <section className="section-layout relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="section-container relative z-10">
        <Paragraph paragraph={paragraph} />
      </div>
    </section>
  )
}

export default Paragraph

interface WordProps {
  children: string
  progress: any
  range: [number, number]
  isHighlighted?: boolean
  keepTogether?: boolean
}

const Word = ({children, progress, range, isHighlighted = false, keepTogether = false}: WordProps) => {
  const amount = range[1] - range[0]
  const step = amount / children.length
  
  return (
    <span className={styles.word}>
      {
        children.split("").map((char, i) => {
          const start = range[0] + (i * step);
          const end = range[0] + ((i + 1) * step)
          return <Char key={`c_${i}`} progress={progress} range={[start, end]} isHighlighted={isHighlighted}>{char}</Char>
        })
      }
    </span>
  )
}

interface CharProps {
  children: string
  progress: any
  range: [number, number]
  isHighlighted?: boolean
}

const Char = ({children, progress, range, isHighlighted = false}: CharProps) => {
  const opacity = useTransform(progress, range, [0,1])
  const highlightColor = "var(--nucleo-highlight)"
  
  return (
    <span>
      <span 
        className={styles.shadow}
        style={isHighlighted ? { color: highlightColor } : {}}
      >
        {children}
      </span>
      <motion.span 
        style={{
          opacity: opacity,
          ...(isHighlighted && { color: highlightColor })
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}
