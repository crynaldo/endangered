"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Globe, Leaf, Shield, CheckCircle, XCircle, RotateCcw } from "lucide-react"
import { useInView } from "react-intersection-observer"

export default function EndangeredSpeciesWebsite() {
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollY, setScrollY] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Intersection observers for each section
  const { ref: heroInViewRef, inView: heroInView } = useInView({ threshold: 0.3 })
  const { ref: aboutInViewRef, inView: aboutInView } = useInView({ threshold: 0.3 })
  const { ref: causesInViewRef, inView: causesInView } = useInView({ threshold: 0.3 })
  const { ref: speciesInViewRef, inView: speciesInView } = useInView({ threshold: 0.3 })
  const { ref: whyCareInViewRef, inView: whyCareInView } = useInView({ threshold: 0.3 })
  const { ref: quizInViewRef, inView: quizInView } = useInView({ threshold: 0.3 })
  const { ref: helpInViewRef, inView: helpInView } = useInView({ threshold: 0.3 })

  // Update active section based on scroll
  useEffect(() => {
    if (heroInView) setActiveSection("hero")
    else if (aboutInView) setActiveSection("about")
    else if (causesInView) setActiveSection("causes")
    else if (speciesInView) setActiveSection("species")
    else if (whyCareInView) setActiveSection("whyCare")
    else if (quizInView) setActiveSection("quiz")
    else if (helpInView) setActiveSection("help")
  }, [heroInView, aboutInView, causesInView, speciesInView, whyCareInView, quizInView, helpInView])

  // Quiz questions
  const quizQuestions = [
    {
      question: "How many Amur Leopards are left? 🐆",
      options: ["1,000", "120", "500", "2,000"],
      correct: 1,
      explanation: "Only 120 left! 😱",
    },
    {
      question: "Biggest threat to animals? 🏠",
      options: ["Climate", "Pollution", "Habitat Loss", "Disease"],
      correct: 2,
      explanation: "Habitat loss! 🌳💔",
    },
    {
      question: "Most endangered sea animal? 🌊",
      options: ["Blue Whale", "Vaquita", "Dolphin", "Sea Turtle"],
      correct: 1,
      explanation: "Vaquita! Only 10 left! 😭",
    },
  ]

  const endangeredAnimals = [
    {
      name: "Amur Leopard",
      status: "CRITICAL",
      population: "120 LEFT",
      image: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=500&h=300&fit=crop&auto=format",
      funFact: "Jump 10 feet! 🦘",
    },
    {
      name: "Black Rhino",
      status: "CRITICAL",
      population: "5,500 LEFT",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&h=300&fit=crop&auto=format",
      funFact: "Run 35 mph! 🚴‍♂️",
    },
    {
      name: "Vaquita",
      status: "CRITICAL",
      population: "10 LEFT!!!",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop&auto=format",
      funFact: "Little cows! 🐄",
    },
    {
      name: "Orangutan",
      status: "CRITICAL",
      population: "104,000 LEFT",
      image: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=500&h=300&fit=crop&auto=format",
      funFact: "97% human DNA! 🧬",
    },
  ]

  const causes = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Habitat Loss",
      emoji: "🏠💔",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Climate Change",
      emoji: "🌡️🔥",
    },
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      title: "Poaching",
      emoji: "🚫🔫",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Pollution",
      emoji: "🗑️☠️",
    },
  ]

  const whyCare = [
    {
      title: "Every Animal Matters",
      emoji: "🌟",
    },
    {
      title: "Nature Needs Balance",
      emoji: "⚖️",
    },
    {
      title: "Animals = Medicine",
      emoji: "💊",
    },
    {
      title: "It's Right Thing",
      emoji: "❤️",
    },
  ]

  const howToHelp = [
    "Don't buy animal products",
    "Recycle & don't litter",
    "Learn & tell others",
    "Donate money",
    "Use less electricity",
    "Choose eco-friendly",
  ]

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const slideIn = {
    hidden: { x: -60, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
  }

  const scaleUp = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  }

  // Quiz functions
  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
  }

  // Scroll to section function
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80"></div>
        <div
          className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0f172a1a 1px, transparent 1px), linear-gradient(to bottom, #0f172a1a 1px, transparent 1px)",
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-800 bg-black/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Shield className="h-8 w-8 text-cyan-400" />
              </motion.div>
              <motion.span
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
              >
                Endangered Species
              </motion.span>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 border-0">
                Help Animals! 🦎
              </Button>
            </motion.div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroInViewRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <div className="space-y-6">
                <motion.div variants={slideIn}>
                  <Badge className="bg-red-900/50 text-red-400 border-2 border-red-500/50 hover:bg-red-900/50 px-3 py-1 text-lg">
                    🚨 URGENT! 🚨
                  </Badge>
                </motion.div>
                <motion.h1
                  className="text-5xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                  variants={fadeIn}
                >
                  Endangered Species
                </motion.h1>
                <motion.p className="text-2xl lg:text-3xl text-gray-100 font-medium" variants={fadeIn}>
                  Animals Disappearing Forever! 😢
                </motion.p>
                <motion.div
                  className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border-2 border-gray-800"
                  variants={fadeIn}
                >
                  <p className="text-cyan-400 font-semibold mb-2 text-lg">Made by:</p>
                  <div className="space-y-1">
                    <p className="text-white text-xl">👨‍🎓 Miguel Simões</p>
                    <p className="text-white text-xl">👨‍🎓 Rodrigo Silva</p>
                    <p className="text-white text-xl">👨‍🎓 Pedro Silva</p>
                  </div>
                  <p className="text-gray-200 text-base mt-2">8th Grade English Class</p>
                </motion.div>
              </div>
              <motion.div
                className="grid grid-cols-3 gap-6 pt-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {[
                  { value: "41,415", label: "In Danger", color: "red", emoji: "😰" },
                  { value: "16,306", label: "Big Trouble", color: "orange", emoji: "😱" },
                  { value: "8,404", label: "Almost Gone", color: "red", emoji: "💀" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 rounded-lg bg-gray-900/50 backdrop-blur-sm border-2 border-gray-800"
                    variants={scaleUp}
                    whileHover={{
                      boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <motion.div
                      className={`text-2xl font-bold text-${stat.color}-500`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                    >
                      {stat.emoji} {stat.value}
                    </motion.div>
                    <motion.div
                      className="text-sm text-gray-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.2, duration: 0.5 }}
                    >
                      {stat.label}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, rotateY: 30 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.div
                className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 opacity-75 blur-sm"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              ></motion.div>
              <Image
                src="https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=600&h=600&fit=crop&auto=format"
                alt="Endangered tiger"
                width={600}
                height={600}
                className="rounded-2xl relative z-10 border-2 border-gray-800"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Are Endangered Species */}
      <section id="about" ref={aboutInViewRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <motion.h2
                className="text-4xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
                variants={fadeIn}
              >
                What Are They? 🤔
              </motion.h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8 mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              {[
                {
                  title: "CRITICAL",
                  color: "red",
                  emoji: "🚨",
                },
                {
                  title: "ENDANGERED",
                  color: "orange",
                  emoji: "⚠️",
                },
                {
                  title: "VULNERABLE",
                  color: "yellow",
                  emoji: "⚡",
                },
              ].map((category, index) => (
                <motion.div key={index} variants={scaleUp} whileHover={{ scale: 1.05 }}>
                  <Card className="border-2 border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden h-48">
                    <CardHeader className="p-6">
                      <CardTitle className={`text-${category.color}-400 text-center text-3xl`}>
                        {category.emoji}
                      </CardTitle>
                      <CardTitle className={`text-${category.color}-400 text-center text-xl mt-2`}>
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Causes of Endangerment */}
      <section id="causes" ref={causesInViewRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <motion.h2
              className="text-4xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
              variants={fadeIn}
            >
              Why Danger? 😰
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {causes.map((cause, index) => (
              <motion.div key={index} variants={scaleUp} whileHover={{ scale: 1.05, y: -5 }}>
                <Card className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-800 overflow-hidden h-full">
                  <CardHeader className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{cause.emoji}</div>
                      <motion.div
                        className="text-cyan-400 mb-4 flex justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {cause.icon}
                      </motion.div>
                    </div>
                    <CardTitle className="text-white text-center text-lg">{cause.title}</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Examples of Endangered Species */}
      <section id="species" ref={speciesInViewRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <motion.h2
              className="text-4xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
              variants={fadeIn}
            >
              Animals! 🐾
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {endangeredAnimals.map((animal, index) => (
              <motion.div key={index} variants={scaleUp} whileHover={{ scale: 1.02 }}>
                <Card className="overflow-hidden bg-gray-900/50 backdrop-blur-sm border-2 border-gray-800">
                  <motion.div
                    className="aspect-video relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image src={animal.image || "/placeholder.svg"} alt={animal.name} fill className="object-cover" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-900/70 text-red-300 border-2 border-red-500/50 text-sm">
                        {animal.status}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-purple-900/70 text-purple-300 border-2 border-purple-500/50 text-sm">
                        {animal.funFact}
                      </Badge>
                    </div>
                  </motion.div>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl text-cyan-300">{animal.name}</CardTitle>
                      <span className="text-lg text-red-400 font-bold">{animal.population}</span>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Should We Care */}
      <section id="whyCare" ref={whyCareInViewRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <motion.h2
              className="text-4xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
              variants={fadeIn}
            >
              Why Care? 💭
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {whyCare.map((reason, index) => (
              <motion.div key={index} variants={scaleUp} whileHover={{ scale: 1.05, y: -5 }}>
                <Card className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-800 h-full">
                  <CardHeader className="p-6">
                    <CardTitle className="flex flex-col items-center gap-3 text-white text-center text-lg">
                      <div className="text-4xl">{reason.emoji}</div>
                      <div>{reason.title}</div>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" ref={quizInViewRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <motion.h2
              className="text-4xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
              variants={fadeIn}
            >
              Quiz! 🧠
            </motion.h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {!quizCompleted ? (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-800 overflow-hidden">
                  <CardHeader className="p-6">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-2xl text-cyan-300">Question {currentQuestion + 1}</CardTitle>
                      <Badge className="bg-purple-900/70 text-purple-300 text-lg">Score: {score}</Badge>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 mt-4">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <h3 className="text-2xl text-white mb-6">{quizQuestions[currentQuestion].question}</h3>

                    <div className="grid gap-3 mb-6">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={showResult}
                          className={`p-4 rounded-lg border-2 text-left transition-all text-lg ${
                            showResult
                              ? index === quizQuestions[currentQuestion].correct
                                ? "bg-green-900/50 border-green-500 text-green-300"
                                : index === selectedAnswer
                                  ? "bg-red-900/50 border-red-500 text-red-300"
                                  : "bg-gray-800 border-gray-700 text-gray-400"
                              : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-cyan-500"
                          }`}
                          whileHover={!showResult ? { scale: 1.02 } : {}}
                          whileTap={!showResult ? { scale: 0.98 } : {}}
                        >
                          <div className="flex items-center gap-3">
                            {showResult && index === quizQuestions[currentQuestion].correct && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            {showResult &&
                              index === selectedAnswer &&
                              index !== quizQuestions[currentQuestion].correct && (
                                <XCircle className="h-5 w-5 text-red-500" />
                              )}
                            <span>{option}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-blue-950/30 rounded-lg p-4 border-2 border-blue-800/50 mb-6"
                      >
                        <p className="text-blue-300 text-lg text-center">
                          💡 {quizQuestions[currentQuestion].explanation}
                        </p>
                      </motion.div>
                    )}

                    {showResult && (
                      <div className="text-center">
                        <Button
                          onClick={nextQuestion}
                          className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                        >
                          {currentQuestion < quizQuestions.length - 1 ? "Next! 👉" : "Results! 🎉"}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-800 overflow-hidden">
                  <CardHeader className="p-6">
                    <CardTitle className="text-3xl text-center text-cyan-300">Complete! 🎉</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center p-6">
                    <div className="text-6xl mb-4">
                      {score === quizQuestions.length ? "🏆" : score >= 2 ? "🌟" : "📚"}
                    </div>
                    <h3 className="text-2xl text-white mb-4">
                      Score: {score}/{quizQuestions.length}!
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        onClick={resetQuiz}
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Again! 🔄
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* How to Help */}
      <section id="help" ref={helpInViewRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <motion.h2
              className="text-4xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
              variants={fadeIn}
            >
              How Help? 🙋‍♀️
            </motion.h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="grid md:grid-cols-2 gap-6 mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {howToHelp.map((action, index) => (
                <motion.div
                  key={index}
                  variants={slideIn}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                  }}
                >
                  <div className="flex items-start gap-4 p-6 bg-gray-900/50 backdrop-blur-sm rounded-lg border-2 border-gray-800">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-100 text-lg">{action}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center rounded-2xl p-8 overflow-hidden relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <div className="absolute inset-0 border-2 border-gray-700 rounded-2xl bg-gradient-to-r from-cyan-600/20 to-purple-600/20"></div>
              <div className="relative z-10">
                <motion.h3 className="text-3xl font-bold mb-4 text-white" variants={fadeIn}>
                  Be Hero! 🦸‍♀️
                </motion.h3>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div variants={slideIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-white text-gray-900 hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                      Start! 🚀
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-300 py-12 relative z-10 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                Endangered Species
              </span>
            </div>
            <p className="text-gray-400 mb-4 text-lg">Every animal matters! 🐾 Let's save them! 💪</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Made with ❤️ by Miguel, Rodrigo & Pedro</p>
              <p>8th Grade English Project 📚</p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
