import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface BlogSectionProps {
  onNavigateToNews?: () => void;
}

export function BlogSection({ onNavigateToNews }: BlogSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const blogPosts = [
    {
      id: 1,
      title: 'Healing, Hope & Smiles Everywhere',
      excerpt: 'Discover amazing testimonies of children who experienced God\'s healing power in their lives.',
      image: 'https://images.unsplash.com/photo-1628435509114-969a718d64e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkcmVuJTIwcGxheWluZ3xlbnwxfHx8fDE3NjI0MDcwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'November 2025',
      author: 'HTTN Team',
      category: 'Testimonies',
    },
    {
      id: 2,
      title: 'Fun Bible Games for Kids',
      excerpt: 'Learn while you play! Exciting games that teach important Bible lessons.',
      image: 'https://images.unsplash.com/photo-1689609523729-00a50c278c18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBsYXlncm91bmR8ZW58MXx8fHwxNzYyMzU1OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'November 2025',
      author: 'HTTN Team',
      category: 'Games',
    },
    {
      id: 3,
      title: 'Healthy Living Tips',
      excerpt: 'Stay strong and healthy with these amazing tips for kids!',
      image: 'https://images.unsplash.com/photo-1762350096516-cfe17afb8d29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY2VsZWJyYXRpbmclMjBvdXRkb29yc3xlbnwxfHx8fDE3NjI0NjcxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'November 2025',
      author: 'HTTN Team',
      category: 'Health',
    },
  ];

  return (
    <motion.section
      ref={ref}
      id="news"
      className="py-16 px-4 md:px-6 lg:px-8"
      style={{
        transform: isInView ? 'none' : 'rotateY(-15deg)',
        opacity: isInView ? 1 : 0.3,
        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] mb-4 text-[32px] font-semibold">
            Healing to the Nations News
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-[20px]">
            Read the latest stories, testimonies, and updates from our community!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-[#FF6B9D]/30"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-[#4ECDC4] to-[#48D1CC] text-white rounded-full text-xs shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-gray-800 group-hover:text-[#FF6B9D] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <button className="flex items-center gap-2 text-[#FF6B9D] hover:text-[#F472B6] transition-colors group/btn">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button 
            onClick={onNavigateToNews}
            className="px-8 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] hover:from-[#F472B6] hover:to-[#FF6B9D] text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            View All Stories
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
