# Nukriti+ Vision & Architecture

## Future Vision
Nukriti+ is designed to be the ultimate private streaming platform for life memories. It is not just a gallery; it's an experience. The goal is to bring the premium, cinematic feel of Netflix to personal family moments.

## Architecture Decisions
- **Frontend**: Next.js 15 App Router provides excellent SEO, performance, and server-side rendering.
- **Backend**: Next.js API Routes and Server Actions handle business logic and secure API interactions.
- **Authentication**: Firebase Authentication offers robust, easy-to-implement security.
- **Database**: Firestore provides real-time capabilities and flexible document storage for video metadata.
- **Storage**: Cloudflare R2 is chosen for its zero egress fees, making it highly cost-effective for streaming video content.
- **Streaming**: HLS.js enables adaptive bitrate streaming, ensuring smooth playback across different network conditions.

## Memory Indexing Strategy
- Memories will be categorized and tagged with metadata (year, category, featured status) in Firestore.
- A global search function will allow filtering by title, category, and year.

## AI Features & Roadmap
- **Phase 1**: Core Platform (Current)
- **Phase 2**: AI Search - Implement natural language search for memories.
- **Phase 3**: Face Recognition - Automatically tag family members in videos.
- **Phase 4**: Memory Recommendations - Suggest videos based on viewing history.
- **Phase 5**: Family Chat - Integrated discussion around specific memories.
- **Phase 6**: AI Generated Documentary - Automatically compile highlight reels from tagged memories.

## UI REQUIREMENTS
The application must NOT be a generic Netflix clone. The UI should feel closer to modern Netflix, Apple TV+, and Disney+.

Requirements:
- Responsive desktop, tablet, and mobile layouts
- Smooth Framer Motion animations
- Lazy-loaded images
- Blur placeholders
- Skeleton loading states
- Scroll-based navbar transitions
- Card hover previews
- Mobile-first optimization
- Touch gesture support
- Momentum scrolling
- Horizontal snapping rows
- Keyboard shortcuts for desktop player
- Double-tap seek for mobile player
- Netflix-style watch page
- Optimized CLS and LCP scores
- Accessibility support
- Reduced motion support
- No layout shifts
- Fully responsive typography
- Progressive image loading
- Route transition animations
- Dynamic hero transitions
