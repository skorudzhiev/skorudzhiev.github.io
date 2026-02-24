---
layout: page
title: "Blog"
header: false
permalink: /blog/
---

<div class="blog-page">
  <header class="blog-intro">
    <h1>Blog Posts</h1>
    <p>I build products and run systems.</p>
    <p>When something breaks, I document what I learn.</p>
    <p>These are technical notes from real-world experimentation.</p>
  </header>

  <section class="blog-list">
    <a class="blog-card" href="https://medium.com/" target="_blank" rel="noopener noreferrer">
      <h3>Self-Healing OpenClaw Gateway</h3>
      <p>How I built a production-ready watchdog using systemd timers and real health checks after random gateway failures.</p>
      <p class="card-meta"><span class="meta-pill">Linux</span><span class="meta-pill">systemd</span><span class="meta-pill">Monitoring</span><span class="meta-pill">OpenClaw</span></p>
      <p class="card-source">Published on: Medium</p>
    </a>
  </section>
</div>

<style>
.blog-page {
  max-width: 760px;
  margin: 0 auto;
  padding: 2.5rem 1rem 3rem;
  color: #1c2430;
}

.blog-intro h1 {
  margin: 0 0 1.5rem;
  font-size: 2.15rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.blog-intro p {
  margin: 0.2rem 0;
  color: #3e4d61;
  line-height: 1.65;
}

.blog-list {
  margin-top: 2rem;
  display: grid;
  gap: 1rem;
}

.blog-card {
  display: block;
  text-decoration: none;
  color: inherit;
  border: 1px solid #e4e9f0;
  border-radius: 12px;
  background: #fbfcfe;
  padding: 1rem 1.1rem;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.blog-card:hover {
  border-color: #bcc9d8;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(24, 39, 64, 0.08);
  text-decoration: none;
}

.blog-card:hover h3,
.blog-card:hover p,
.blog-card:hover span {
  text-decoration: none;
}

.blog-card h3 {
  margin: 0 0 0.45rem;
  font-size: 1.16rem;
  line-height: 1.35;
}

.blog-card p {
  margin: 0.35rem 0;
  line-height: 1.58;
  color: #3a485c;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.6rem;
}

.meta-pill {
  display: inline-block;
  padding: 0.16rem 0.5rem;
  border: 1px solid #d9e1eb;
  border-radius: 999px;
  background: #f7f9fc;
  color: #3c4a5e;
  font-size: 0.73rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.card-source {
  margin-top: 0.55rem;
  font-size: 0.9rem;
  color: #55667b;
}

@media (max-width: 640px) {
  .blog-page {
    padding-top: 1.4rem;
  }

  .blog-intro h1 {
    font-size: 1.9rem;
  }
}
</style>
