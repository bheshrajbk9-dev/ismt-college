'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, Menu, X, GraduationCap, ChevronDown } from 'lucide-react'

const links = [
  ['Home', '/'], ['About', '/about'], ['Courses', '/courses'], ['Admissions', '/admissions'], ['Student life', '/student-services'], ['Contact', '/contact'],
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  return <>
    <div className="topbar"><div className="container topbar-inner"><span>INTERNATIONAL SCHOOL OF MANAGEMENT & TECHNOLOGY</span><span className="topbar-note">Learn today. Lead tomorrow.</span></div></div>
    <header className="header"><div className="container nav-wrap">
      <Link href="/" className="brand" aria-label="ISMT College home" onClick={() => setOpen(false)}><span className="brand-mark"><GraduationCap size={25}/></span><span className="brand-text"><strong>ISMT</strong><small>COLLEGE · NEPAL</small></span></Link>
      <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      <nav id="primary-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href} className={pathname === href ? 'active' : ''} onClick={() => setOpen(false)}>{label}</Link>)}<Link className="nav-apply" href="/admissions" onClick={() => setOpen(false)}>Apply now <ArrowRight size={15}/></Link></nav>
    </div></header>
  </>
}

export function NewsletterSignup() {
  const [status, setStatus] = useState('')

  function submit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const email = form.elements.email
    if (!form.checkValidity()) {
      setStatus(email.validity.valid ? 'Enter a valid email address.' : 'Enter a valid email address.')
      return
    }
    setStatus('Thanks for your interest. This demo does not send or store your email.')
    form.reset()
  }

  return (
    <form className="newsletter-form" onSubmit={submit} noValidate>
      <label htmlFor="newsletter-email">Get occasional college updates</label>
      <div className="newsletter-controls">
        <input id="newsletter-email" name="email" type="email" autoComplete="email" placeholder="Email address" required />
        <button type="submit" aria-label="Submit newsletter interest"><ArrowRight size={17} /></button>
      </div>
      <small>Your email is not transmitted or stored by this demonstration.</small>
      {status && <p className="newsletter-status" role="status">{status}</p>}
    </form>
  )
}

export function Footer() {
 return <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-brand"><Link href="/" className="brand brand-light"><span className="brand-mark"><GraduationCap size={25}/></span><span className="brand-text"><strong>ISMT</strong><small>COLLEGE · NEPAL</small></span></Link><p>Building knowledge, confidence and opportunity through a student-centred learning experience.</p></div><div className="footer-column"><h3>Explore</h3><Link href="/about">About ISMT</Link><Link href="/courses">Our courses</Link><Link href="/student-services">Student services</Link><Link href="/admissions">Admissions</Link></div><div className="footer-column"><h3>Get in touch</h3><p>Contact details are being updated.</p><Link href="/contact">Send an enquiry <ArrowRight size={14}/></Link><small>Address and contact information<br/>will be confirmed by the college.</small><NewsletterSignup /></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ISMT College. All rights reserved.</span><span>International School of Management and Technology · Nepal</span></div></div></footer>
}

export function Shell({ children }) { return <><Header/>{children}<Footer/></> }

export function SectionHeading({ eyebrow, title, description, light = false }) { return <div className={`section-heading ${light ? 'light' : ''}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div> }

export function PageHero({ eyebrow, title, description }) { return <section className="page-hero"><div className="container page-hero-inner"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div><div className="page-hero-mark" aria-hidden="true">ISMT<span>EST. IN LEARNING</span></div></div></section> }

export function EnquiryForm({ compact = false }) {
 const [status, setStatus] = useState('')
 function submit(event) { event.preventDefault(); const form = event.currentTarget; const email = form.elements.email; if (!form.checkValidity()) { setStatus(email.validity.valid ? 'Please complete all required fields.' : 'Enter a valid email address.'); email.focus(); return } setStatus('Thank you. This demo form does not send your information. Please contact the college directly to submit an enquiry.'); form.reset() }
 return <form className={`enquiry-form ${compact ? 'compact' : ''}`} onSubmit={submit} noValidate><div className="form-row"><label>Full name<input name="name" autoComplete="name" placeholder="Your name" required/></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required/></label></div><label>Area of interest<select name="interest" defaultValue="" required><option value="" disabled>Select a programme or enquiry</option><option>Business and management</option><option>Computing and technology</option><option>Hospitality and tourism</option><option>General enquiry</option></select></label><label>Message<textarea name="message" rows="4" placeholder="How can we help?"/></label><button className="button button-dark" type="submit">Send enquiry <ArrowRight size={16}/></button>{status && <p className="form-status" role="status">{status}</p>}<small>Your details are not transmitted or stored by this demonstration form.</small></form>
}

export function FAQ({ items }) { const [selected, setSelected] = useState(null); return <div className="faq-list">{items.map(([q, a], i) => <div className={`faq-item ${selected === i ? 'expanded' : ''}`} key={q}><button aria-expanded={selected === i} onClick={() => setSelected(selected === i ? null : i)}>{q}<ChevronDown size={19}/></button>{selected === i && <p>{a}</p>}</div>)}</div> }
