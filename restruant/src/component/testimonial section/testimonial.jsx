import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './testimonial.css';

const TESTIMONIALS = [
  {
    name: "Jennifer Martinez",
    role: "Food Critic, Eater Magazine",
    rating: 5,
    text: "Ember & Grain isn't just a meal — it's a performance. From the moment you walk in, the choreography of fire, smoke, and flavour transports you somewhere extraordinary. The wood-fired ribeye changed my understanding of what steak can be.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    date: "March 2024"
  },
  {
    name: "David Thompson",
    role: "Chef & Restaurateur",
    rating: 5,
    text: "Finally, a restaurant that understands the soul of cooking. The open kitchen concept isn't just for show — every dish tells a story of patience, precision, and passion. Chef Michael is doing something truly special here.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "February 2024"
  },
  {
    name: "Sarah Chen",
    role: "Regular Diner",
    rating: 5,
    text: "I've celebrated three birthdays here. The consistency is unreal — every visit feels as magical as the first. The staff remembers your name, your wine preference, and makes you feel like family.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "January 2024"
  },
  {
    name: "Marcus Williams",
    role: "Wine Enthusiast",
    rating: 5,
    text: "The sommelier curated a perfect pairing for our tasting menu. Each wine elevated the dish in unexpected, revelatory ways. This is destination dining at its finest — worth the journey from anywhere.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    date: "December 2023"
  },
  {
    name: "Emily Rodriguez",
    role: "Private Event Host",
    rating: 5,
    text: "We booked the chef's table for our anniversary. Worth every penny. The attention to detail, the stories behind each course, the intimacy of the experience — genuinely unforgettable.",
    avatar: "https://randomuser.me/api/portraits/women/89.jpg",
    date: "November 2023"
  },
  {
    name: "Thomas Keller",
    role: "Industry Peer",
    rating: 5,
    text: "What Chef Michael has built here is remarkable. The balance of technique and soul is rare in this industry. Ember & Grain represents the future of American fine dining, executed with quiet brilliance.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    date: "October 2023"
  }
];

const PLATFORMS = [
  { name: "Google",      score: "4.9" },
  { name: "TripAdvisor", score: "4.8" },
  { name: "Yelp",        score: "4.9" },
  { name: "OpenTable",   score: "4.9" },
];

function StarRow({ count = 5, size = 'normal' }) {
  return (
    <div className="testi-stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < count ? 'testi-star-filled' : 'testi-star-empty'}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonial() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="testi-section" id="testimonials">

      {/* Ambient background */}
      <div className="testi-orb testi-orb--1" />
      <div className="testi-orb testi-orb--2" />
      <div className="testi-orb testi-orb--3" />
      <div className="testi-grain" />

      <div className="testi-container">

        {/* ── Header ── */}
        <header className="testi-header">
          <div className="testi-eyebrow">
            <span className="testi-eyebrow-rule" />
            <span className="testi-label">Guest Experiences</span>
            <span className="testi-eyebrow-rule testi-eyebrow-rule--right" />
          </div>
          <h2 className="testi-title">
            Voices of Those
            <em>Who've Dined With Us</em>
          </h2>
          <p className="testi-lead">
            Every table has a story. Here are a few our guests have chosen to share.
          </p>
        </header>

        {/* ── Carousel ── */}
        <div className="testi-carousel-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              480:  { slidesPerView: 1,   spaceBetween: 16 },
              768:  { slidesPerView: 2,   spaceBetween: 20 },
              1024: { slidesPerView: 3,   spaceBetween: 24 },
              1280: { slidesPerView: 3,   spaceBetween: 28 },
            }}
            className="testi-swiper"
          >
            {TESTIMONIALS.map((t, i) => (
              <SwiperSlide key={i}>
                <article className="testi-card">
                  {/* Shimmer layer */}
                  <div className="testi-card-glow" />

                  {/* Decorative corners */}
                  <div className="testi-corner testi-corner--tl" />
                  <div className="testi-corner testi-corner--br" />

                  {/* Opening quote */}
                  <span className="testi-quote-mark">"</span>

                  {/* Stars */}
                  <StarRow count={t.rating} />

                  {/* Review body */}
                  <p className="testi-text">{t.text}</p>

                  {/* Divider */}
                  <div className="testi-divider" />

                  {/* Reviewer info */}
                  <div className="testi-user">
                    <div className="testi-avatar">
                      <img src={t.avatar} alt={t.name} loading="lazy" />
                    </div>
                    <div className="testi-user-info">
                      <h4 className="testi-user-name">{t.name}</h4>
                      <p className="testi-user-role">{t.role}</p>
                      <span className="testi-user-date">{t.date}</span>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Nav buttons */}
          <button className="testi-nav testi-nav--prev" ref={prevRef} aria-label="Previous review">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="testi-nav testi-nav--next" ref={nextRef} aria-label="Next review">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ── Aggregate Rating ── */}
        <div className="testi-aggregate">
          <div className="testi-aggregate-left">
            <span className="testi-aggregate-score">4.9</span>
            <div className="testi-aggregate-meta">
              <div className="testi-aggregate-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="testi-star-filled">★</span>
                ))}
              </div>
              <span className="testi-aggregate-count">Based on 1,247 verified reviews</span>
            </div>
          </div>

          <div className="testi-aggregate-sep" />

          <div className="testi-aggregate-platforms">
            {PLATFORMS.map((p) => (
              <div className="testi-platform-item" key={p.name}>
                <span className="testi-platform-name">{p.name}</span>
                <span className="testi-platform-score">{p.score}</span>
                <div className="testi-platform-stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}