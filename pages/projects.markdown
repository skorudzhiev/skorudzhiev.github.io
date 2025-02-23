---
layout: page
title: "Projects"
header: false
permalink: /projects/
---

<div class="projects-container">
    {% for project in site.data.projects %}
        {% include project-card.html
            title=project.title
            description=project.description
            technologies=project.technologies
            link=project.link
            icon=project.icon
        %}
    {% endfor %}
</div>

<style>
.projects-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.project-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
}

.project-content {
    padding: 2rem;
}

.project-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.project-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.05);
    overflow: hidden;
    flex-shrink: 0;
}

.project-icon img {
    max-width: 32px;
    max-height: 32px;
    object-fit: contain;
    transition: transform 0.2s ease;
}

.project-card:hover .project-icon img {
    transform: scale(1.1);
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
    border-color: rgba(0, 0, 0, 0.15);
}

.project-card h2 {
    font-size: 1.5rem;
    margin: 0;
    color: #2d3748;
    font-weight: 600;
}

.project-description {
    color: #4a5568;
    line-height: 1.6;
    margin: 0 0 1.5rem 0;
    font-size: 1rem;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.tech-tag {
    background: rgba(0, 0, 0, 0.05);
    color: #4a5568;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;
}

.tech-tag:hover {
    background: rgba(0, 0, 0, 0.1);
}

.project-link {
    display: inline-flex;
    align-items: center;
    color: #3182ce;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.2s ease;
}

.project-link .arrow {
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
}

.project-link:hover {
    color: #2c5282;
}

.project-link:hover .arrow {
    transform: translateX(5px);
}

@media (max-width: 768px) {
    .projects-container {
        padding: 1rem;
    }
    .project-content {
        padding: 1.5rem;
    }
}
</style>
