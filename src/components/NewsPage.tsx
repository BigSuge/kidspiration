import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Calendar, User, Clock, Search, Filter, ArrowRight, Sparkles, Heart, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { blogPosts } from './blogPosts';

interface NewsPageProps {
  onSelectPost?: (postId: number) => void;
}

export function NewsPage({ onSelectPost }: NewsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', label: 'All Stories', icon: '📚', color: 'from-[#FF6B9D] to-[#F472B6]' },
    { id: 'testimonies', label: 'Testimonies', icon: '✨', color: 'from-[#4ECDC4] to-[#06B6D4]' },
    { id: 'events', label: 'Events', icon: '🎉', color: 'from-[#FFE66D] to-[#FFC93C]' },
    { id: 'bible', label: 'Bible Stories', icon: '📖', color: 'from-[#A78BFA] to-[#8B5CF6]' },
    { id: 'health', label: 'Healthy Living', icon: '💪', color: 'from-[#10B981] to-[#059669]' },
    { id: 'miracles', label: 'Miracles', icon: '🌟', color: 'from-[#F472B6] to-[#EC4899]' },
  ];

  const filteredArticles = blogPosts.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = blogPosts.find(article => article.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFFFFF] to-[#F0F9FF] py-8 px-4">
      <motion.div
        ref={ref}
        className="container mx-auto max-w-7xl mt-[100px]"
        style={{
          transform: isInView ? 'none' : 'rotateY(-15deg)',
          opacity: isInView ? 1 : 0.3,
          transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-[#FFE66D]" />
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] text-[36px] sm:text-[48px] font-semibold">
              HTTN News
            </h1>
            <Sparkles className="w-8 h-8 text-[#4ECDC4]" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-[18px] sm:text-[20px] px-4">
            Amazing stories, testimonies, and fun updates just for you! 🌟
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-[#FF6B9D] focus:outline-none transition-all text-gray-700 bg-white shadow-lg"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-3 mb-12 overflow-x-auto pb-4 px-2 scrollbar-hide justify-center flex-wrap"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white`
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Article */}
        {featuredArticle && selectedCategory === 'all' && !searchQuery && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div 
              onClick={() => onSelectPost?.(featuredArticle.id)}
              className="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all group cursor-pointer border-4 border-[#FFE66D]"
            >
              <div className="absolute top-6 left-6 z-10">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFE66D] to-[#FFC93C] text-gray-800 rounded-full shadow-lg">
                  <Star className="w-4 h-4" />
                  <span className="font-semibold">Featured Story</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <ImageWithFallback
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-4 py-1 bg-gradient-to-r from-[#4ECDC4] to-[#06B6D4] text-white rounded-full text-sm">
                      {categories.find(c => c.id === featuredArticle.category)?.label}
                    </span>
                  </div>
                  
                  <h2 className="text-[28px] sm:text-[32px] text-gray-800 mb-4 group-hover:text-[#FF6B9D] transition-colors">
                    {featuredArticle.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 text-[16px] sm:text-[18px] leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredArticle.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredArticle.readTime}</span>
                    </div>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] text-white rounded-full px-8 py-6 hover:shadow-xl transition-all w-full sm:w-auto">
                    Read Full Story
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              onClick={() => onSelectPost?.(article.id)}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-[#FF6B9D]/30"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-2 bg-gradient-to-r ${categories.find(c => c.id === article.category)?.color} text-white rounded-full text-xs shadow-lg`}>
                    {categories.find(c => c.id === article.category)?.icon} {categories.find(c => c.id === article.category)?.label}
                  </span>
                </div>
                {article.featured && (
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-[#FFE66D] rounded-full flex items-center justify-center shadow-lg">
                      <Star className="w-5 h-5 text-gray-800" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-[20px] text-gray-800 group-hover:text-[#FF6B9D] transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <button className="flex items-center gap-2 text-[#FF6B9D] hover:text-[#F472B6] transition-colors group/btn pt-2">
                  <span className="font-semibold">Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No Results Message */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-[24px] text-gray-700 mb-2">No Stories Found</h3>
            <p className="text-gray-500">Try searching for something else or select a different category!</p>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredArticles.length > 0 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Button className="px-8 py-6 bg-gradient-to-r from-[#4ECDC4] to-[#06B6D4] hover:from-[#06B6D4] hover:to-[#4ECDC4] text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <Heart className="w-5 h-5 mr-2" />
              Load More Stories
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
