import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PageHero, Shell } from '@/components/site-shell'
import { courses } from '@/lib/courses'

export function generateStaticParams() {
  return courses.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const course = courses.find((item) => item.slug === slug)
  return course ? { title: course.title, description: course.description } : {}
}

export default async function CourseDetailsPage({ params }) {
  const { slug } = await params
  const course = courses.find((item) => item.slug === slug)

  if (!course) notFound()

  return (
    <Shell>
      <main>
        <PageHero eyebrow={`${course.category} · ${course.level}`} title={course.title} description={course.description} />
        <section className="section-pad course-detail-section">
          <div className="container course-detail-layout">
            <article className="course-detail-main">
              <Link className="text-link" href="/courses"><ArrowLeft size={16} /> Back to study areas</Link>
              <span className="eyebrow">Study area overview</span>
              <h2>Explore your next step</h2>
              <p>{course.overview}</p>
              <div className="course-detail-note" role="note">Programme details are placeholders until confirmed by the college. Always contact admissions for current, official information.</div>
            </article>
            <aside className="course-detail-aside" aria-label="Admissions information">
              <h2>Planning to apply?</h2>
              <p>Entry requirements depend on the verified programme and intake. Ask the admissions team to confirm eligibility and required documents.</p>
              <h3>Career opportunities</h3>
              <p>Possible pathways depend on the final award, experience and individual goals. Request current guidance directly from ISMT.</p>
              <Link className="button button-dark" href="/admissions">Contact admissions <ArrowRight size={16} /></Link>
            </aside>
          </div>
        </section>
      </main>
    </Shell>
  )
}
