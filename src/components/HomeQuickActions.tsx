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
            <div className={`relative h-full bg-gradient-to-br ${gradient} rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col`}>

                {/* Icon */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/30 flex items-center justify-center mb-3 shadow-inner group-hover:bg-white/40 transition-colors duration-300">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight">
                    {title}
                </h3>

                <p className="text-white/90 text-[12px] sm:text-xs mb-4 flex-grow leading-relaxed font-medium">
                    {description}
                </p>

                {/* Button */}
                <div className="flex items-center text-xs font-bold text-white bg-white/20 backdrop-blur-md self-start px-4 py-2 rounded-full group-hover:bg-white group-hover:text-purple-600 transition-all duration-300 border border-white/10">
                    {buttonText}
                    <ArrowRight className="w-3.5 h-3.5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
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
            title: "Sponsor Initiatives",
            description: "Support our mission to reach every child with the Gospel.",
            icon: Gift,
            gradient: "from-[#EC4899] to-[#EF4444]", // Pink to Red gradient
            onClick: () => onNavigate('give'),
            buttonText: "Sponsor Now"
        },
        {
            title: "HTTN Magazine",
            description: "Enjoy the Healing to the Nations for Kids Magazine- ANIMATED",
            icon: BookOpen,
            gradient: "from-teal-400 to-cyan-500", // Teal to Cyan - using standard classes for reliability
            onClick: () => window.open('https://httn.kidspiration.org', '_blank'),
            buttonText: "Read Magazine"
        },
        {
            title: "Play Games",
            description: "Fun and educational games designed just for you!",
            icon: Gamepad2,
            gradient: "from-[#A855F7] to-[#7C3AED]", // Purple
            onClick: handleGamesClick,
            buttonText: "Play Now"
        }
    ];

    return (
        <section className="py-6 sm:py-10 relative z-20 mt-6 sm:mt-10">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Section Heading */}
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] text-4xl sm:text-5xl font-extrabold">
                        Quick Actions
                    </h2>
                </div>

                {/* Scroll container - mobile shows 1 card + half of next */}
                <div
                    className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 gap-3 sm:gap-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 scrollbar-hide"
                >
                    {actions.map((action, index) => (
                        <div key={index} className="snap-start w-[48vw] sm:w-auto flex-shrink-0">
                            <QuickActionCard {...action} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
