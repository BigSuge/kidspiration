import { motion } from 'motion/react';
import { Heart, MapPin, Quote, ArrowRight, Search, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { impactStories } from './impactStories';
import { useState, useMemo } from 'react';

interface ImpactStoriesPageProps {
  onViewStory?: (storyId: number) => void;
  onAuthClick?: () => void;
}

export function ImpactStoriesPage({ onViewStory, onAuthClick }: ImpactStoriesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Kidspiration Heroes' | 'Kidspiration Champions'>('All');

  // All stories from the data file
  const allStories = impactStories;

  // Filter and search stories
  const filteredStories = useMemo(() => {
    let filtered = allStories;

    // Apply category filter
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(story => story.category === selectedFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(story => 
        story.name.toLowerCase().includes(query) ||
        story.title.toLowerCase().includes(query) ||
        story.location.toLowerCase().includes(query) ||
        story.story.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Heart className="w-12 h-12 text-[#FF6B9D]" />
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] text-5xl font-extrabold text-[40px] text-center">
              Impact Stories
            </h1>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-[20px]">
            Real stories from real kids making a real difference around the world. You can be next!
          </p>
        </motion.div>

        {/* Global Impact Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-r from-[#FFE5EF] via-[#E9D5FF] to-[#D1FAE5] rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-gray-900 mb-3 text-[28px] font-bold">
                See Our Impact Around the World 🌍
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Watch how Kidspiration is transforming lives and spreading hope to children across continents!
              </p>
            </div>
            
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
              <video
                className="w-full h-full object-cover"
                src="/videos/KIDSPIRATION_IMPACT.mp4"
                controls
                controlsList="nodownload"
                playsInline
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search stories by name, location, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-full border-2 border-gray-200 focus:border-[#FF6B9D] focus:outline-none transition-all text-gray-700"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-gray-600 mr-2">Filter by:</span>
            {(['All', 'Kidspiration Heroes', 'Kidspiration Champions'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full transition-all transform hover:scale-105 ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-[#FF6B9D] to-[#A78BFA] text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#FF6B9D]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-center text-gray-600 mt-6">
            Showing {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </motion.div>

        {/* Stories Grid */}
        {filteredStories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-600 text-2xl mb-2">No stories found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onViewStory?.(story.id)}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer hover:scale-105 transform"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Impact Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm">
                  {story.impact}
                </div>

                {/* Name & Location */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="mb-1">{story.name}{story.age && `, ${story.age}`}</h3>
                  <div className="flex items-center gap-1 text-sm text-white/90">
                    <MapPin className="w-4 h-4" />
                    <span>{story.location}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-gray-900 mb-3 font-bold">{story.title}</h4>
                <div className="relative">
                  <Quote className="w-6 h-6 text-[#FF6B9D]/20 absolute -top-2 -left-2" />
                  <p className="text-gray-600 pl-4 italic">
                    {story.story}
                  </p>
                </div>
                
                {/* Read More Button */}
                <div className="mt-4 flex items-center gap-2 text-[#FF6B9D] group-hover:gap-3 transition-all">
                  <span>Read Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-[#FFE5EF] to-[#E9D5FF] rounded-3xl">
            <h2 className="text-gray-900 mb-4 text-[24px] font-bold">Your Story Could Be Next!</h2>
            <p className="text-gray-700 mb-6">
              Join Kidspiration and start making a difference in your community today!
            </p>
            <button 
              onClick={onAuthClick}
              className="px-8 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#A78BFA] text-white rounded-full hover:shadow-xl transform hover:scale-105 transition-all font-bold"
            >
              Join the Movement
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
