import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { KidspirationHero } from './components/KidspirationHero';
import { GlowfestSection } from './components/GlowfestSection';
import { HomeQuickActions } from './components/HomeQuickActions';
import { GlowfestPage } from './components/GlowfestPage';
import { JoinExploreSection } from './components/JoinExploreSection';
import { GamesPage } from './components/GamesPage';
import { LiveTVPage } from './components/LiveTVPage';
import { ImpactStoriesPage } from './components/ImpactStoriesPage';
import { ImpactStoryPage } from './components/ImpactStoryPage';
import { ExplorePage } from './components/ExplorePage';
import { AdminPanel } from './components/AdminPanel';
import { DashboardPage } from './components/DashboardPage';
import { ER100Section } from './components/ER100Section';
import { TranslatorsNetworkPage } from './components/TranslatorsNetworkPage';
import { PartyInitiativePage } from './components/PartyInitiativePage';
import { MarketplacePage } from './components/MarketplacePage';
import { AboutPage } from './components/AboutPage';
import { GivePage } from './components/GivePage';
import { ColorMeGame } from './components/games/ColorMeGame';
import { PuzzleGame } from './components/games/PuzzleGame';
import { CrosswordGame } from './components/games/CrosswordGame';
import { BibleQuiz } from './components/games/BibleQuiz';
import { WordSearchGame } from './components/games/WordSearchGame';
import { MazeGame } from './components/games/MazeGame';
import { PaymentSuccessPage } from './pages/PaymentSuccess';
import { PaymentFailurePage } from './pages/PaymentFailure';
import { BackgroundEffects } from './components/BackgroundEffects';
import { AuthModal } from './components/AuthModal';
import { BirthdayOverlay } from './components/BirthdayOverlay';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { AuthProvider, useAuth } from './utils/AuthContext';
import { Footer } from './components/Footer';
import { Toaster, toast } from 'sonner';

function AppContent() {
  const { user, isAuthenticated, trackPageVisit } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBirthdayOverlay, setShowBirthdayOverlay] = useState(false);

  // Helper function to parse page from pathname
  const parsePageFromPathname = (pathname: string) => {
    return pathname === '/' ? 'home' : pathname.slice(1);
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
    }

    // Regular page routing
    switch (currentPage) {
      case 'home':
        return (
          <>
            {/* Hero Section with Container */}
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

            {/* Full Width Sections */}
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
        // If a story is selected, show the individual story page
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
        // Only authenticated users can access dashboard
        if (isAuthenticated) {
          return <DashboardPage onNavigate={handleNavigate} />;
        } else {
          handleNavigate('home');
          toast.error('Please login to access your dashboard.', { duration: 3000 });
          return null;
        }

      case 'payment/success':
        return <PaymentSuccessPage onNavigate={handleNavigate} />;

      case 'payment/failure':
        return <PaymentFailurePage onNavigate={handleNavigate} />;

      case 'admin':
        // Only admins can access this page
        if (user?.type === 'admin') {
          return <AdminPanel />;
        } else {
          handleNavigate('home');
          toast.error('Access denied. Admin only.', { duration: 3000 });
          return null;
        }

      // Program pages
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

      default:
        return null;
    }
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

      <ScrollToTopButton />

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
