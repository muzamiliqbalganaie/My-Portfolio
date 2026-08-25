import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const DevPipeline = (props) => {
    const containerRef = useRef()
    const pipelineRef = useRef()

    // Pipeline stages with colors
    const stages = [
        { name: 'Planning', color: '#6366f1', icon: '📋' },
        { name: 'Design', color: '#8b5cf6', icon: '🎨' },
        { name: 'Development', color: '#3b82f6', icon: '💻' },
        { name: 'Testing', color: '#06b6d4', icon: '🧪' },
        { name: 'Deployment', color: '#10b981', icon: '🚀' }
    ]

    useGSAP(() => {
        if (!pipelineRef.current) return

        const items = pipelineRef.current.querySelectorAll('.pipeline-item')
        
        // Stagger animation
        gsap.from(items, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            repeat: -1,
            repeatDelay: 3
        })

        // Pulse animation on dots
        const dots = pipelineRef.current.querySelectorAll('.pipeline-dot')
        gsap.to(dots, {
            scale: 1.2,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
            repeatDelay: 2.5
        })

        // Flow effect - animated line
        const line = pipelineRef.current.querySelector('.pipeline-line')
        if (line) {
            gsap.to(line, {
                backgroundPosition: '200% 0%',
                duration: 3,
                ease: 'linear',
                repeat: -1
            })
        }
    }, [])

    return (
        <div
            ref={containerRef}
            {...props}
            className="w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
        >
            <div
                ref={pipelineRef}
                className="w-full max-w-sm"
            >
                {/* Pipeline Flow Visualization */}
                <div className="relative">
                    {/* Animated flowing line */}
                    <div
                        className="pipeline-line absolute left-0 right-0 top-[50%] h-1 rounded-full z-0"
                        style={{
                            background: `linear-gradient(90deg, transparent 0%, #6366f1 25%, #8b5cf6 50%, #3b82f6 75%, transparent 100%)`,
                            backgroundSize: '200% 100%',
                            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
                        }}
                    ></div>

                    {/* Pipeline stages */}
                    <div className="flex justify-between items-center relative z-10">
                        {stages.map((stage, index) => (
                            <div
                                key={stage.name}
                                className="pipeline-item flex flex-col items-center"
                            >
                                {/* Connecting dot */}
                                <div
                                    className="pipeline-dot w-12 h-12 rounded-full flex items-center justify-center text-2xl relative z-20 mb-3"
                                    style={{
                                        background: `linear-gradient(135deg, ${stage.color}, ${stage.color}dd)`,
                                        boxShadow: `0 0 20px ${stage.color}99, inset 0 0 10px ${stage.color}`,
                                        border: `2px solid ${stage.color}`
                                    }}
                                >
                                    {stage.icon}
                                </div>

                                {/* Stage label */}
                                <span
                                    className="text-xs font-bold mt-3 text-center"
                                    style={{ color: stage.color }}
                                >
                                    {stage.name}
                                </span>

                                {/* Progress indicator */}
                                <div className="mt-2 w-8 h-1 rounded-full bg-gray-700">
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            background: stage.color,
                                            width: index <= 2 ? '100%' : '0%',
                                            transition: 'width 0.6s ease'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Current Stage Info */}
                <div className="mt-12 p-4 rounded-lg bg-gray-800/50 border border-indigo-500/30 backdrop-blur text-center">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Current Stage</p>
                    <p className="text-indigo-400 font-bold text-lg">Development in Progress</p>
                    <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full"
                            style={{ width: '60%', boxShadow: '0 0 10px rgba(99, 102, 241, 0.8)' }}
                        ></div>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">60% Complete</p>
                </div>

                {/* Key Metrics */}
                <div className="mt-6 grid grid-cols-3 gap-2">
                    {[
                        { label: 'Sprint', value: '05' },
                        { label: 'Tasks', value: '12' },
                        { label: 'Quality', value: '95%' }
                    ].map((metric) => (
                        <div key={metric.label} className="p-3 rounded bg-gray-800/30 border border-gray-700 text-center">
                            <p className="text-gray-500 text-xs">{metric.label}</p>
                            <p className="text-white font-bold text-lg">{metric.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DevPipeline
