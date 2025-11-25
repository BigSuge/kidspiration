import React from 'react';
import { Heart, Gift, BookOpen, Gamepad2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../utils/AuthContext';
import { toast } from 'sonner';

interface QuickActionCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
    gradient: string;
    onClick: () => void;
    buttonText: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
    title,
    description,
    icon: Icon,
    gradient,
    onClick,
    buttonText
}) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative h-full cursor-pointer"
            onClick={onClick}
        >
            {/* Main Card Container with Solid Gradient Fill */}
            <div className={`relative h-full bg-gradient-to-br ${gradient} rounded-2xl p-5 shadow-lg flex flex-col`}>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center mb-3 shadow-inner group-hover:bg-white/40 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {title}
                </h3>

                <p className="text-white/90 text-xs mb-4 flex-grow leading-relaxed font-medium">
                    {description}
                </p>

                {/* Button */}
                <div className="flex items-center text-xs font-bold text-white bg-white/30 self-start px-3 py-1.5 rounded-full group-hover:bg-white group-hover:text-purple-600 transition-all duration-300">
                    {buttonText}
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
            </div>
        </motion.div>
    );
};

interface HomeQuickActionsProps {
    onNavigate: (page: string) => void;
    onAuthClick: () => void;
}

export const HomeQuickActions: React.FC<HomeQuickActionsProps> = ({ onNavigate, onAuthClick }) => {
    const { isAuthenticated } = useAuth();

    const handleGamesClick = () => {
        if (isAuthenticated) {
            onNavigate('games');
        } else {
            toast.error('Please login to play games!', { duration: 3000 });
            onAuthClick();
        }
    };

    const actions = [
        {
            title: "Pray for Children",
            description: "Join us in prayer for children around the world on Kingschat.",
            icon: Heart,
            gradient: "from-[#3B82F6] to-[#1D4ED8]", // Blue gradient
            onClick: () => window.open('https://kingschat.online', '_blank'),
            buttonText: "Join Prayer"
        },
        {
            title: "Sponsor Initiatives",
            description: "Support our mission to reach every child with the Gospel.",
            icon: Gift,
            gradient: "from-[#EC4899] to-[#EF4444]", // Pink to Red gradient
            onClick: () => onNavigate('er100'),
            buttonText: "Sponsor Now"
        },
        {
            title: "HTTN Magazine",
            description: "Read the latest edition of Healing to the Nations for Kids.",
            icon: BookOpen,
            gradient: "from-teal-400 to-cyan-500", // Teal to Cyan - using standard classes for reliability
            onClick: () => window.open('https://httn.kidspiration.org', '_blank'),
            buttonText: "Read Magazine"
        },
        {
            title: "Play Games",
            description: "Fun and educational games designed just for you!",
            icon: Gamepad2,
            gradient: "from-[#EC4899] to-[#7C3AED]", // Purple
            onClick: handleGamesClick,
            buttonText: "Play Now"
        }
    ];

    return (
        <section className="py-6 sm:py-10 relative z-20 mt-6 sm:mt-10">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Scroll container - mobile shows 1 card + half of next */}
                <div
                    className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 gap-3 sm:gap-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
                    {actions.map((action, index) => (
                        <div key={index} className="snap-start w-[60vw] sm:w-auto flex-shrink-0">
                            <QuickActionCard {...action} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
