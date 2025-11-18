import { useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, Bookmark } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { blogPosts } from './blogPosts';

interface BlogPostPageProps {
  postId: number;
  onBack: () => void;
}

export function BlogPostPage({ postId, onBack }: BlogPostPageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFFFFF] to-[#F0F9FF] py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[32px] text-gray-800 mb-4">Post Not Found</h2>
          <Button onClick={onBack} className="bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] text-white rounded-full px-8 py-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to News
          </Button>
        </div>
      </div>
    );
  }

  const categories = [
    { id: 'testimonies', label: 'Testimonies', color: 'from-[#4ECDC4] to-[#06B6D4]' },
    { id: 'events', label: 'Events', color: 'from-[#FFE66D] to-[#FFC93C]' },
    { id: 'bible', label: 'Bible Stories', color: 'from-[#A78BFA] to-[#8B5CF6]' },
    { id: 'health', label: 'Healthy Living', color: 'from-[#10B981] to-[#059669]' },
    { id: 'miracles', label: 'Miracles', color: 'from-[#F472B6] to-[#EC4899]' },
  ];

  const category = categories.find(c => c.id === post.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFFFFF] to-[#F0F9FF] py-8 px-4">
      <motion.div
        ref={ref}
        className="container mx-auto max-w-4xl mt-[100px]"
        style={{
          transform: isInView ? 'none' : 'rotateY(-15deg)',
          opacity: isInView ? 1 : 0.3,
          transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
        }}
      >
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
            Back to News
          </Button>
        </motion.div>

        {/* Article Container */}
        <motion.article
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Featured Image */}
          <div className="relative h-64 sm:h-96 overflow-hidden">
            <ImageWithFallback
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className={`px-6 py-3 bg-gradient-to-r ${category?.color} text-white rounded-full shadow-lg text-sm`}>
                {category?.label}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-10">
            {/* Title */}
            <h1 className="text-[32px] sm:text-[40px] text-gray-800 mb-6 leading-tight font-semibold">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 pb-6 mb-6 border-b-2 border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-5 h-5 text-[#FF6B9D]" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-[#4ECDC4]" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-[#A78BFA]" />
                <span>{post.readTime} read</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] text-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all">
                <Heart className="w-5 h-5 mr-2" />
                Like
              </Button>
              <Button className="bg-gradient-to-r from-[#4ECDC4] to-[#06B6D4] text-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
              <Button className="bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] text-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all">
                <Bookmark className="w-5 h-5 mr-2" />
                Save
              </Button>
            </div>

            {/* Introduction */}
            <div className="prose max-w-none mb-8">
              <p className="text-[18px] sm:text-[20px] text-gray-700 leading-relaxed bg-gradient-to-r from-[#FFF5F7] to-[#F0F9FF] p-6 rounded-2xl border-l-4 border-[#FF6B9D]">
                {post.content.intro}
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              {post.content.sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  {section.heading && (
                    <h2 className="text-[24px] sm:text-[28px] text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] mb-4 font-semibold">
                      {section.heading}
                    </h2>
                  )}
                  
                  <p className="text-[16px] sm:text-[18px] text-gray-700 leading-relaxed mb-6">
                    {section.text}
                  </p>

                  {section.image && (
                    <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
                      <ImageWithFallback
                        src={section.image}
                        alt={section.heading || 'Article image'}
                        className="w-full h-64 sm:h-80 object-cover"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Conclusion */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 p-6 bg-gradient-to-r from-[#FFE66D]/20 to-[#FFC93C]/20 rounded-2xl border-2 border-[#FFE66D]"
            >
              <p className="text-[18px] sm:text-[20px] text-gray-800 leading-relaxed">
                {post.content.conclusion}
              </p>
            </motion.div>

            {/* Share Again */}
            <div className="mt-10 pt-8 border-t-2 border-gray-100">
              <p className="text-gray-600 mb-4 text-center">Did you enjoy this story? Share it with your friends!</p>
              <div className="flex justify-center gap-3">
                <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] text-white rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share This Story
                </Button>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Related Posts */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <h3 className="text-[28px] text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] font-semibold">
            Read More Stories! 📚
          </h3>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {blogPosts
              .filter(p => p.id !== postId && p.category === post.category)
              .slice(0, 3)
              .map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  onClick={() => window.scrollTo(0, 0)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <div className="h-32 overflow-hidden">
                    <ImageWithFallback
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-gray-800 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>

        {/* Back to Top */}
        <div className="text-center mt-12">
          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-[#4ECDC4] to-[#06B6D4] text-white rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to All News
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
