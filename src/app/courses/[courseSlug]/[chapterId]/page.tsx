'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const coursesData = {
  mathematics: {
    title: "Mathematics",
    chapters: [
      { 
        id: 1, 
        title: "Introduction to Algebra", 
        lessons: 10,
        description: "This chapter introduces you to the basics of algebra, including variables, expressions, and equations.",
        topics: [
          "Understanding variables",
          "Algebraic expressions",
          "Solving simple equations",
          "Introduction to functions",
          "Real-world applications of algebra"
        ]
      },
      // ... other chapters ...
    ]
  },
  japanese: {
    title: "Japanese",
    chapters: [
      { 
        id: 1, 
        title: "Introduction to Japanese", 
        lessons: 5,
        description: "This chapter introduces you to the basics of Japanese language and culture. You'll learn about the importance of Japanese in the global context and get an overview of what to expect in this course.",
        topics: [
          "Overview of Japanese language",
          "Brief history of Japan",
          "Japanese writing systems: Hiragana, Katakana, and Kanji",
          "Basic pronunciation rules",
          "Introduction to Japanese etiquette"
        ]
      },
      // ... other chapters ...
    ]
  },
  science: {
    title: "Science",
    chapters: [
      { 
        id: 1, 
        title: "Introduction to Physics", 
        lessons: 10,
        description: "This chapter introduces you to the fundamental concepts of physics, including motion, forces, and energy.",
        topics: [
          "Understanding the scientific method",
          "Basic concepts of motion",
          "Newton's laws of motion",
          "Energy and work",
          "Introduction to thermodynamics"
        ]
      },
      // ... other chapters ...
    ]
  },
}

type CourseKey = keyof typeof coursesData;
type Chapter = typeof coursesData[CourseKey]["chapters"][number];

export default function ChapterDetailPage() {
    const { courseSlug, chapterId } = useParams();
    const [chapter, setChapter] = useState<Chapter | null>(null);
  
    useEffect(() => {
      if (typeof courseSlug !== "string" || typeof chapterId !== "string") return;
  
      const course = coursesData[courseSlug as CourseKey];
      if (course) {
        const foundChapter = course.chapters.find((c) => c.id === parseInt(chapterId, 10));
        setChapter(foundChapter || null);
      }
    }, [courseSlug, chapterId]);
  
    if (!chapter) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <header className="py-24 px-4 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <motion.h1 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {chapter.title}
          </motion.h1>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {coursesData[courseSlug as CourseKey]?.title} - Chapter {chapter.id}
          </motion.p>
        </header>
        <main className="max-w-4xl mx-auto py-16 px-4">
          <Link href={`/courses/${courseSlug}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8">
            <ArrowLeft className="mr-2" />
            Back to Chapters
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white shadow-xl mb-8">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <CardTitle className="text-2xl font-semibold">Chapter Overview</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-700 mb-4">{chapter.description}</p>
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                  {chapter.lessons} lessons
                </Badge>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <CardTitle className="text-2xl font-semibold">Topics Covered</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="list-disc list-inside space-y-2">
                  {chapter.topics.map((topic, index) => (
                    <motion.li 
                      key={index} 
                      className="text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {topic}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    );
  }