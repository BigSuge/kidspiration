import { useState } from "react";
import { motion } from "motion/react";
import {
  BookOpen,
  Heart,
  Users,
  PartyPopper,
  HandHeart,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Calendar,
  MapPin,
  Share2,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../utils/AuthContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SponsorshipModal } from "./SponsorshipModal";

interface ParentDashboardProps {
  onNavigate?: (page: string) => void;
}

export function ParentDashboard({ onNavigate }: ParentDashboardProps) {
  const { user } = useAuth();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { label: "Children Reached", value: "150,000+", icon: Users, color: "from-purple-500 to-pink-500" },
    { label: "HTTN Magazines Distributed", value: "500,000+", icon: BookOpen, color: "from-blue-500 to-cyan-500" },
    { label: "Events Organized", value: "1,250+", icon: Calendar, color: "from-pink-500 to-rose-500" },
  ];

  const quickActions = [
    {
      id: "request-httn",
      title: "Request HTTN Magazines",
      description: "Order free copies for your classroom, church, or outreach event",
      icon: BookOpen,
      color: "from-[#FF1F8E] to-[#FF6B9D]",
      borderColor: "border-[#FF1F8E]",
      emoji: "📚",
      action: () => window.open("https://kingschat.online/user/kidspiration", "_blank"),
    },
    {
      id: "sponsor",
      title: "Become a Sponsor",
      description: "Fund magazine printing and reach thousands of children",
      icon: Heart,
      color: "from-[#9B4DFF] to-[#C77DFF]",
      borderColor: "border-[#9B4DFF]",
      emoji: "💰",
      action: () => handleScrollToSection("sponsorship"),
    },
    {
      id: "prayer",
      title: "Register Kids for Prayer",
      description: "Sign up children for Pastor Chris's healing prayers",
      icon: Sparkles,
      color: "from-[#00D4FF] to-[#4ECDC4]",
      borderColor: "border-[#00D4FF]",
      emoji: "🙏",
      action: () => window.open("https://healingstreams.tv/kids/", "_blank"),
    },
    {
      id: "party",
      title: "Organize a Party",
      description: "Host a Kidspiration party or GlowFest event",
      icon: PartyPopper,
      color: "from-[#FFD41F] to-[#FFA500]",
      borderColor: "border-[#FFD41F]",
      emoji: "🎉",
      action: () => onNavigate?.("party-initiative"),
    },
    {
      id: "volunteer",
      title: "Volunteer",
      description: "Join our team of parents and teachers making a difference",
      icon: HandHeart,
      color: "from-[#00E5A0] to-[#4ECDC4]",
      borderColor: "border-[#00E5A0]",
      emoji: "🤝",
      action: () => console.log("Volunteer signup"),
    },
    {
      id: "training",
      title: "Access Training",
      description: "Learn how to effectively mentor young evangelists",
      icon: GraduationCap,
      color: "from-[#FF6B3D] to-[#FF8A5B]",
      borderColor: "border-[#FF6B3D]",
      emoji: "📖",
      action: () => handleScrollToSection("training"),
    },
  ];

  const sponsorshipTiers = [
    {
      id: "starter",
      name: "STARTER",
      emoji: "⭐",
      espees: "10 ESPEES",
      reach: "Reach 10 children",
      color: "bg-white",
      textColor: "text-[#9B4DFF]",
      highlighted: false,
    },
    {
      id: "house",
      name: "MEMBER OF HOUSE",
      emoji: "🏠",
      espees: "50 ESPEES",
      reach: "Reach 50 children",
      color: "bg-white",
      textColor: "text-[#9B4DFF]",
      highlighted: false,
    },
    {
      id: "prince",
      name: "PRINCE/PRINCESS",
      emoji: "👑",
      espees: "100 ESPEES",
      reach: "Reach 100 children",
      color: "bg-white",
      textColor: "text-[#9B4DFF]",
      highlighted: false,
    },
    {
      id: "duke",
      name: "DUKE/DUCHESS",
      emoji: "💎",
      espees: "200 ESPEES",
      reach: "Reach 200 children",
      color: "bg-gradient-to-br from-[#9B4DFF] to-[#C77DFF]",
      textColor: "text-white",
      highlighted: true,
    },
    {
      id: "governor",
      name: "GOVERNOR/GOVERNESS",
      emoji: "🌟",
      espees: "500 ESPEES",
      reach: "Reach 500 children",
      color: "bg-white",
      textColor: "text-[#9B4DFF]",
      highlighted: false,
    },
    {
      id: "king",
      name: "KING/QUEEN",
      emoji: "👑",
      espees: "1,000 ESPEES",
      reach: "Reach 1,000 children",
      color: "bg-white",
      textColor: "text-[#9B4DFF]",
      highlighted: false,
    },
    {
      id: "emperor",
      name: "EMPEROR/EMPRESS",
      emoji: "🌍",
      espees: "1,000+ ESPEES",
      reach: "Reach thousands!",
      color: "bg-gradient-to-br from-[#9B4DFF] to-[#C77DFF]",
      textColor: "text-white",
      highlighted: true,
    },
  ];

  const distributionChannels = [
    {
      id: "party",
      title: "Party Distributions",
      emoji: "🎈",
      description: "Organize Kidspiration parties where children receive HTTN magazines",
      image: "https://images.unsplash.com/photo-1760115090655-9ca46694d97a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBhcnR5JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzYyOTIwMjYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      buttonText: "Plan a Party",
      action: () => onNavigate?.("party-initiative"),
    },
    {
      id: "school",
      title: "School Outreach",
      emoji: "🏫",
      description: "Partner with schools to distribute HTTN magazines to students",
      image: "https://images.unsplash.com/photo-1573894999291-f440466112cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBjaGlsZHJlbiUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjI5MjAyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      buttonText: "Start a Program",
      action: () => console.log("Start school program"),
    },
    {
      id: "community",
      title: "Community Outreach",
      emoji: "🌆",
      description: "Take children on supervised outreaches to share the Gospel",
      image: "https://images.unsplash.com/photo-1673280401347-b26a0639b957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBvdXRyZWFjaCUyMGNoaWxkcmVufGVufDF8fHx8MTc2MjkyMDI2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      buttonText: "Organize an Outreach",
      action: () => console.log("Organize community outreach"),
    },
    {
      id: "strategic",
      title: "Strategic Distribution",
      emoji: "🎁",
      description: "Establish distribution centers at churches and community hubs",
      image: "https://images.unsplash.com/photo-1761959087653-228c64484f48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjb21tdW5pdHklMjBjZW50ZXJ8ZW58MXx8fHwxNzYyOTIwMjYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      buttonText: "Create Center",
      action: () => console.log("Create distribution center"),
    },
  ];

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSponsorClick = (tierId: string) => {
    setSelectedTier(tierId);
    setIsModalOpen(true);
  };

  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-white mb-4 drop-shadow-lg text-[40px] font-bold">
              EMPOWER THE NEXT GENERATION
            </h1>
            <p className="text-white/90 text-xl md:text-2xl not-italic max-w-2xl mx-auto text-[20px]">
              Guide Children to Share the Gospel Everywhere
            </p>
          </motion.div>

          {/* Stats Cards - Improved Design */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border-4 border-white shadow-2xl hover:scale-105 transition-all"
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} mb-4`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-5xl text-gray-900 mb-3 text-[48px]">
                    {stat.value}
                  </p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-gray-900 mb-4 text-[40px] font-bold">
              🎯 Quick Actions for Parents & Teachers
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto text-[20px]">
              Choose how you want to make an impact today!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={action.action}
                className={`bg-white rounded-3xl p-8 border-4 ${action.borderColor} shadow-lg hover:shadow-2xl transition-all hover:scale-105 text-left group`}
              >
                <div className="text-6xl mb-4">{action.emoji}</div>
                <h3 className="text-[#9B4DFF] text-xl mb-3 group-hover:text-[#FF1F8E] transition-colors font-bold">
                  {action.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {action.description}
                </p>
                <div className="flex items-center gap-2 text-[#9B4DFF] mt-4 group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section id="sponsorship" className="py-20 px-4 sm:px-6 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-white mb-4 drop-shadow-lg text-[40px] font-normal font-bold">
              💝 Sponsor Children's Evangelism
            </h2>
            <p className="text-white/90 text-xl max-w-3xl mx-auto text-[20px]">
              Every sponsorship reaches children with the Gospel through HTTN Magazine
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {sponsorshipTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${tier.color} rounded-3xl p-8 border-4 ${
                  tier.highlighted ? "border-white" : "border-white/50"
                } ${
                  tier.highlighted ? "shadow-2xl shadow-white/30 scale-105 ring-4 ring-white/50" : "shadow-lg"
                } transition-all hover:scale-105`}
              >
                <div className="text-center">
                  <div className="text-5xl mb-4">{tier.emoji}</div>
                  <p className={`mb-3 ${tier.highlighted ? "text-white" : "text-[#FF1F8E]"}`}>
                    {tier.name}
                  </p>
                  <p className={`text-4xl mb-3 ${tier.textColor}`}>
                    {tier.espees}
                  </p>
                  <p className={`mb-6 ${tier.highlighted ? "text-white/90" : "text-gray-600"}`}>
                    {tier.reach}
                  </p>
                  <button
                    onClick={() => handleSponsorClick(tier.id)}
                    className={`w-full py-3 px-6 rounded-full transition-all text-center ${
                      tier.highlighted
                        ? "bg-white text-[#9B4DFF] hover:bg-gray-100"
                        : "bg-gradient-to-r from-[#9B4DFF] to-[#FF1F8E] text-white hover:shadow-lg"
                    }`}
                  >
                    Sponsor Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/30"
          >
            <p className="text-xl mb-3">
              <span className="font-extrabold">Every Child must have the HTTN Magazine</span> - not only for engagement but as a reminder of their divine consciousness and the presence of God and angels with them.
            </p>
            <p className="italic text-lg text-white/90">
              "Their angels are always in the presence of my heavenly Father" - Matthew 18:10
            </p>
          </motion.div>
        </div>
      </section>

      {/* HTTN Distribution Section */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-gray-900 mb-4 text-[40px] font-bold">
              📖 HTTN Magazine Distribution
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto text-[20px]">
              Healing To The Nations - Reaching Children Everywhere
            </p>
          </motion.div>

          {/* The Power of HTTN */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-10 border-4 border-purple-200 shadow-xl">
              <h3 className="text-[rgb(147,31,255)] text-center mb-6 text-[40px] font-bold">The Power of HTTN</h3>
              <p className="text-gray-700 text-lg mb-8 text-center max-w-3xl mx-auto">
                HTTN (Healing To The Nations) is a specially designed children's magazine that presents the Gospel in an engaging, age-appropriate format. Each issue is filled with:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1 text-[24px] font-bold">Bible Stories & Teachings</h4>
                    <p className="text-gray-600">Age-appropriate lessons from God's Word</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1 text-[24px] font-bold">Activity Pages & Games</h4>
                    <p className="text-gray-600">Fun and engaging learning experiences</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1 text-[24px] font-bold">Global Testimonies</h4>
                    <p className="text-gray-600">Stories from children worldwide</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1 text-[24px] font-bold">Practical Faith Sharing</h4>
                    <p className="text-gray-600">Tools to spread the Gospel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Distribution Channels - With Images */}
          <div className="mb-16">
            <h3 className="text-gray-900 text-center mb-8 text-[40px] font-bold">Distribution Channels</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {distributionChannels.map((channel, index) => (
                <motion.div
                  key={channel.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border-4 border-purple-200 hover:border-[#9B4DFF]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={channel.image}
                      alt={channel.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="text-4xl mb-2">{channel.emoji}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-[#9B4DFF] text-lg mb-3 font-bold">{channel.title}</h4>
                    <p className="text-gray-600 mb-4">{channel.description}</p>
                    <button
                      onClick={channel.action}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-[#9B4DFF] to-[#FF1F8E] text-white rounded-full hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <span>{channel.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border-4 border-orange-300 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-[#FF6B3D] text-2xl mb-4 font-bold">
                Request HTTN Magazines
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                To request copies of the Kids Magazine, kindly contact @kidspiration on KingsChat or click the button below to be redirected to the official KingsChat handle.
              </p>
              <button
                onClick={() => window.open("https://kingsch.at/h/", "_blank")}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#FF6B3D] to-[#FF8A5B] text-white rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span className="font-bold">Request Magazines</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border-4 border-purple-300 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="text-5xl mb-4">💝</div>
              <h3 className="text-[#9B4DFF] text-2xl mb-4 font-bold">
                Become a Sponsor
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Fund magazine printing and distribution to reach more children with the life-changing Gospel message.
              </p>
              <button
                onClick={() => handleScrollToSection("sponsorship")}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#9B4DFF] to-[#FF1F8E] text-white rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span className="font-bold">Sponsor Now</span>
                <Heart className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Training & Resources Section */}
      <section id="training" className="py-20 px-4 sm:px-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-gray-900 mb-4 text-[40px] font-bold">
              📚 Training & Resources
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto text-[20px]">
              Equip yourself to mentor the next generation of evangelists
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-12 border-4 border-purple-300 shadow-2xl"
          >
            <div className="text-center mb-8">
              <div className="text-6xl mb-6">🎓</div>
              <h3 className="text-[#9B4DFF] mb-6">
                C.O.M.P.L.E.T.E Framework
              </h3>
            </div>
            <p className="text-gray-700 text-center text-lg mb-6 max-w-3xl mx-auto leading-relaxed">
              Learn the seven strategic pillars of Kidspiration:{" "}
              <span className="font-extrabold text-[#9B4DFF]">
                Crusades, Outreaches, Missions, Places, Languages, Every Demographic, Technology & Media
              </span>
              . Access comprehensive training materials to implement each strategy in your community.
            </p>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => console.log("Access training portal")}
                className="py-3 px-6 sm:py-4 sm:px-10 bg-gradient-to-r from-[#FF6B3D] to-[#FF8A5B] text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg w-full sm:w-auto"
              >
                <span className="font-bold text-center text-[16px]">Access Training Portal</span>
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sponsorship Modal */}
      <SponsorshipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTierId={selectedTier}
        onTierSelect={handleTierSelect}
      />
    </div>
  );
}
