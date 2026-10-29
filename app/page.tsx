import { Arrow, ImageSlot, Ridge } from "./visuals";
import {
  ContactDialog,
  Header,
  PhotoGallery,
  PropertySearch,
  Reveal,
  ScrollMotion,
} from "./interactions";

export default function Home() {
  return (
    <>
      <div className="page-loader" aria-hidden="true">
        <Ridge />
      </div>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-background">
            <ImageSlot name="hero" />
          </div>
          <div className="container hero-content">
            <Reveal>
              <h1 id="hero-title">
                A <em>personal</em> real
                <br />
                estate partner.
              </h1>
              <a className="button button-white" href="#search">
                Find your dream home <Arrow />
              </a>
            </Reveal>
          </div>
        </section>
        <div className="main-content">
          <div className="page-grid" aria-hidden="true" />
          <section className="intro container" aria-label="Meet Marci Metzger">
            <Reveal>
              <p>
                Marci Metzger brings nearly <em>three decades</em> of real
                estate experience to every move. Rooted in Pahrump and backed by
                The Ridge Realty Group, she helps buyers and sellers move
                forward with <em>confidence.</em>
              </p>
            </Reveal>
            <div className="featured-image" data-scroll="grow">
              <ImageSlot name="aerial" />
            </div>
          </section>
          <section
            className="value-section"
            id="about"
            aria-labelledby="about-title"
          >
            <span className="outline-word" aria-hidden="true">
              experience
            </span>
            <div className="container value-grid">
              <div className="image-region" data-scroll="image">
                <ImageSlot name="portrait" />
              </div>
              <Reveal className="value-copy">
                <h2 id="about-title">
                  Guidance with
                  <span className="heading-accent">
                    <em>experience</em>
                  </span>
                </h2>
                <p>
                  Real estate is personal. Whether you’re buying your first
                  home, making an investment, or preparing for a fresh start,
                  Marci takes the time to understand what matters to you.
                </p>
                <p>
                  With nearly 30 years of experience, a commitment to continued
                  learning, and a close understanding of the local market, she
                  helps make each step feel clearer.
                </p>
                <a className="button button-outline" href="#contact">
                  Meet your Realtor <Arrow />
                </a>
              </Reveal>
            </div>
          </section>
          <section
            className="value-section value-reverse"
            id="selling"
            aria-labelledby="selling-title"
          >
            <span className="outline-word" aria-hidden="true">
              confidence
            </span>
            <div className="container value-grid">
              <div className="image-region" data-scroll="image">
                <ImageSlot name="selling" />
              </div>
              <Reveal className="value-copy">
                <h2 id="selling-title">
                  Selling with
                  <span className="heading-accent">
                    <em>confidence</em>
                  </span>
                </h2>
                <p>
                  Your home deserves thoughtful preparation and the right
                  exposure. Marci combines local market knowledge with a focused
                  approach to help you work toward a strong sale price.
                </p>
                <p>
                  In 2021, she helped almost 90 clients and achieved $28.5
                  million in sales. That experience informs the care and
                  attention she brings to your next move.
                </p>
                <a className="button button-outline" href="#contact">
                  Let’s talk about selling <Arrow />
                </a>
              </Reveal>
            </div>
          </section>
          <section
            className="value-section"
            id="buying"
            aria-labelledby="buying-title"
          >
            <span className="outline-word" aria-hidden="true">
              possibilities
            </span>
            <div className="container value-grid">
              <div className="image-region" data-scroll="image">
                <ImageSlot name="buying" />
              </div>
              <Reveal className="value-copy">
                <h2 id="buying-title">
                  Find a place to
                  <span className="heading-accent">
                    <em>call home</em>
                  </span>
                </h2>
                <p>
                  From a modest home or a fixer-upper to a larger property with
                  room to grow, the right place starts with understanding your
                  needs and your budget.
                </p>
                <p>
                  Explore the Pahrump market with helpful analysis, guidance on
                  potential improvements, and connections to local contractors.
                  Marci is here to help you make an informed decision.
                </p>
                <a className="button button-outline" href="#search">
                  Find your dream home <Arrow />
                </a>
              </Reveal>
            </div>
          </section>
          <section
            className="services-section"
            id="services"
            aria-labelledby="services-title"
          >
            <div className="services-background" data-scroll="panel" />
            <span className="outline-word" aria-hidden="true">
              expertise
            </span>
            <div className="container">
              <Reveal>
                <h2 id="services-title">
                  Real estate done right. Practical guidance for buying,
                  selling, investing, and everything that comes with your next
                  move.
                </h2>
              </Reveal>
              <div className="service-mosaic">
                {[
                  {
                    title: (
                      <>
                        Buying
                        <br />
                        &amp; Selling
                      </>
                    ),
                    icon: 0,
                  },
                  {
                    title: (
                      <>
                        Commercial
                        <br />
                        &amp; Residential
                      </>
                    ),
                    icon: 1,
                  },
                  {
                    title: (
                      <>
                        Investment
                        <br />
                        Guidance
                      </>
                    ),
                    icon: 2,
                  },
                  {
                    title: (
                      <>
                        Market Analysis
                        <br />
                        &amp; Property Preparation
                      </>
                    ),
                    icon: 3,
                  },
                  {
                    title: (
                      <>
                        Financing &amp; Mortgage
                        <br />
                        Connections
                      </>
                    ),
                    icon: 4,
                  },
                ].map((service, index) => (
                  <Reveal
                    className="service-card"
                    delay={index * 120}
                    key={service.icon}
                  >
                    <ServiceIcon type={service.icon} />
                    <h3>{service.title}</h3>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
          <section
            className="gallery-section container"
            aria-labelledby="gallery-title"
          >
            <Reveal>
              <h2 id="gallery-title">Picture the possibilities</h2>
            </Reveal>
            <PhotoGallery />
          </section>
          <section
            className="search-section container"
            id="search"
            aria-labelledby="search-title"
          >
            <Reveal className="section-heading">
              <h2 id="search-title">
                Find your <em>dream home.</em>
              </h2>
              <span className="preview-badge">Search preview</span>
            </Reveal>
            <PropertySearch />
          </section>
          <section
            className="closing-section"
            id="contact"
            aria-labelledby="contact-title"
          >
            <div className="closing-art" aria-hidden="true">
              <Ridge />
            </div>
            <div className="container">
              <Reveal className="closing-copy">
                <h2 id="contact-title">
                  Let’s plan your
                  <span className="heading-accent">
                    <em>next chapter.</em>
                  </span>
                </h2>
                <p>
                  A new home, a fresh start, or simply a question.
                  <br />
                  Get in touch for personal guidance.
                </p>
                <div className="closing-actions">
                  <a className="button" href="tel:+12069196886">
                    Call Marci <Arrow />
                  </a>
                  <ContactDialog />
                </div>
              </Reveal>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <a
              className="footer-brand"
              href="#"
              aria-label="Marci Metzger home"
            >
              <Ridge />
              <span>
                MARCI METZGER<small>The Ridge Realty Group</small>
              </span>
            </a>
            <div>
              <h3>Explore</h3>
              <a href="#about">Meet Marci</a>
              <a href="#buying">Buying a home</a>
              <a href="#selling">Selling your home</a>
              <a href="#services">Our services</a>
            </div>
            <div>
              <h3>Get in touch</h3>
              <a href="tel:+12069196886">(206) 919-6886</a>
              <a href="#contact">Contact Marci</a>
              <p>Pahrump, Nevada</p>
            </div>
            <div>
              <h3>Visit us</h3>
              <address>
                3190 HW-160, Suite F<br />
                Pahrump, Nevada 89048
                <br />
                The Ridge Realty Group
              </address>
              <a
                className="footer-directions"
                href="https://www.google.com/maps/search/?api=1&query=3190+HW-160+Suite+F+Pahrump+Nevada+89048"
                target="_blank"
                rel="noreferrer"
              >
                Get directions <Arrow />
              </a>
            </div>
            <div>
              <h3>Office hours</h3>
              <p>Daily · 8:00 AM–7:00 PM</p>
              <p>
                Outside-hours appointments
                <br />
                available by phone.
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Marci Metzger · The Ridge Realty Group</span>
            <a href="#">Back to top ↑</a>
          </div>
        </div>
      </footer>
      <ScrollMotion />
    </>
  );
}

function ServiceIcon({ type }: { type: number }) {
  return (
    <svg
      className="service-icon"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {type === 0 ? (
        <>
          <circle cx="24" cy="24" r="21" />
          <path d="m24 13 11 11-11 11-11-11 11-11Z" />
        </>
      ) : type === 1 ? (
        <>
          <path d="M3 3h42v42H3Z" />
          <circle cx="24" cy="24" r="10" />
        </>
      ) : type === 2 ? (
        <>
          <circle cx="24" cy="12" r="9" />
          <path d="M3 27h42v18H3Z" />
        </>
      ) : type === 3 ? (
        <>
          <path d="M3 3h42v18H3ZM3 27h18v18H3ZM27 27h18v18H27Z" />
        </>
      ) : (
        <>
          <path d="M3 3h17v42H3ZM27 27h18v18H27Z" />
          <circle cx="36" cy="12" r="9" />
        </>
      )}
    </svg>
  );
}

