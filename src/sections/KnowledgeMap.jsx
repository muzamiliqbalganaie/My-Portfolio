import React, { useState, useEffect } from 'react'
import ForceGraph from '../components/ForceGraph'
import DevPipeline from '../components/DevPipeline'
import { knowledgeMap } from '../constants/index'

const groups = ['Skill', 'Project', 'Tool']

const StudyPanel = ({ activeStep, steps, onNext, onPrev, onClose }) => {
    if (!steps || steps.length === 0) return null
    const step = steps[activeStep]
    
    return (
        <div className="fixed sm:absolute right-0 sm:right-3 bottom-0 sm:top-3 
            w-full sm:w-80 z-40 bg-gray-900 p-4 rounded-t-2xl sm:rounded-lg 
            shadow-2xl border-t border-l border-r sm:border border-gray-700
            max-h-[60vh] sm:max-h-none overflow-y-auto
            safe-area-inset-bottom">
            
            <button
                onClick={onClose}
                className="sm:hidden absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
            >
                ✕
            </button>
            
            <h3 className="text-white font-bold text-lg sm:text-base m-0 pr-6 sm:pr-0">{step.title}</h3>
            <p className="text-gray-300 mt-3 text-sm">{step.text}</p>
            
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-6 sm:mt-4 gap-2">
                <button
                    onClick={onPrev}
                    disabled={activeStep === 0}
                    className="order-2 sm:order-1 px-4 sm:px-3 py-2 sm:py-1 text-sm sm:text-xs 
                        bg-gray-700 text-white rounded hover:bg-gray-600 
                        disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    ← Prev
                </button>
                
                <div className="flex gap-2 order-1 sm:order-2">
                    <button
                        onClick={onClose}
                        className="hidden sm:block px-3 py-1 text-xs bg-gray-700 text-white rounded 
                            hover:bg-gray-600 transition"
                    >
                        Close
                    </button>
                    <button
                        onClick={onNext}
                        className="flex-1 sm:flex-none px-4 sm:px-3 py-2 sm:py-1 text-sm sm:text-xs 
                            bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'} →
                    </button>
                </div>
            </div>
            
            {/* Step indicator */}
            <div className="mt-4 text-center text-gray-400 text-xs">
                Step {activeStep + 1} of {steps.length}
            </div>
        </div>
    )
}

const KnowledgeMap = () => {
    const [filters, setFilters] = useState(new Set())
    const [highlight, setHighlight] = useState(null)
    const [studyMode, setStudyMode] = useState(false)
    const [step, setStep] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    const steps = [
        { title: 'ER Modeling', text: 'Start with ER Modeling — entities, attributes, relationships.', node: 'ER Modeling' },
        { title: 'Normalization', text: 'Learn normalization to structure your relational data.', node: 'Normalization' },
        { title: 'React + Projects', text: 'See how skills map to real projects in your portfolio.', node: 'Project A' }
    ]

    // Detect mobile/tablet screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (studyMode) setHighlight(steps[step].node)
        else setHighlight(null)
    }, [studyMode, step])

    const toggleFilter = (g) => {
        const next = new Set(filters)
        if (next.has(g)) next.delete(g)
        else next.add(g)
        setFilters(next)
    }

    const onNodeClick = (node) => {
        // toggle highlight on click
        setHighlight(prev => (prev === node.id ? null : node.id))
    }

    return (
        <section className="px-4 sm:px-8 md:px-12 lg:px-16 relative pb-20 sm:pb-0" id="kmap">
            {/* Title */}
            <h2 className='text-white text-center text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 
                px-2'>
                {isMobile ? 'Development Pipeline' : 'Explore My Knowledge Map'}
            </h2>

            {/* CONDITIONAL RENDERING: Mobile vs Desktop */}
            {isMobile ? (
                // ===== MOBILE: Dev Pipeline Animation =====
                <div className="rounded-xl overflow-hidden border border-gray-500 
                    relative bg-gray-900/50 min-h-[400px] w-full
                    safe-area-inset-right safe-area-inset-left">
                    <DevPipeline />
                </div>
            ) : (
                // ===== TABLET & DESKTOP: Knowledge Map =====
                <>
                    {/* Controls - Responsive Layout */}
                    <div className="mb-4 sm:mb-6 flex flex-col gap-4 sm:gap-6 bg-black p-3 sm:p-4 
                        rounded-xl sm:rounded-lg border border-gray-500">
                        
                        {/* Filters - Stack on mobile */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <strong className="text-gray-300 text-sm sm:text-base">Filters:</strong>
                            <div className="flex gap-2 sm:gap-3 flex-wrap">
                                {groups.map(g => (
                                    <label 
                                        key={g} 
                                        className="flex items-center gap-2 cursor-pointer text-gray-300 
                                            hover:text-white transition py-2 px-2 rounded hover:bg-gray-800"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filters.has(g)}
                                            onChange={() => toggleFilter(g)}
                                            className="w-4 h-4 sm:w-5 sm:h-5 rounded cursor-pointer accent-indigo-600"
                                        />
                                        <span className="text-xs sm:text-sm font-medium">{g}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Study Mode - Full width controls on mobile */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-3 
                            border-t sm:border-t-0 sm:border-l border-gray-700 pt-3 sm:pt-0 sm:pl-3">
                            
                            <label className="flex items-center gap-2 cursor-pointer text-gray-300 
                                hover:text-white transition py-2 px-2 rounded hover:bg-gray-800">
                                <input
                                    type="checkbox"
                                    checked={studyMode}
                                    onChange={() => { setStudyMode(!studyMode); setStep(0) }}
                                    className="w-4 h-4 sm:w-5 sm:h-5 rounded cursor-pointer accent-indigo-600"
                                />
                                <span className="text-xs sm:text-sm font-medium">Study Mode</span>
                            </label>

                            {studyMode && (
                                <div className="flex gap-2 flex-wrap">
                                    <button
                                        onClick={() => setStep(s => Math.max(0, s - 1))}
                                        className="flex-1 sm:flex-none px-3 py-2 sm:py-1 text-xs sm:text-xs 
                                            bg-gray-700 text-white rounded hover:bg-gray-600 transition 
                                            active:scale-95"
                                    >
                                        ← Prev
                                    </button>
                                    <button
                                        onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
                                        className="flex-1 sm:flex-none px-3 py-2 sm:py-1 text-xs sm:text-xs 
                                            bg-indigo-600 text-white rounded hover:bg-indigo-700 transition
                                            active:scale-95"
                                    >
                                        Next →
                                    </button>
                                    <span className="text-xs text-gray-400 flex-basis-full text-center">
                                        Step {step + 1}/{steps.length}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Graph Container - Responsive height */}
                    <div className="rounded-xl sm:rounded-lg overflow-hidden border border-gray-500 
                        relative bg-white-700 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] 
                        max-h-[70vh] sm:max-h-[600px]
                        safe-area-inset-right safe-area-inset-left">
                        
                        <ForceGraph 
                            data={knowledgeMap} 
                            filterGroups={[...filters]} 
                            highlightNode={highlight} 
                            onNodeClick={onNodeClick} 
                        />
                        
                        {studyMode && (
                            <StudyPanel 
                                activeStep={step} 
                                steps={steps} 
                                onNext={() => setStep(s => Math.min(steps.length - 1, s + 1))} 
                                onPrev={() => setStep(s => Math.max(0, s - 1))} 
                                onClose={() => setStudyMode(false)}
                            />
                        )}
                    </div>

                    {/* Tip - Responsive text */}
                    <div className="mt-4 sm:mt-6 text-center text-gray-400 text-xs sm:text-sm px-2">
                        <small className="block">
                            💡 <span className="hidden sm:inline">Tip:</span> Drag nodes, 
                            click to focus
                        </small>
                    </div>
                </>
            )}
        </section>
    )
}

export default KnowledgeMap
