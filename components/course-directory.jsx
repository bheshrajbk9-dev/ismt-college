'use client'

import { useMemo, useState } from 'react'
import { Search, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { courses } from '@/lib/courses'

const categories = ['All', ...new Set(courses.map((course) => course.category))]

export function CourseDirectory() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const visibleCourses = useMemo(() => {
    const term = query.trim().toLowerCase()
    return courses.filter((course) =>
      (category === 'All' || course.category === category) &&
      `${course.title} ${course.description} ${course.level}`.toLowerCase().includes(term),
    )
  }, [query, category])

  return (
    <>
      <div className="course-controls">
        <label className="search-box">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search study areas</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search study areas" />
        </label>
        <fieldset className="filter-list">
          <legend className="sr-only">Filter study areas</legend>
          {categories.map((item) => (
            <button key={item} type="button" className={category === item ? 'selected' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </fieldset>
      </div>
      <p className="sr-only" aria-live="polite">{visibleCourses.length} study areas shown</p>
      <div className="course-grid">
        {visibleCourses.map((course, index) => (
          <article className="course-card" key={course.slug}>
            <div className="course-card-top">
              <span className="course-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="course-level">{course.level}</span>
            </div>
            <span className="eyebrow">{course.category}</span>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <Link href={`/courses/${course.slug}`}>View study area <ArrowRight size={16} aria-hidden="true" /></Link>
          </article>
        ))}
      </div>
      {visibleCourses.length === 0 && <p className="empty-state">No study areas match that search. Try another keyword or filter.</p>}
      <p className="disclaimer">Programme names and descriptions are editable placeholders. Confirm current offerings and entry requirements with ISMT before applying.</p>
    </>
  )
}
