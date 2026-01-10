# PromptPal.ai

AI-Powered Content Creation Platform

PromptPal is an innovative SaaS platform designed to democratize content creation by helping users generate high-quality images, videos, and social media content through intelligent prompt assistance.

<img width="2003" height="1420" alt="homepage" src="https://github.com/user-attachments/assets/385872ce-d9b3-44f8-8445-a4e8dde0bc84" />
<img width="2006" height="1428" alt="customer-dashbaord" src="https://github.com/user-attachments/assets/6424d2ee-4726-4981-a328-7c395accbc17" />
<img width="2082" height="1434" alt="admin-dashboard" src="https://github.com/user-attachments/assets/8736d970-480d-4a2b-a340-4b2398b0f623" />



## Features

- **Smart Prompt System** - AI-powered prompt suggestions and one-click enhancement
- **Multi-Model Generation** - Support for SDXL, Flux, DALL-E 3, Stable Diffusion 3
- **Video Creation** - AnimateDiff and Stable Video Diffusion integration
- **Credit-Based Pricing** - Flexible pay-as-you-go model
- **Prompt Library** - Save, organize, and reuse your best prompts
- **Generation History** - Track all your AI-generated content

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** Shadcn/ui
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/promptpal.ai.git
cd promptpal.ai
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (admin)/           # Admin dashboard routes
│   │   └── admin/
│   │       ├── page.tsx           # Admin dashboard
│   │       ├── moderation/        # Content moderation
│   │       └── settings/          # Platform settings
│   ├── (auth)/            # Authentication routes
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/       # User dashboard routes
│   │   ├── dashboard/             # Main generation interface
│   │   ├── prompts/               # Prompt library
│   │   ├── history/               # Generation history
│   │   └── settings/              # User settings
│   ├── (legal)/           # Legal pages
│   │   ├── privacy/
│   │   └── terms/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles & design tokens
├── components/
│   ├── dashboard/         # Dashboard components
│   │   ├── Sidebar.tsx
│   │   └── DashboardHeader.tsx
│   ├── landing/           # Landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── CTASection.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/                # Shadcn/ui components
└── lib/
    └── utils.ts           # Utility functions
```

## Available Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | User login |
| `/register` | User registration |
| `/forgot-password` | Password reset |
| `/dashboard` | AI generation interface |
| `/prompts` | Prompt library |
| `/history` | Generation history |
| `/settings` | User settings |
| `/admin` | Admin dashboard |
| `/admin/moderation` | Content moderation |
| `/admin/settings` | Platform settings |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## Pricing Tiers

| Plan | Credits | Price | Per Credit |
|------|---------|-------|------------|
| Starter | 20 | $5 | $0.25 |
| Growth | 50 | $10 | $0.20 |
| Professional | 100 | $15 | $0.15 |
| Enterprise | Custom | Contact Sales | Volume Discount |

## Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## Design System

### Color Palette

- **Primary (Mint):** `#22c55e` - Primary actions and accents
- **Success:** `#10B981` - Success states
- **Warning:** `#F59E0B` - Warning states
- **Error:** `#EF4444` - Error states

### Typography

- **Font Family:** Inter (Google Fonts)
- **Headings:** Bold (700) / Semibold (600)
- **Body:** Regular (400)

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AI Services (for backend integration)
HUGGINGFACE_API_KEY=hf_...
OPENAI_API_KEY=sk-...

# Payment (for backend integration)
STRIPE_PUBLIC_KEY=pk_...
STRIPE_SECRET_KEY=sk_...

# Storage (for backend integration)
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_BUCKET=promptpal-storage
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/promptpal.ai)

### Docker

```bash
docker build -t promptpal .
docker run -p 3000:3000 promptpal
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Support

- Documentation: [docs.promptpal.ai](https://docs.promptpal.ai)
- Email: support@promptpal.ai
- Community: [community.promptpal.ai](https://community.promptpal.ai)

---

## Hire / Work with Me

Looking for custom development, integrations, or consulting? Let's connect!

- **Fiverr** (custom builds, integrations, performance): [fiverr.com/s/EgxYmWD](https://www.fiverr.com/s/EgxYmWD)
- **Mejba Personal Portfolio**: [mejba.me](https://www.mejba.me)
- **Ramlit Limited**: [ramlit.com](https://www.ramlit.com)
- **ColorPark Creative Agency**: [colorpark.io](https://www.colorpark.io)
- **xCyberSecurity Global Services**: [xcybersecurity.io](https://www.xcybersecurity.io)

---

Built with Next.js by [Ramlit Limited](https://ramlit.com)
