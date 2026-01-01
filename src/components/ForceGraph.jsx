import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'

const colorForGroup = (g) => {
    switch (g) {
        case 'Skill': return '#4F46E5'
        case 'Project': return '#06B6D4'
        case 'Tool': return '#F59E0B'
        default: return '#9CA3AF'
    }
}

const ForceGraph = ({ data, filterGroups = [], highlightNode = null, onNodeClick }) => {
    const ref = useRef(null)
    const [width, setWidth] = useState(800)
    const [height, setHeight] = useState(600)

    useEffect(() => {
        const container = ref.current
        if (!container) return

        // responsive sizing
        const rect = container.getBoundingClientRect()
        setWidth(rect.width || 800)
        setHeight(rect.height || 600)

        // deep copy to avoid mutating parent data
        const nodes = data.nodes.map(d => ({ ...d }))
        const links = data.links.map(l => ({ ...l }))

        // Apply group filters if provided
        const allowedGroups = filterGroups && filterGroups.length > 0 ? new Set(filterGroups) : null
        const filteredNodes = allowedGroups ? nodes.filter(n => allowedGroups.has(n.group)) : nodes
        const filteredNodeIds = new Set(filteredNodes.map(n => n.id))
        const filteredLinks = links.filter(l => filteredNodeIds.has(l.source) && filteredNodeIds.has(l.target))

        // clear container
        d3.select(container).selectAll('*').remove()

        const svg = d3.select(container)
            .append('svg')
            .attr('width', '100%')
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .style('cursor', 'grab')

        const defs = svg.append('defs')

        // arrow marker
        defs.append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 15)
            .attr('refY', 0)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', '#999')

        const gZoom = svg.append('g')

        const link = gZoom.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(filteredLinks)
            .enter().append('line')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .attr('stroke-width', 1.5)
            .attr('marker-end', 'url(#arrow)')

        const node = gZoom.append('g')
            .attr('class', 'nodes')
            .selectAll('g')
            .data(filteredNodes)
            .enter().append('g')
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended)
            )

        node.append('circle')
            .attr('r', 14)
            .attr('fill', d => colorForGroup(d.group))
            .attr('stroke', '#111827')
            .attr('stroke-width', 1.2)

        node.append('text')
            .attr('x', 18)
            .attr('y', 5)
            .text(d => d.id)
            .style('font-size', '12px')
            .style('pointer-events', 'none')

        // tooltip
        const tooltip = d3.select(container)
            .append('div')
            .attr('class', 'kg-tooltip')
            .style('position', 'absolute')
            .style('pointer-events', 'none')
            .style('background', 'rgba(0,0,0,0.8)')
            .style('color', 'white')
            .style('padding', '8px')
            .style('border-radius', '6px')
            .style('font-size', '12px')
            .style('display', 'none')

        node.on('mouseover', (event, d) => {
            tooltip.style('display', 'block')
                .html(`<strong>${d.id}</strong><div style="margin-top:6px">${d.title || ''}</div>`)
            d3.select(event.currentTarget).select('circle').transition().attr('r', 18)
        })
            .on('mousemove', (event) => {
                tooltip.style('left', (event.layerX + 12) + 'px').style('top', (event.layerY + 12) + 'px')
            })
            .on('mouseout', (event) => {
                tooltip.style('display', 'none')
                d3.select(event.currentTarget).select('circle').transition().attr('r', 14)
            })
            .on('click', (event, d) => {
                if (onNodeClick) onNodeClick(d)
            })

        // highlight if provided
        if (highlightNode) {
            node.selectAll('circle').attr('opacity', n => n.id === highlightNode ? 1 : 0.35)
            link.attr('stroke-opacity', l => (l.source === highlightNode || l.target === highlightNode) ? 1 : 0.15)
        }

        const simulation = d3.forceSimulation(filteredNodes)
            .force('link', d3.forceLink(filteredLinks).id(d => d.id).distance(120).strength(0.5))
            .force('charge', d3.forceManyBody().strength(-400))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collide', d3.forceCollide(30))
            .on('tick', ticked)

        // zoom behavior
        svg.call(d3.zoom()
            .scaleExtent([0.2, 3])
            .on('zoom', (event) => {
                gZoom.attr('transform', event.transform)
            })
        )

        function ticked() {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y)

            node.attr('transform', d => `translate(${d.x},${d.y})`)
        }

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart()
            d.fx = d.x
            d.fy = d.y
        }

        function dragged(event, d) {
            d.fx = event.x
            d.fy = event.y
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0)
            d.fx = null
            d.fy = null
        }

        // cleanup on unmount
        return () => {
            simulation.stop()
            d3.select(container).selectAll('*').remove()
        }

    }, [data, filterGroups, width, height, highlightNode])

    return (
        <div ref={ref} style={{ width: '100%', height: '600px', position: 'relative' }}></div>
    )
}

export default ForceGraph
