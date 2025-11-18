import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Heart, Share2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { impactStories } from './impactStories';
import { ImageGallery } from './ImageGallery';

interface ImpactStoryPageProps {
  storyId: number;
  onBack: () => void;
  onViewStory?: (storyId: number) => void;
}

export function ImpactStoryPage({ storyId, onBack, onViewStory }: ImpactStoryPageProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [storyId]);

  const story = impactStories.find(s => s.id === storyId);

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-gray-800 mb-4">Story Not Found</h2>
          <Button onClick={onBack} className="bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] text-white rounded-full px-8 py-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Impact Stories
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 px-4">
      <div className="container mx-auto max-w-4xl mt-[100px]">
        {/* Back Button */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Button
            onClick={onBack}
            className="bg-white text-gray-700 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-[#FF6B9D]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Impact Stories
          </Button>
        </motion.div>

        {/* Article Container */}
        <motion.article
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Hero Section with Image */}
          <div className="relative h-96 overflow-hidden">
            <ImageWithFallback
              src={story.image}
              alt={story.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Impact Badge */}
            <div className="absolute top-6 right-6">
              <span className="px-6 py-3 bg-gradient-to-r from-[#FF6B9D] to-[#A78BFA] text-white rounded-full shadow-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {story.impact}
              </span>
            </div>

            {/* Hero Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5" />
                <span className="text-xl">{story.location}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl mb-2 leading-tight">
                {story.name}'s Story
              </h1>
              <p className="text-2xl text-white/90">{story.title}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-10">
            {/* Meta Info */}
            <div className="flex items-center gap-4 pb-6 mb-8 border-b-2 border-gray-100">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFE5EF] to-[#E9D5FF] rounded-full">
                <Heart className="w-5 h-5 text-[#FF6B9D]" />
                <span className="text-gray-700">Age {story.age}</span>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-[#D5F5F6] to-[#E0F2FE] rounded-full">
                <span className="text-gray-700">Impact Story</span>
              </div>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <p className="text-xl text-gray-700 leading-relaxed bg-gradient-to-r from-[#FFF5F7] to-[#F0F9FF] p-6 rounded-2xl border-l-4 border-[#FF6B9D]">
                {story.fullStory.intro}
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              {story.fullStory.sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <h2 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] mb-4">
                    {section.heading}
                  </h2>
                  
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {section.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Conclusion */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 p-6 bg-gradient-to-r from-[#FFE66D]/20 to-[#FFC93C]/20 rounded-2xl border-2 border-[#FFE66D]"
            >
              <h3 className="text-2xl text-gray-900 mb-4 font-bold text-[24px]">The Takeaway</h3>
              <p className="text-lg text-gray-800 leading-relaxed">
                {story.fullStory.conclusion}
              </p>
            </motion.div>

            {/* Testimonial */}
            {story.fullStory.testimonial && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 p-6 bg-gradient-to-r from-[#E9D5FF] to-[#DDD6FE] rounded-2xl"
              >
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-[#A78BFA] flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-800 italic">
                    {story.fullStory.testimonial}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Image Gallery */}
            {'gallery' in story && story.gallery && story.gallery.length > 0 && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <ImageIcon className="w-6 h-6 text-[#FF6B9D]" />
                  <h3 className="text-2xl text-gray-900">Photo Gallery</h3>
                </div>
                <ImageGallery images={story.gallery} title={story.title} />
              </motion.div>
            )}

            {/* Share Section */}
            <div className="mt-10 pt-8 border-t-2 border-gray-100">
              <p className="text-gray-600 mb-4 text-center text-xl">Inspired by this story? Share it with others!</p>
              <div className="flex justify-center gap-3">
                <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] text-white rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share This Story
                </Button>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Related Stories */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12"
        >
          <h3 className="text-3xl text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4]">
            More Inspiring Stories
          </h3>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {impactStories
              .filter(s => s.id !== storyId)
              .slice(0, 3)
              .map((relatedStory) => (
                <div
                  key={relatedStory.id}
                  onClick={() => {
                    onViewStory?.(relatedStory.id);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <div className="h-40 overflow-hidden relative">
                    <ImageWithFallback
                      src={relatedStory.image}
                      alt={relatedStory.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <p className="text-sm">{relatedStory.name}, {relatedStory.age}</p>
                      <p className="text-xs text-white/80">{relatedStory.location}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-gray-800 mb-2 line-clamp-2">
                      {relatedStory.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedStory.story}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center p-8 bg-gradient-to-r from-[#FFE5EF] to-[#E9D5FF] rounded-3xl"
        >
          <h3 className="text-2xl text-gray-900 mb-4">Your Story Could Be Next!</h3>
          <p className="text-lg text-gray-700 mb-6">
            Join Kidspiration and start making a difference in your community today!
          </p>
          <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#A78BFA] text-white rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            Join the Movement
          </Button>
        </motion.div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-[#4ECDC4] to-[#06B6D4] text-white rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to All Stories
          </Button>
        </div>
      </div>
    </div>
  );
}
