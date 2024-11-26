'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

const coursesData = {
  mathematics: {
    title: "Mathematics",
    chapters: [
      { id: 1, title: "Introduction to Algebra", lessons: 10 },
      { id: 2, title: "Geometry Basics", lessons: 8 },
      { id: 3, title: "Calculus Fundamentals", lessons: 12 },
    ]
  },
  japanese: {
    title: "Japanese",
    chapters: [
      { id: 1, title: "Introduction to Japanese", lessons: 5 },
      { id: 2, title: "Hiragana Writing System", lessons: 10 },
      { id: 3, title: "Basic Greetings and Phrases", lessons: 8 },
    ]
  },
  science: {
    title: "Science",
    chapters: [
      { id: 1, title: "Introduction to Physics", lessons: 10 },
      { id: 2, title: "Chemistry Basics", lessons: 8 },
      { id: 3, title: "Biology Fundamentals", lessons: 12 },
    ]
  },
}

type CourseKey = keyof typeof coursesData;

export default function CourseChaptersPage() {
    const router = useRouter();
    const { courseSlug } = useParams();
  
    if (typeof courseSlug !== "string") {
      return <div>Invalid course slug</div>;
    }
  
    const course = coursesData[courseSlug as CourseKey];
  
    if (!course) {
      return <div>Course not found</div>;
    }
  
    const handleChapterClick = (chapterId: number) => {
      router.push(`/courses/${courseSlug}/${chapterId}`);
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <header className="py-24 px-4 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {course.title} Course Chapters
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our comprehensive {course.title} curriculum
          </motion.p>
        </header>
        <main className="max-w-6xl mx-auto py-16 px-4">
          <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8">
            <ArrowLeft className="mr-2" />
            Back to Categories
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {course.chapters.map((chapter, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="bg-white hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => handleChapterClick(chapter.id)}
                >
                  <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    <CardTitle className="text-xl font-semibold">{chapter.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Badge
                      variant="secondary"
                      className="bg-indigo-100 text-indigo-700 group-hover:bg-indigo-200 transition-colors duration-300"
                    >
                      {chapter.lessons} lessons
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    );
  }
  