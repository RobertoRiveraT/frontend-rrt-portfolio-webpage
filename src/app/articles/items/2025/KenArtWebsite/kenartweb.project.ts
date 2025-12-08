import { WorkItem } from '../../../work-item.interface';

export const KenArtWebProject: WorkItem = {
    title: 'Ken Art — Artist Portfolio Website',
    category: ['Projects', 'Fullstack'],
    cardColor: 'blue',
    startDate: '2025-12',
    endDate: '2025-12',
    description:
        'Designed and developed a modern, elegant portfolio website for a visual artist. Built with <strong>Next.js 14</strong>, <strong>TypeScript</strong>, and <strong>Tailwind CSS</strong>. Features a responsive gallery with category filters, smooth animations with <strong>Framer Motion</strong>, and image hosting via <strong>Cloudinary CDN</strong> for optimal performance.',

    bullets: [
        '<strong>Next.js 14</strong> with App Router for modern React architecture and server-side rendering',
        'Elegant <strong>responsive design</strong> with <strong>Tailwind CSS</strong> optimized for mobile devices',
        'Interactive <strong>gallery with category filters</strong> for easy artwork browsing',
        'Smooth page transitions and micro-interactions using <strong>Framer Motion</strong>',
        '<strong>Cloudinary integration</strong> for automatic image optimization (WebP/AVIF) and global CDN delivery',
        'Custom typography with <strong>Playfair Display</strong> (serif) and <strong>Source Sans 3</strong> (sans-serif)',
        'SEO-optimized with meta tags, sitemap, and structured data for social sharing',
        'Deployed on <strong>Vercel</strong> with automatic CI/CD from GitHub',
        'Custom domain: <strong>kenartweb.com</strong>'
    ],

    readMoreText:
        '<h2>Project Overview</h2>' +
        '<p>Ken Art is a portfolio website designed for visual artists to showcase their work in an elegant, gallery-style presentation. The site emphasizes visual impact while maintaining fast load times through smart image optimization.</p>' +
        
        '<h2>Technical Highlights</h2>' +
        '<ul>' +
        '<li><strong>Next.js 14 App Router:</strong> Leverages the latest React Server Components for optimal performance</li>' +
        '<li><strong>Tailwind CSS:</strong> Custom color palette with canvas (cream/beige backgrounds), ink (dark text), and accent (gold) colors</li>' +
        '<li><strong>Cloudinary CDN:</strong> Images are automatically converted to WebP/AVIF, resized on-the-fly, and served from a global CDN</li>' +
        '<li><strong>Framer Motion:</strong> Smooth gallery animations, hover effects, and page transitions</li>' +
        '</ul>' +

        '<h2>Design Philosophy</h2>' +
        '<p>The design prioritizes the artwork itself, using a neutral color palette that doesn\'t compete with the pieces on display. Typography choices (Playfair Display for headings, Source Sans for body) create a sophisticated, gallery-like atmosphere.</p>' +

        '<h4 style="margin-top: 1rem; color: #007acc;">🌐 <strong>Live Website: </strong>' +
        '<a href="https://kenartweb.com" target="_blank">kenartweb.com</a></h4>' +
        
        '<h4 style="margin-top: 0.5rem; color: #007acc;">📂 <strong>Repository: </strong>' +
        '<a href="https://github.com/RobertoRiveraT/kenart_website" target="_blank">View on GitHub</a></h4>',

    link: 'https://kenartweb.com',
    thumbnail: 'assets/img/work/2025/kenart_thumb.jpg',
    readMoreOpen: false
};

