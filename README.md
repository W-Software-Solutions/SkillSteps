# SkillPath - AI-Powered Learning Roadmaps

A futuristic SaaS-style web application that generates personalized learning roadmaps using Google's Gemini AI. Built with Next.js 14, TypeScript, TailwindCSS, and shadcn/ui.

## ✨ Features

- **AI-Powered Learning Plans**: Generate customized learning roadmaps based on your topic, time investment, and skill level
- **Interactive UI**: Modern glassmorphic design with neon gradient accents and smooth animations
- **Modular Structure**: Expandable modules with checkpoints and curated video recommendations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Feedback**: Toast notifications and loading states for better UX
- **YouTube Integration**: Direct links to recommended educational videos

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom glassmorphic components
- **UI Components**: shadcn/ui (Button, Input, Select, Card, Accordion, Badge, Skeleton, Toast)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **AI**: Google Gemini API
- **State Management**: React Hooks

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key
- YouTube Data API v3 key (for video verification)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd skillpath
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys to `.env.local`:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   YOUTUBE_API_KEY=your_actual_youtube_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 API Setup Instructions

### Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` as `GEMINI_API_KEY`

### YouTube Data API v3
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the YouTube Data API v3
4. Create credentials (API Key)
5. Add it to your `.env.local` as `YOUTUBE_API_KEY`

## 📁 Project Structure

```
src/
├── app/
│   ├── api/plan/route.ts      # API endpoint for generating learning plans
│   ├── layout.tsx             # Root layout with dark theme
│   ├── page.tsx               # Main page component
│   └── globals.css            # Global styles with glassmorphic design
├── components/
│   ├── Header.tsx             # App header with animated logo
│   ├── TopicForm.tsx          # Form for user input
│   ├── PlanResults.tsx        # Learning plan display
│   ├── VideoCard.tsx          # Individual video recommendation card
│   ├── EmptyState.tsx         # Welcome state component
│   ├── PlanSkeleton.tsx       # Loading skeleton
│   └── ui/                    # shadcn/ui components
└── lib/
    ├── gemini.ts              # Gemini AI integration
    ├── types.ts               # TypeScript type definitions
    └── utils.ts               # Utility functions
```

## 🎨 Design Features

- **Dark Theme**: Elegant dark color scheme with gradient backgrounds
- **Glassmorphic Cards**: Backdrop blur effects with translucent surfaces
- **Neon Gradients**: Indigo → Violet → Fuchsia color scheme
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive Grid**: Adaptive layout for all screen sizes

## 🤖 AI Integration

The app uses Google's Gemini AI to generate structured learning plans with:

- **Topic Analysis**: Understanding of the subject matter
- **Skill-Level Adaptation**: Content appropriate for Beginner/Intermediate/Advanced levels
- **Time Management**: Plans that fit within specified time constraints
- **Resource Curation**: Relevant YouTube video recommendations
- **Learning Strategy**: Best practices and approaches for the topic

## 📊 Learning Plan Structure

Each generated plan includes:

- **Summary**: Overview of what you'll learn
- **Strategy**: Key learning approaches
- **Modules**: 4-8 structured learning modules with:
  - Learning objectives
  - Time estimates
  - Checkpoints for progress tracking
  - Curated video recommendations
- **Additional Resources**: Supplementary learning materials

## 🔧 Customization

The app supports easy customization:

- **Styling**: Modify `globals.css` for design changes
- **AI Prompts**: Update prompts in `lib/gemini.ts`
- **Components**: All components are modular and reusable
- **Types**: Extend types in `lib/types.ts` for new features

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `GEMINI_API_KEY` environment variable
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted

## � Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |
| `YOUTUBE_API_KEY` | Your YouTube Data API v3 key for video verification | Yes |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Google Gemini](https://deepmind.google/technologies/gemini/) for AI capabilities
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for clean icons
