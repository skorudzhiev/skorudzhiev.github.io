---
layout: page
title: "Projects"
header: false
permalink: /projects/
---

<div class="projects-page">
    <!-- Filter Controls -->
    <div class="filter-controls">
        <button class="filter-btn active" data-filter="all">All Projects</button>
        <button class="filter-btn" data-filter="web-apps">Web Apps</button>
        <button class="filter-btn" data-filter="mobile-apps">Mobile Apps</button>
        <button class="filter-btn" data-filter="games">Games</button>
    </div>

    <!-- Projects Grid -->
    <div class="projects-grid">
        {% for project in site.data.projects %}
            {% include project-card.html
                title=project.title
                description=project.description
                tech=project.tech
                link=project.link
                icon=project.icon
                category=project.category
                status=project.status
            %}
        {% endfor %}
    </div>
</div>

<style>
.projects-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

/* Filter Controls */
.filter-controls {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.filter-btn {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 25px;
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: #4a5568;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.filter-btn:hover {
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
}

.filter-btn.active {
    background: #3182ce;
    color: white;
    border-color: #3182ce;
}

/* Projects Grid */
.projects-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
    gap: 2rem !important;
    align-items: start !important;
    width: 100% !important;
}

/* Fallback for older browsers */
@supports not (display: grid) {
    .projects-grid {
        display: flex !important;
        flex-wrap: wrap !important;
        justify-content: space-between !important;
    }
    
    .project-card {
        flex: 0 1 calc(50% - 1rem) !important;
        margin-bottom: 2rem !important;
    }
}

.project-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.1);
    height: fit-content;
    width: 100%;
    box-sizing: border-box;
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
    border-color: rgba(0, 0, 0, 0.15);
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

/* Status Badge */
.project-status {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 1rem;
}

.status-live {
    background: #d1fae5;
    color: #065f46;
}

.status-github {
    background: #e5e7eb;
    color: #374151;
}

.status-development {
    background: #fef3c7;
    color: #92400e;
}

/* Responsive Design */
@media (max-width: 768px) {
    .projects-page {
        padding: 1rem;
    }
    
    .projects-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .filter-controls {
        margin-bottom: 2rem;
    }
    
    .filter-btn {
        padding: 0.6rem 1.2rem;
        font-size: 0.85rem;
    }
    
    .project-content {
        padding: 1.5rem;
    }
}

@media (max-width: 480px) {
    .filter-controls {
        gap: 0.25rem;
    }
    
    .filter-btn {
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});
</script>
