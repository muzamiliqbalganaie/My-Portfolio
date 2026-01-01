import React, { useState, useEffect } from 'react'
import ForceGraph from '../components/ForceGraph'
import { knowledgeMap } from '../constants/index'

const groups = ['Skill', 'Project', 'Tool']

const StudyPanel = ({ activeStep, steps, onNext, onPrev, onClose }) => {
    if (!steps || steps.length === 0) return null
    const step = steps[activeStep]
    return (
        <div className="absolute right-3 top-3 w-80 z-40 bg-gray-900 p-4 rounded-lg shadow-2xl border border-gray-700">
            <h3 className="text-white font-bold text-lg m-0">{step.title}</h3>
            <p className="text-gray-300 mt-3 text-sm">{step.text}</p>
            <div className="flex justify-between items-center mt-4 gap-2">
                <button
                    onClick={onPrev}
                    disabled={activeStep === 0}
                    className="px-3 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    Prev
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition"
                    >
                        Close
                    </button>
                    <button
                        onClick={onNext}
                        className="px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    )
}

const KnowledgeMap = () => {
    const [filters, setFilters] = useState(new Set())
    const [highlight, setHighlight] = useState(null)
    const [studyMode, setStudyMode] = useState(false)
    const [step, setStep] = useState(0)

    const steps = [
        { title: 'ER Modeling', text: 'Start with ER Modeling — entities, attributes, relationships.', node: 'ER Modeling' },
        { title: 'Normalization', text: 'Learn normalization to structure your relational data.', node: 'Normalization' },
        { title: 'React + Projects', text: 'See how skills map to real projects in your portfolio.', node: 'Project A' }
    ]

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
        <section className="px-16 relative">
            <h2 className='text-white text-center text-2xl font-bold mb-6'>Explore My Knowledge Map</h2>

            {/* Controls */}
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between flex-wrap bg-black
             p-4 rounded-lg border border-gray-500">
                {/* Filters */}
                <div className="flex items-center gap-4">
                    <strong className="text-gray-300">Filters:</strong>
                    <div className="flex gap-3">
                        {groups.map(g => (
                            <label key={g} className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition">
                                <input
                                    type="checkbox"
                                    checked={filters.has(g)}
                                    onChange={() => toggleFilter(g)}
                                    className="w-4 h-4 rounded cursor-pointer"
                                />
                                <span className="text-sm">{g}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Study Mode */}
                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition">
                        <input
                            type="checkbox"
                            checked={studyMode}
                            onChange={() => { setStudyMode(!studyMode); setStep(0) }}
                            className="w-4 h-4 rounded cursor-pointer"
                        />
                        <span className="text-sm">Study Mode</span>
                    </label>
                    {studyMode && (
                        <div className="flex gap-2 ml-2 border-l border-gray-700 pl-3">
                            <button
                                onClick={() => setStep(s => Math.max(0, s - 1))}
                                className="px-3 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition"
                            >
                                Prev
                            </button>
                            <button
                                onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
                                className="px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Graph Container */}
            <div className="rounded-lg overflow-hidden border border-gray-500 relative bg-white-700
             ">
                <ForceGraph data={knowledgeMap} filterGroups={[...filters]} highlightNode={highlight} onNodeClick={onNodeClick} />
                {studyMode && (
                    <StudyPanel activeStep={step} steps={steps} onNext={() => setStep(s => Math.min(steps.length - 1, s + 1))} onPrev={() => setStep(s => Math.max(0, s - 1))} onClose={() => setStudyMode(false)} />
                )}
            </div>

            {/* Tip */}
            <div className="mt-4 text-center text-gray-400 ">
                <small>💡 Tip: Drag nodes, pinch-to-zoom on mobile, and click nodes to focus.</small>
            </div>
        </section>
    )
}

export default KnowledgeMap
