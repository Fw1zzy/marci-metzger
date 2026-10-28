import React, { useEffect, useRef, useState } from "react";

const phone = "+12069196886";
const originalContact =
  "https://marcimetzger.com/#63878283-d93b-46db-8daa-d8cb1389f2ab";
const gallery = [
  [
    "gallery-1",
    "Aerial view of the Mountain Falls neighborhood and golf course in Pahrump",
    "A little more room to live.",
  ],
  [
    "gallery-2",
    "Sunlit sitting room with large windows overlooking a landscaped garden",
    "Let the outside in.",
  ],
  [
    "gallery-3",
    "Pahrump homes with the Spring Mountains on the horizon",
    "A different point of view.",
  ],
  [
    "gallery-4",
    "Aerial view of a backyard pool and surrounding Pahrump homes",
    "Make room for the everyday.",
  ],
  [
    "gallery-5",
    "Community recreation areas and homes against a Nevada mountain backdrop",
    "Connected to your community.",
  ],
  [
    "gallery-6",
    "Tennis courts and recreation facilities in a Pahrump neighborhood",
    "More life, just outside.",
  ],
  [
    "gallery-7",
    "Mountain Falls golf course, pond, and community buildings",
    "Find your own pace.",
  ],
];
const slides = [
  {
    image: "hero",
    label: "Space to make your own.",
    alt: "Modern home with a garden and mountain views, from Marci Metzger’s original website",
  },
  {
    image: "pahrump",
    label: "A view worth coming home to.",
    alt: "Mountain Falls pond, green fairways, and mountain scenery in Pahrump, Nevada",
  },
  {
    image: "marketing",
    label: "The next chapter starts here.",
    alt: "Home opening onto an illuminated pool and outdoor living area",
  },
];

function Icon({ name = "arrow", size = 20, ...props }) {
  const paths = {
    arrow: (
      <>
        <path d="M4 12h15M13 5l7 7-7 7" />
      </>
    ),
    northeast: (
      <>
        <path d="M5 19 19 5M5 5h14v14" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    key: (
      <>
        <circle cx="8" cy="8" r="5" />
        <path d="m12 12 9 9m-3-3 3-3m-6 0 3-3" />
      </>
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7M5 9v12h14V9M10 21v-8h4v8" />
      </>
    ),
    phone: (
      <path d="m7 3 3 5-3 3c1.5 3 3 4.5 6 6l3-3 5 3c-1 6-6 5-12-1S2 5 7 3Z" />
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: (
      <>
        <path d="M4 8h16M4 16h16" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" />
      </>
    ),
    check: <path d="m4 12 5 5L20 6" />,
    pause: (
      <>
        <path d="M8 5v14M16 5v14" strokeWidth="2.4" />
      </>
    ),
    play: <path d="m8 4 12 8-12 8Z" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

function Picture({ name, alt, className = "", priority = false, ...props }) {
  return (
    <img
      className={className}
      src={`/images/${name}.webp`}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      {...props}
    />
  );
}

function Modal({ open, onClose, label, children, className = "", onKeyDown }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-label={label}
      onCancel={onClose}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <button
          className="icon-button modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <Icon name="close" />
        </button>
        {children}
      </div>
    </dialog>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [searchSummary, setSearchSummary] = useState(null);
  const [enquiry, setEnquiry] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");
  const [priceError, setPriceError] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [heroInView, setHeroInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const heroRef = useRef(null);
  const formRef = useRef(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      setScrolled(window.scrollY > 80);
      setShowBackToTop(window.scrollY > 650);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const visibility = () => setPageVisible(!document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(heroRef.current);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const targets = [
      ...document.querySelectorAll(
        ".section-heading, .section-label, .about-grid, .results-grid article, .search-form, .gallery-item, .services-grid, .contact-grid, .partners-grid",
      ),
    ];
    let observer;
    const configureMotion = () => {
      observer?.disconnect();
      targets.forEach((el) =>
        el.classList.remove("reveal-pending", "is-revealed"),
      );
      if (motionPreference.matches) {
        setAutoPlay(false);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.06, rootMargin: "0px 0px -24px 0px" },
      );
      targets.forEach((el, i) => {
        if (el.getBoundingClientRect().top >= window.innerHeight) {
          el.classList.add("reveal-pending");
          el.style.setProperty("--reveal-delay", `${(i % 3) * 65}ms`);
          observer.observe(el);
        }
      });
    };
    const revealFocused = (event) =>
      event.target.closest(".reveal-pending")?.classList.add("is-revealed");
    configureMotion();
    motionPreference.addEventListener("change", configureMotion);
    document.addEventListener("focusin", revealFocused);
    return () => {
      observer?.disconnect();
      motionPreference.removeEventListener("change", configureMotion);
      document.removeEventListener("focusin", revealFocused);
      targets.forEach((el) =>
        el.classList.remove("reveal-pending", "is-revealed"),
      );
    };
  }, []);
  const slideshowRunning = autoPlay && heroInView && pageVisible && !menuOpen;
  useEffect(() => {
    if (!slideshowRunning) return;
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % slides.length),
      7000,
    );
    return () => window.clearInterval(timer);
  }, [slideshowRunning]);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const goSlide = (change) => {
    setAutoPlay(false);
    setSlide((current) => (current + change + slides.length) % slides.length);
  };
  const scrollToTop = () => {
    document.querySelector(".wordmark")?.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  const changePhoto = (change) =>
    setLightbox(
      (current) => (current + change + gallery.length) % gallery.length,
    );
  function search(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    if (values.min && values.max && Number(values.min) > Number(values.max)) {
      setPriceError(
        "Maximum price must be greater than or equal to minimum price.",
      );
      return;
    }
    setPriceError("");
    const currency = (value) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(value);
    setSearchSummary(
      `${values.type} in ${values.location}; ${values.beds} bedrooms; ${values.baths} bathrooms; ${values.min ? currency(values.min) : "no minimum"} to ${values.max ? currency(values.max) : "no maximum"}; sort by ${values.sort}.`,
    );
  }
  function prepareEnquiry(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    setCopyStatus("");
    setEnquiry(
      `Hello Marci,\n\nMy name is ${values.name}. I’m interested in ${values.interest.toLowerCase()}.\n\n${values.message}\n\nYou can reach me at ${values.email}.`,
    );
  }
  async function copyEnquiry() {
    try {
      await navigator.clipboard.writeText(enquiry);
      setCopyStatus(
        "Message copied. You can paste it into Marci’s contact form.",
      );
    } catch {
      setCopyStatus("Please select and copy the message above.");
    }
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="site-shell">
        <div
          className={`navigation ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-is-open" : ""}`}
        >
          <a className="wordmark" href="#top" aria-label="Marci Metzger home">
            MM
            <span>
              MARCI METZGER<small>THE RIDGE REALTY GROUP</small>
            </span>
          </a>
          <button
            className="menu-button glass"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
          <nav
            id="primary-navigation"
            className={`nav-links glass ${menuOpen ? "is-open" : ""}`}
            aria-label="Main navigation"
          >
            <a href="#search" onClick={() => setMenuOpen(false)}>
              Find a home
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              Meet Marci
            </a>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Our expertise
            </a>
            <a href="#partners" onClick={() => setMenuOpen(false)}>
              Our partners
            </a>
            <a
              className="mobile-contact-link"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Let’s talk <Icon name="northeast" size={16} />
            </a>
          </nav>
          <a className="nav-contact glass" href="#contact">
            Let’s talk <Icon name="northeast" size={16} />
          </a>
        </div>
        <header
          className="hero"
          id="top"
          ref={heroRef}
          aria-roledescription="carousel"
          aria-label="Pahrump real estate highlights"
        >
          {slides.map((item, i) => (
            <Picture
              key={item.image}
              name={item.image}
              alt={item.alt}
              className={`hero-image ${slide === i ? "active" : ""}`}
              priority={i === 0}
              width="1920"
              height="1280"
              aria-hidden={slide !== i}
            />
          ))}
          <div className="hero-shade" />
          <div className="hero-heading">
            <p className="eyebrow light">
              ROOTED HERE. READY FOR YOUR NEXT CHAPTER.
            </p>
            <h1>
              <span className="sr-only">Marci Metzger — </span>PAHRUMP
              <span className="sr-only"> Realtor</span>
              <span className="title-period" aria-hidden="true">
                .
              </span>
            </h1>
          </div>
          <div className="hero-bottom">
            <div>
              <p className="hero-kicker">A place to belong.</p>
              <p>
                Extraordinary surroundings. Everyday possibilities.
                <br />
                Find your place in Pahrump with Marci Metzger.
              </p>
            </div>
            <a
              className="round-link"
              href="#search"
              aria-label="Explore Pahrump homes"
            >
              <Icon name="arrow" size={25} />
            </a>
          </div>
          <div
            className={`hero-pagination ${slideshowRunning ? "is-playing" : ""}`}
            aria-label="Hero image controls"
          >
            {slides.map((item, i) => (
              <button
                key={item.image}
                className={`slide-dot ${slide === i ? "selected" : ""}`}
                aria-label={`Show image ${i + 1}: ${item.label}`}
                aria-pressed={slide === i}
                onClick={() => {
                  setAutoPlay(false);
                  setSlide(i);
                }}
              />
            ))}
            <button
              className="slideshow-toggle"
              onClick={() => setAutoPlay(!autoPlay)}
              aria-label={
                autoPlay
                  ? "Pause background slideshow"
                  : "Play background slideshow"
              }
              aria-pressed={!autoPlay}
            >
              <Icon name={autoPlay ? "pause" : "play"} size={15} />
            </button>
          </div>
        </header>

        <main id="main">
          <section
            className="intro-strip"
            aria-label="Local experience at a glance"
          >
            <div className="location-panel">
              <Picture
                name="pahrump"
                alt="Mountains and water at Mountain Falls, Pahrump"
                width="700"
                height="400"
              />
              <div>
                <span className="eyebrow light">
                  <Icon name="pin" size={15} /> PAHRUMP, NEVADA
                </span>
                <p>
                  A little closer
                  <br />
                  to the life you want.
                </p>
              </div>
              <a href="#gallery" aria-label="Explore the Pahrump photo gallery">
                <Icon name="northeast" />
              </a>
            </div>
            <div className="facts-panel">
              <div className="facts">
                <div>
                  <span>
                    <Icon name="key" size={17} /> Experience
                  </span>
                  <strong>
                    NEARLY 30<span> YEARS</span>
                  </strong>
                </div>
                <div>
                  <span>
                    <Icon name="home" size={17} /> Clients helped in 2021
                  </span>
                  <strong>NEARLY 90</strong>
                </div>
                <div>
                  <span>
                    <Icon name="sun" size={17} /> Sales in 2021
                  </span>
                  <strong>$28.5M</strong>
                </div>
              </div>
              <div className="facts-bottom">
                <div className="slider-arrows">
                  <button
                    className="icon-button"
                    onClick={() => goSlide(-1)}
                    aria-label="Previous hero image"
                  >
                    <Icon className="flip" size={17} />
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => goSlide(1)}
                    aria-label="Next hero image"
                  >
                    <Icon size={17} />
                  </button>
                  <span className="slide-count">0{slide + 1} / 03</span>
                </div>
                <a href="#about" className="agent-chip">
                  <span>
                    Your next chapter.
                    <br />
                    <strong>A local expert by your side.</strong>
                  </span>
                  <Picture name="marci" alt="" width="54" height="54" />
                </a>
              </div>
            </div>
          </section>

          <section
            className="about section-pad"
            id="about"
            aria-labelledby="about-title"
          >
            <div className="section-label">
              <span className="eyebrow">01 / MEET YOUR REALTOR</span>
              <span className="tiny-label">
                LOCAL KNOWLEDGE. LASTING CONNECTIONS.
              </span>
            </div>
            <div className="about-grid">
              <div className="portrait-wrap">
                <Picture
                  name="marci"
                  alt="Marci Metzger, Pahrump Realtor with The Ridge Realty Group"
                  width="600"
                  height="760"
                />
                <div className="portrait-caption">
                  <span>MARCI METZGER</span>
                  <Icon name="northeast" />
                </div>
              </div>
              <div className="about-copy">
                <span className="eyebrow">YOUR ADVANTAGE IS EXPERIENCE.</span>
                <h2 id="about-title">
                  REAL ESTATE.
                  <br />
                  REAL CONNECTION.
                </h2>
                <p className="lead">
                  Meet Marci Metzger.
                  <br />
                  Your Pahrump Realtor for nearly three decades.
                </p>
                <p>
                  Our team works hard every day to grow and learn, so that we
                  may continue to excel in our market. Our clients deserve our
                  best, and we want to make sure our best is better every year.
                </p>
                <p>
                  We live, work, and play in this community. Whether you’re
                  finding your first home or beginning a new chapter, we’re here
                  to help you move with confidence.
                </p>
                <a className="text-link" href={`tel:${phone}`}>
                  Call Marci <span>(206) 919-6886</span>
                  <Icon name="northeast" />
                </a>
              </div>
            </div>
          </section>

          <section
            className="results section-pad"
            id="results"
            aria-labelledby="results-title"
          >
            <div className="section-label">
              <span className="eyebrow light">02 / A PROVEN APPROACH</span>
              <span className="tiny-label">
                THOUGHTFUL STRATEGY. PERSONAL SERVICE.
              </span>
            </div>
            <div className="section-heading">
              <h2 id="results-title">
                DON’T JUST LIST IT.
                <br />
                <span>GET IT SOLD.</span>
              </h2>
              <p>
                From the first conversation to the final signature,
                <br className="desktop-break" /> every detail matters.
              </p>
            </div>
            <div className="results-grid">
              <article>
                <Picture
                  name="sold"
                  alt="Bright kitchen with a large island and pendant lighting"
                  width="800"
                  height="550"
                />
                <div className="article-top">
                  <span>01</span>
                  <Icon name="northeast" size={17} />
                </div>
                <h3>
                  Top residential sales
                  <br />
                  last 5 years
                </h3>
                <p>
                  We helped nearly 90 clients in 2021, and closed $28.5 million
                  in sales!
                </p>
                <small>As highlighted on the original homepage.</small>
              </article>
              <article>
                <Picture
                  name="marketing"
                  alt="A home and pool photographed at dusk"
                  width="800"
                  height="550"
                />
                <div className="article-top">
                  <span>02</span>
                  <Icon name="northeast" size={17} />
                </div>
                <h3>
                  Don’t just list it…
                  <br />
                  Get it sold.
                </h3>
                <p>
                  We exhaust every avenue to ensure our listings are at the
                  fingertips of every possible buyer, getting you top dollar for
                  your home.
                </p>
              </article>
              <article>
                <Picture
                  name="buyers"
                  alt="House keys with a red home keyring"
                  width="800"
                  height="550"
                />
                <div className="article-top">
                  <span>03</span>
                  <Icon name="northeast" size={17} />
                </div>
                <h3>
                  A guide for buyers.
                  <br />A partner for you.
                </h3>
                <p>
                  Nobody knows the market like we do. Enjoy having a pro at your
                  service. Market analysis, upgrades lists, contractors on speed
                  dial, and more!
                </p>
              </article>
            </div>
          </section>

          <section
            className="search-section section-pad"
            id="search"
            aria-labelledby="search-title"
          >
            <div className="section-label">
              <span className="eyebrow">03 / YOUR NEXT CHAPTER</span>
              <span className="tiny-label">
                <Icon name="pin" size={14} /> PAHRUMP & BEYOND
              </span>
            </div>
            <div className="section-heading">
              <h2 id="search-title">
                FIND YOUR
                <br />
                <span className="muted-heading">DREAM HOME.</span>
              </h2>
              <p>
                A little more space. A different pace.
                <br />
                Let’s find what feels like you.
              </p>
            </div>
            <form className="search-form" onSubmit={search}>
              <fieldset>
                <legend>Search listings</legend>
                <div className="search-fields">
                  <label>
                    Location
                    <select name="location" defaultValue="Pahrump, NV">
                      <option>Pahrump, NV</option>
                      <option>Las Vegas, NV</option>
                      <option>Southern Nevada</option>
                    </select>
                  </label>
                  <label>
                    Property type
                    <select name="type" defaultValue="Any property">
                      <option>Any property</option>
                      <option>Residential homes</option>
                      <option>Condos</option>
                      <option>Land</option>
                      <option>Commercial properties</option>
                    </select>
                  </label>
                  <label>
                    Bedrooms
                    <select name="beds">
                      <option>Any</option>
                      <option>1+</option>
                      <option>2+</option>
                      <option>3+</option>
                      <option>4+</option>
                      <option>5+</option>
                    </select>
                  </label>
                  <label>
                    Bathrooms
                    <select name="baths">
                      <option>Any</option>
                      <option>1+</option>
                      <option>2+</option>
                      <option>3+</option>
                      <option>4+</option>
                    </select>
                  </label>
                  <label>
                    Min. price ($)
                    <input
                      name="min"
                      type="number"
                      min="0"
                      step="1000"
                      placeholder="No minimum"
                      aria-describedby={priceError ? "price-error" : undefined}
                    />
                  </label>
                  <label>
                    Max. price ($)
                    <input
                      name="max"
                      type="number"
                      min="0"
                      step="1000"
                      placeholder="No maximum"
                      aria-describedby={priceError ? "price-error" : undefined}
                    />
                  </label>
                  <label>
                    Sort by
                    <select name="sort">
                      <option>Newest first</option>
                      <option>Price: low to high</option>
                      <option>Price: high to low</option>
                    </select>
                  </label>
                  <button className="button button-dark" type="submit">
                    Search homes <Icon name="search" size={18} />
                  </button>
                </div>
                {priceError && (
                  <p className="form-error" id="price-error" role="alert">
                    {priceError}
                  </p>
                )}
              </fieldset>
              <div className="search-footnote">
                <span>
                  Start with your preferences. Explore current availability with
                  Marci.
                </span>
                <a
                  href="https://marcimetzger.com/listings"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View current listings <Icon name="northeast" size={14} />
                </a>
              </div>
            </form>
          </section>

          <section
            className="gallery-section section-pad"
            id="gallery"
            aria-labelledby="gallery-title"
          >
            <div className="section-label">
              <span className="eyebrow">04 / A SENSE OF PLACE</span>
              <span className="tiny-label">THE PAHRUMP PHOTO GALLERY</span>
            </div>
            <div className="section-heading">
              <h2 id="gallery-title">
                ROOM TO
                <br />
                SEE POSSIBILITY.
              </h2>
              <p>
                Mountain horizons. Open spaces.
                <br />A community that feels like home.
              </p>
            </div>
            <div className="gallery-grid">
              {gallery.map(([name, alt, caption], i) => (
                <button
                  className={`gallery-item gallery-item-${i + 1}`}
                  key={name}
                  onClick={() => setLightbox(i)}
                  aria-label={`Open photo ${i + 1}: ${alt}`}
                >
                  <Picture name={name} alt={alt} width="1024" height="683" />
                  <span className="gallery-caption">
                    <span>{caption}</span>
                    <Icon name="northeast" size={18} />
                  </span>
                  <span className="photo-number">0{i + 1}</span>
                </button>
              ))}
            </div>
            <p className="gallery-note">
              A look at the local lifestyle. Gallery photos do not indicate
              current property availability.
            </p>
          </section>

          <section
            className="services section-pad"
            id="services"
            aria-labelledby="services-title"
          >
            <div className="section-label">
              <span className="eyebrow">05 / OUR SERVICES</span>
              <span className="tiny-label">
                GOOD GUIDANCE MAKES ALL THE DIFFERENCE.
              </span>
            </div>
            <div className="services-grid">
              <div className="services-intro">
                <h2 id="services-title">
                  YOUR MOVE.
                  <br />
                  OUR EXPERTISE.
                </h2>
                <p>
                  Big decisions feel better
                  <br />
                  with the right people beside you.
                </p>
                <a className="button button-outline" href="#contact">
                  Let’s make a plan <Icon name="northeast" size={17} />
                </a>
              </div>
              <div className="service-list">
                {[
                  [
                    "Real estate done right.",
                    "Nervous about your property adventure? Don’t be. Whether you’re getting ready to buy or sell your residence, looking at investment properties, or just curious about the markets, our team ensures you get the best experience possible!",
                    "service-home",
                    "Overhead view of a thoughtfully furnished living room",
                  ],
                  [
                    "Commercial & residential.",
                    "Large or small, condo or mansion, we can find it and get it at the price that’s right. Fixer-uppers? Luxury? We can help with all of it! We live, work, and play in this community. Happy to help you find where to put your hard-earned dollars.",
                    "service-property",
                    "Contemporary home with a lawn and open mountain views",
                  ],
                  [
                    "Rely on expertise.",
                    "If you have questions about affordability, credit, and loan options, trust us to connect you with the right people to get the answers you need in a timely fashion. We make sure you feel confident and educated every step of the way.",
                    "service-advice",
                    "Homebuyers meeting with a real estate professional",
                  ],
                ].map(([title, copy, img, alt], i) => (
                  <article key={title}>
                    <span className="service-number">0{i + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{copy}</p>
                    </div>
                    <Picture name={img} alt={alt} width="130" height="150" />
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            className="partners section-pad"
            id="partners"
            aria-labelledby="partners-title"
          >
            <div className="section-label">
              <span className="eyebrow">06 / CONNECTIONS THAT MATTER</span>
              <span className="tiny-label">LOCAL ROOTS. SHARED VALUES.</span>
            </div>
            <div className="section-heading">
              <h2 id="partners-title">OUR PARTNERS.</h2>
              <p>
                Our brokerage, professional affiliations,
                <br className="desktop-break" /> and commitment to equal
                housing.
              </p>
            </div>
            <div className="partners-grid">
              {[
                ["ridge.png", "The Ridge Realty Group", "OUR BROKERAGE"],
                ["realtor.jpg", "REALTOR®", "PROFESSIONAL AFFILIATION"],
                [
                  "chamber.jpg",
                  "Pahrump Valley Chamber of Commerce",
                  "OUR LOCAL COMMUNITY",
                ],
                [
                  "equal-housing.png",
                  "Equal Housing Opportunity",
                  "A SHARED COMMITMENT",
                ],
              ].map(([image, name, label]) => (
                <div className="partner" key={image}>
                  <div className="partner-logo">
                    <img
                      src={`/images/${image}`}
                      alt={name}
                      width="140"
                      height="140"
                      loading="lazy"
                    />
                  </div>
                  <span className="eyebrow">{label}</span>
                  <h3>{name}</h3>
                </div>
              ))}
            </div>
          </section>

          <section
            className="contact section-pad"
            id="contact"
            aria-labelledby="contact-title"
          >
            <div className="section-label">
              <span className="eyebrow light">07 / LET’S CONNECT</span>
              <span className="tiny-label">
                A GOOD MOVE STARTS WITH A CONVERSATION.
              </span>
            </div>
            <div className="contact-grid">
              <div>
                <h2 id="contact-title">
                  LET’S FIND
                  <br />
                  YOUR PLACE.
                </h2>
                <a className="contact-phone" href={`tel:${phone}`}>
                  (206) 919-6886 <Icon name="northeast" size={24} />
                </a>
                <div className="office-details">
                  <div>
                    <span className="eyebrow light">CALL OR VISIT</span>
                    <address>
                      Marci Metzger · The Ridge Realty Group
                      <br />
                      3190 HW-160, Suite F<br />
                      Pahrump, Nevada 89048, United States
                    </address>
                    <a
                      className="inline-link"
                      href="https://www.google.com/maps/search/?api=1&query=3190+NV-160+Suite+F+Pahrump+NV+89048"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get directions <Icon name="northeast" size={14} />
                    </a>
                  </div>
                  <div>
                    <span className="eyebrow light">OFFICE HOURS</span>
                    <p>
                      Open daily
                      <br />
                      8:00 am – 7:00 pm
                    </p>
                    <p className="office-note">
                      Appointments outside office hours
                      <br />
                      available upon request. Just call!
                    </p>
                  </div>
                </div>
              </div>
              <form
                className="contact-form"
                onSubmit={prepareEnquiry}
                ref={formRef}
              >
                <h3>Tell us about your next chapter.</h3>
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Full name"
                    maxLength="100"
                  />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    maxLength="254"
                  />
                </label>
                <label>
                  I’m interested in
                  <select name="interest">
                    <option>Buying a home</option>
                    <option>Selling a home</option>
                    <option>Commercial property</option>
                    <option>Real estate guidance</option>
                  </select>
                </label>
                <label>
                  Your message
                  <textarea
                    name="message"
                    rows="3"
                    required
                    maxLength="2000"
                    placeholder="A little about what you have in mind…"
                  />
                </label>
                <button type="submit" className="button button-light">
                  Prepare enquiry <Icon name="northeast" size={18} />
                </button>
                <p className="form-note">
                  Prepare your message, then send it through Marci’s contact
                  form or by text.
                </p>
              </form>
            </div>
          </section>
        </main>

        <footer>
          <div className="footer-top">
            <a href="#top" className="footer-brand">
              <img
                src="/images/brand.png"
                alt="Marci Metzger Homes"
                width="270"
                height="84"
                loading="lazy"
              />
            </a>
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/marcimetzger_theridge/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <Icon name="northeast" size={13} />
              </a>
              <a
                href="https://www.facebook.com/MarciHomes/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook <Icon name="northeast" size={13} />
              </a>
              <a
                href="https://www.linkedin.com/in/marci-metzger-30642496/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <Icon name="northeast" size={13} />
              </a>
              <a
                href="https://www.yelp.com/biz/xr3yQN_m2SgO0R_7S6p62w"
                target="_blank"
                rel="noopener noreferrer"
              >
                Yelp <Icon name="northeast" size={13} />
              </a>
            </div>
            <a className="back-top" href="#top">
              Back to top <Icon name="arrow" className="up" size={16} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Marci Metzger Homes.
              <br />
              The Ridge Realty Group · Pahrump, Nevada
            </span>
            <span className="footer-signoff">
              LOCAL KNOWLEDGE. PERSONAL SERVICE.
            </span>
          </div>
        </footer>
      </div>

      {showBackToTop && (
        <button
          className="back-to-top-button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
        >
          <Icon name="arrow" className="up" size={22} />
          <span>Back to top</span>
        </button>
      )}

      <Modal
        open={lightbox !== null}
        onClose={() => setLightbox(null)}
        label="Pahrump photo gallery"
        className="lightbox"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") changePhoto(1);
          if (e.key === "ArrowLeft") changePhoto(-1);
        }}
      >
        {lightbox !== null && (
          <>
            <Picture
              name={gallery[lightbox][0]}
              alt={gallery[lightbox][1]}
              priority
              width="1024"
              height="683"
            />
            <div className="lightbox-footer">
              <button
                className="icon-button"
                onClick={() => changePhoto(-1)}
                aria-label="Previous gallery photo"
              >
                <Icon className="flip" />
              </button>
              <p aria-live="polite">
                {gallery[lightbox][2]}{" "}
                <span>
                  {lightbox + 1} / {gallery.length}
                </span>
              </p>
              <button
                className="icon-button"
                onClick={() => changePhoto(1)}
                aria-label="Next gallery photo"
              >
                <Icon />
              </button>
            </div>
          </>
        )}
      </Modal>
      <Modal
        open={searchSummary !== null}
        onClose={() => setSearchSummary(null)}
        label="Your home search"
      >
        <span className="eyebrow">YOUR NEXT CHAPTER</span>
        <h2>
          YOUR SEARCH.
          <br />A PERSONAL START.
        </h2>
        <p>{searchSummary}</p>
        <p>
          Explore Marci’s current listings and apply your preferences there, or
          text these details to get personal guidance.
        </p>
        <div className="modal-actions">
          <a
            className="button button-dark"
            href="https://marcimetzger.com/listings"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore live listings <Icon name="northeast" size={17} />
          </a>
          <a
            className="button button-outline"
            href={`sms:${phone}?body=${encodeURIComponent(`Hello Marci, I am looking for ${searchSummary || ""}`)}`}
          >
            Text my preferences <Icon name="phone" size={17} />
          </a>
        </div>
      </Modal>
      <Modal
        open={enquiry !== null}
        onClose={() => setEnquiry(null)}
        label="Your prepared enquiry"
      >
        <span className="eyebrow">READY FOR THE NEXT STEP</span>
        <h2>
          LET’S START
          <br />A CONVERSATION.
        </h2>
        <p>
          Your message is ready. Copy it to Marci’s contact form, or open it in
          your text messaging app.
        </p>
        <textarea
          className="prepared-message"
          readOnly
          aria-label="Prepared message"
          value={enquiry || ""}
          rows="7"
        />
        <div className="modal-actions">
          <button className="button button-dark" onClick={copyEnquiry}>
            Copy message <Icon name="check" size={17} />
          </button>
          <a
            className="button button-outline"
            href={originalContact}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open contact form <Icon name="northeast" size={17} />
          </a>
          <a
            className="text-link"
            href={`sms:${phone}?body=${encodeURIComponent(enquiry || "")}`}
          >
            Open text message <Icon name="phone" size={16} />
          </a>
        </div>
        <p className="copy-status" role="status">
          {copyStatus}
        </p>
      </Modal>
    </>
  );
}
