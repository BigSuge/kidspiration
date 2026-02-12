import { useState, useEffect, lazy, Suspense } from 'react';
import { Navigation } from './components/Navigation';
import { KidspirationHero } from './components/KidspirationHero';
import { GlowfestSection } from './components/GlowfestSection';
import { HomeQuickActions } from './components/HomeQuickActions';
import { JoinExploreSection } from './components/JoinExploreSection';
import { BackgroundEffects } from './components/BackgroundEffects';
import { AuthModal } from './components/AuthModal';
import { BirthdayOverlay } from './components/BirthdayOverlay';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { AuthProvider, useAuth } from './utils/AuthContext';
import { Footer } from './components/Footer';
import { Toaster, toast } from 'sonner';

// Lazy Load Pages
const GlowfestPage = lazy(() => import('./components/GlowfestPage').then(module => ({ default: module.GlowfestPage })));
const GamesPage = lazy(() => import('./components/GamesPage').then(module => ({ default: module.GamesPage })));
const LiveTVPage = lazy(() => import('./components/LiveTVPage').then(module => ({ default: module.LiveTVPage })));
const ImpactStoriesPage = lazy(() => import('./components/ImpactStoriesPage').then(module => ({ default: module.ImpactStoriesPage })));
const ImpactStoryPage = lazy(() => import('./components/ImpactStoryPage').then(module => ({ default: module.ImpactStoryPage })));
const ExplorePage = lazy(() => import('./components/ExplorePage').then(module => ({ default: module.ExplorePage })));
const AdminPanel = lazy(() => import('./components/AdminPanel').then(module => ({ default: module.AdminPanel })));
const DashboardPage = lazy(() => import('./components/DashboardPage').then(module => ({ default: module.DashboardPage })));
const ER100Section = lazy(() => import('./components/ER100Section').then(module => ({ default: module.ER100Section })));
const TranslatorsNetworkPage = lazy(() => import('./components/TranslatorsNetworkPage').then(module => ({ default: module.TranslatorsNetworkPage })));
const PartyInitiativePage = lazy(() => import('./components/PartyInitiativePage').then(module => ({ default: module.PartyInitiativePage })));
const MarketplacePage = lazy(() => import('./components/MarketplacePage').then(module => ({ default: module.MarketplacePage })));
const AboutPage = lazy(() => import('./components/AboutPage').then(module => ({ default: module.AboutPage })));
const GivePage = lazy(() => import('./components/GivePage').then(module => ({ default: module.GivePage })));
const GivePageOld = lazy(() => import('./components/GivePageOld').then(module => ({ default: module.GivePageOld })));
// Games are small enough or could be lazy loaded too, let's keep them here for now via their parent or lazy load them if they are big.
// Actually, let's lazy load the games too since they might have assets.
const ColorMeGame = lazy(() => import('./components/games/ColorMeGame').then(module => ({ default: module.ColorMeGame })));
const PuzzleGame = lazy(() => import('./components/games/PuzzleGame').then(module => ({ default: module.PuzzleGame })));
const CrosswordGame = lazy(() => import('./components/games/CrosswordGame').then(module => ({ default: module.CrosswordGame })));
const BibleQuiz = lazy(() => import('./components/games/BibleQuiz').then(module => ({ default: module.BibleQuiz })));
const WordSearchGame = lazy(() => import('./components/games/WordSearchGame').then(module => ({ default: module.WordSearchGame })));
const MazeGame = lazy(() => import('./components/games/MazeGame').then(module => ({ default: module.MazeGame })));
const PaymentSuccessPage = lazy(() => import('./pages/PaymentSuccess').then(module => ({ default: module.PaymentSuccessPage })));
const PaymentFailurePage = lazy(() => import('./pages/PaymentFailure').then(module => ({ default: module.PaymentFailurePage })));
const BlueEliteStaffPage = lazy(() => import('./components/BlueEliteStaffPage').then(module => ({ default: module.BlueEliteStaffPage })));

// Simple Loading Component
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

function AppContent() {
  const { user, isAuthenticated, trackPageVisit } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBirthdayOverlay, setShowBirthdayOverlay] = useState(false);

  // Helper function to parse page from pathname
  const parsePageFromPathname = (pathname: string) => {
    if (pathname === '/') return 'home';
    // Remove leading slash
    const path = pathname.slice(1);
    // Return the full path for nested routes
    return path;
  };

  // Get initial page from URL pathname
  const getInitialPage = () => {
    return parsePageFromPathname(window.location.pathname);
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage());
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [currentStoryId, setCurrentStoryId] = useState<number | null>(null);

  useEffect(() => {
    // Update favicon
    const updateFavicon = () => {
      let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = '/favicon.ico';
    };
    updateFavicon();

    // Update page title
    document.title = 'Kidspiration - Inspiring Young Hearts Worldwide';

    // Handle browser back/forward buttons
    const handlePopState = () => {
      const pathname = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const page = parsePageFromPathname(pathname);
      const game = params.get('game');
      const storyId = params.get('story');

      setCurrentPage(page);
      setCurrentGame(game);
      setCurrentStoryId(storyId ? parseInt(storyId) : null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Track page visits
    if (isAuthenticated) {
      trackPageVisit(currentPage);
    }
  }, [currentPage, isAuthenticated]);

  // Check for birthday on initial load
  useEffect(() => {
    if (isAuthenticated && user && isBirthday(user.birthday)) {
      // Check if we've already shown the birthday message today
      const lastBirthdayShown = localStorage.getItem('lastBirthdayShown');
      const today = new Date().toDateString();
      if (lastBirthdayShown !== today) {
        setShowBirthdayOverlay(true);
        localStorage.setItem('lastBirthdayShown', today);
      }
    }
  }, [isAuthenticated, user]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setCurrentGame(null);
    setCurrentStoryId(null);

    // Update URL with browser history support using pathname
    const newPath = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', newPath);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewStory = (storyId: number) => {
    setCurrentStoryId(storyId);

    // Update URL with story ID as query param
    const url = new URL(window.location.href);
    url.searchParams.set('story', storyId.toString());
    window.history.pushState({}, '', url);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStories = () => {
    setCurrentStoryId(null);

    // Update URL to remove story ID, keeping the pathname
    const url = new URL(window.location.href);
    url.searchParams.delete('story');
    window.history.pushState({}, '', url);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGameSelect = (gameId: string) => {
    // Check if user is authenticated to play games
    if (!isAuthenticated) {
      toast.error('Please join Kidspiration to play games!', {
        duration: 3000,
      });
      setShowAuthModal(true);
      return;
    }
    setCurrentGame(gameId);

    // Update URL with game ID as query param, keeping the pathname
    const url = new URL(window.location.href);
    url.searchParams.set('game', gameId);
    window.history.pushState({}, '', url);
  };

  const handleBackToGames = () => {
    setCurrentGame(null);

    // Update URL to remove game ID, keeping the pathname
    const url = new URL(window.location.href);
    url.searchParams.delete('game');
    window.history.pushState({}, '', url);
  };

  // Helper function to check if today is user's birthday
  const isBirthday = (birthday?: string): boolean => {
    if (!birthday) return false;
    const birthDate = new Date(birthday);
    const today = new Date();
    return birthDate.getMonth() === today.getMonth() && birthDate.getDate() === today.getDate();
  };

  const handleAuthSuccess = () => {
    if (user) {
      // Check if it's the user's birthday
      if (isBirthday(user.birthday)) {
        setShowBirthdayOverlay(true);
      } else {
        const welcomeMessage = user.title
          ? `Welcome back ${user.title} ${user.firstName} ${user.lastName}!`
          : `Welcome back ${user.firstName} ${user.lastName}!`;

        toast.success(welcomeMessage, {
          duration: 4000,
        });

        // Redirect admin to admin panel
        if (user.type === 'admin') {
          handleNavigate('admin');
        }
      }
    }
  };

  const renderPage = () => {
    // If a game is selected, show the game
    if (currentPage === 'games' && currentGame) {
      return (
        <Suspense fallback={<PageLoader />}>
          {(() => {
            switch (currentGame) {
              case 'color-me':
                return <ColorMeGame onBack={handleBackToGames} />;
              case 'puzzle':
                return <PuzzleGame onBack={handleBackToGames} />;
              case 'crossword':
                return <CrosswordGame onBack={handleBackToGames} />;
              case 'bible-quiz':
                return <BibleQuiz onBack={handleBackToGames} />;
              case 'word-search':
                return <WordSearchGame onBack={handleBackToGames} />;
              case 'maze':
                return <MazeGame onBack={handleBackToGames} />;
              default:
                return <GamesPage onGameSelect={handleGameSelect} />;
            }
          })()}
        </Suspense>
      );
    }

    // Regular page routing
    return (
      <Suspense fallback={<PageLoader />}>
        {(() => {
          switch (currentPage) {
            case 'home':
              return (
                <>
                  <div className="container mx-auto px-4 sm:px-6 pt-24 md:pt-[144px] pr-[27px] pl-[27px]">
                    <KidspirationHero
                      onAuthClick={() => setShowAuthModal(true)}
                      onNavigate={handleNavigate}
                    />
                  </div>

                  <HomeQuickActions
                    onNavigate={handleNavigate}
                    onAuthClick={() => setShowAuthModal(true)}
                  />

                  <GlowfestSection onNavigate={handleNavigate} />
                  <JoinExploreSection
                    onAuthClick={() => setShowAuthModal(true)}
                    onNavigate={handleNavigate}
                  />
                </>
              );

            case 'about':
              return <AboutPage onNavigate={handleNavigate} />;

            case 'games':
              return <GamesPage onGameSelect={handleGameSelect} />;

            case 'live-tv':
              return <LiveTVPage />;

            case 'impact-stories':
              if (currentStoryId !== null) {
                return (
                  <ImpactStoryPage
                    storyId={currentStoryId}
                    onBack={handleBackToStories}
                    onViewStory={handleViewStory}
                  />
                );
              }
              return (
                <ImpactStoriesPage
                  onViewStory={handleViewStory}
                  onAuthClick={() => setShowAuthModal(true)}
                />
              );

            case 'explore':
              return <ExplorePage onNavigate={handleNavigate} />;

            case 'dashboard':
              if (isAuthenticated) {
                return <DashboardPage onNavigate={handleNavigate} />;
              } else {
                // This side effect might be better handled in useEffect, but for now:
                // We return null to avoid rendering anything while redirecting/toasting
                // To avoid "cannot update while rendering" warnings, strict mode checks.
                // Better to just show placeholder or redirect logic elsewhere.
                // Keeping original logic structure but ensuring no render loop.
                setTimeout(() => {
                  if (currentPage === 'dashboard' && !isAuthenticated) {
                    handleNavigate('home');
                    toast.error('Please login to access your dashboard.', { duration: 3000 });
                  }
                }, 0);
                return <PageLoader />;
              }

            case 'payment/success':
              return <PaymentSuccessPage onNavigate={handleNavigate} />;

            case 'payment/failure':
              return <PaymentFailurePage onNavigate={handleNavigate} />;

            case 'admin':
              if (user?.type === 'admin') {
                return <AdminPanel />;
              } else {
                setTimeout(() => {
                  if (currentPage === 'admin' && user?.type !== 'admin') {
                    handleNavigate('home');
                    toast.error('Access denied. Admin only.', { duration: 3000 });
                  }
                }, 0);
                return <PageLoader />;
              }

            case 'er100':
              return <ER100Section onBack={() => handleNavigate('explore')} onAuthClick={() => setShowAuthModal(true)} />;

            case 'translators':
              return <TranslatorsNetworkPage onBack={() => handleNavigate('explore')} onAuthClick={() => setShowAuthModal(true)} />;

            case 'glowfest':
              return <GlowfestPage onBack={() => handleNavigate('home')} onAuthClick={() => setShowAuthModal(true)} />;

            case 'party':
              return <PartyInitiativePage onBack={() => handleNavigate('explore')} onAuthClick={() => setShowAuthModal(true)} />;

            case 'marketplace':
              return <MarketplacePage onBack={() => handleNavigate('explore')} onAuthClick={() => setShowAuthModal(true)} />;

            case 'give':
              return <GivePage onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;

            case 'give/old':
              return <GivePageOld onBack={() => handleNavigate('give')} onNavigate={handleNavigate} />;

            case 'give/blueelitestaff':
              return <BlueEliteStaffPage onBack={() => handleNavigate('give')} onNavigate={handleNavigate} />;

            default:
              return null;
          }
        })()}
      </Suspense>
    );
  };

  return (
    <div className="min-h-screen bg-white relative">
      <BackgroundEffects />

      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onAuthClick={() => setShowAuthModal(true)}
      />

      <main className="relative z-10">
        {renderPage()}
      </main>

      <Footer onNavigate={handleNavigate} />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      <BirthdayOverlay
        isOpen={showBirthdayOverlay}
        onClose={() => setShowBirthdayOverlay(false)}
        userName={user ? `${user.firstName} ${user.lastName}` : ''}
        userTitle={user?.title}
      />

      {currentPage !== 'give' && <ScrollToTopButton />}

      <Toaster position="top-center" richColors />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
