import image_0b273eb951cf239cbcc6224f74a150ac5e95b384 from "figma:asset/0b273eb951cf239cbcc6224f74a150ac5e95b384.png";
import image_a2403b8eef88286cde45eb5ea3add1bd09fb916d from "figma:asset/a2403b8eef88286cde45eb5ea3add1bd09fb916d.png";
import image_aedc241f8e878317fb16a5fc633a5d461c6a160d from "figma:asset/aedc241f8e878317fb16a5fc633a5d461c6a160d.png";
import image_58a2d7670b02c391a867c83f69e6c0dbeab5c5ae from "figma:asset/58a2d7670b02c391a867c83f69e6c0dbeab5c5ae.png";
const image_red_shirt = "/red_shirt_I_A_G.png";
const image_yellow_shirt_b = "/yellow_shirt_I_A_B.png";
const image_yellow_shirt_g = "/yellow_shirt_I_A_G.png";
const image_glowfest_logo = "/glowfest_logo_solo.png";
import { motion } from "motion/react";
import {
  ShoppingBag,
  Shirt,
  Star,
  Truck,
  Shield,
  Heart,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "../utils/AuthContext";

interface MarketplacePageProps {
  onAuthClick?: () => void;
  onBack?: () => void;
}

export function MarketplacePage({
  onAuthClick,
  onBack,
}: MarketplacePageProps) {
  const { user } = useAuth();

  const handleOrderClick = (productName: string) => {
    // Open KingsChat for all users
    window.open("https://kingsch.at/h/", "_blank");
  };

  const products = [
    {
      id: 1,
      name: "I am Divine T-shirt",
      category: "T-Shirts",
      price: "$15",
      image: image_58a2d7670b02c391a867c83f69e6c0dbeab5c5ae,
      badge: "+Cap",
      badgeColor: "from-[#FF6B9D] to-[#F472B6]",
      sizes: ["XS", "S", "M", "L", "XL"],
      description:
        "Show your Kidspiration spirit with bold declarations!",
      gradient: "from-[#4ECDC4] to-[#00D4FF]",
    },
    {
      id: 2,
      name: "I am Strong T-shirt",
      category: "T-Shirts",
      price: "$12",
      image: image_aedc241f8e878317fb16a5fc633a5d461c6a160d,
      badge: "+Cap",
      badgeColor: "from-[#9B4DFF] to-[#C77DFF]",
      sizes: ["One Size"],
      description:
        "Show your Kidspiration spirit with bold declarations!",
      gradient: "from-[#FF6B9D] to-[#F472B6]",
    },
    {
      id: 3,
      name: "I am Light T-shirt",
      category: "T-Shirts",
      price: "$45",
      image: image_a2403b8eef88286cde45eb5ea3add1bd09fb916d,
      badge: "+Cap",
      badgeColor: "from-[#4ECDC4] to-[#00D4FF]",
      sizes: ["XS", "S", "M", "L", "XL"],
      description:
        "Show your Kidspiration spirit with bold declarations!",
      gradient: "from-[#9B4DFF] to-[#C77DFF]",
    },
    {
      id: 4,
      name: "I am Great T-shirt",
      category: "T-Shirts",
      price: "$5",
      image: image_0b273eb951cf239cbcc6224f74a150ac5e95b384,
      badge: "+Cap",
      badgeColor: "from-[#FFA500] to-[#FFD41F]",
      sizes: ["50+ Stickers"],
      description:
        "Show your Kidspiration spirit with bold declarations!",
      gradient: "from-[#FFE66D] to-[#FFC93C]",
    },
    {
      id: 5,
      name: "I am Graced T-shirt",
      category: "T-Shirts",
      price: "$18",
      image: image_red_shirt,
      badge: "+Cap",
      badgeColor: "from-[#FF6B9D] to-[#F472B6]",
      sizes: ["XS", "S", "M", "L", "XL"],
      description:
        "Show your Kidspiration spirit with bold declarations!",
      gradient: "from-[#4ECDC4] to-[#00D4FF]",
    },
    {
      id: 6,
      name: "I am Bold T-shirt",
      category: "T-Shirts",
      price: "$12",
      image: image_yellow_shirt_b,
      badge: "+Cap",
      badgeColor: "from-[#10B981] to-[#34D399]",
      sizes: ["One Size"],
      description:
        "Show your Kidspiration spirit with bold declarations!",
      gradient: "from-[#10B981] to-[#34D399]",
    },
    {
      id: 7,
      name: "I am Glowing T-shirt",
      category: "T-Shirts",
      price: "$55",
      image: image_yellow_shirt_g,
      badge: "+Cap",
      badgeColor: "from-[#9B4DFF] to-[#C77DFF]",
      sizes: ["XS", "S", "M", "L", "XL"],
      description:
        "Show your Kidspiration spirit with bold declarations!",
      gradient: "from-[#9B4DFF] to-[#C77DFF]",
    },
    {
      id: 8,
      name: "Glowfest Sticker Collection",
      category: "Stickers",
      price: "$8",
      image: image_glowfest_logo,
      badge: "New",
      badgeColor: "from-[#FFA500] to-[#FFD41F]",
      sizes: ["100+ Stickers"],
      description: "Mega pack with Glowfest Taglines",
      gradient: "from-[#FFE66D] to-[#FFC93C]",
    },
  ];

  const categories = [
    {
      name: "T-Shirts",
      icon: "👕",
      count: products.filter((p) => p.category === "Shirts")
        .length,
      gradient: "from-[#4ECDC4] to-[#00D4FF]",
    },
    {
      name: "Caps & Hats",
      icon: "🧢",
      count: products.filter((p) => p.category === "Caps")
        .length,
      gradient: "from-[#FF6B9D] to-[#F472B6]",
    },
    {
      name: "Tracksuits",
      icon: "🏃",
      count: products.filter((p) => p.category === "Tracksuits")
        .length,
      gradient: "from-[#9B4DFF] to-[#C77DFF]",
    },
    {
      name: "Stickers",
      icon: "✨",
      count: products.filter((p) => p.category === "Stickers")
        .length,
      gradient: "from-[#FFE66D] to-[#FFC93C]",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden pt-32 pb-20">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#4ECDC4]/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF6B9D]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#A78BFA]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Back Button */}
        {onBack && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Explore</span>
          </motion.button>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <ShoppingBag className="w-12 h-12 text-blue-500" />
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-6xl font-extrabold text-[40px]">
              Kidspiration Shop
            </h1>
            <Sparkles className="w-12 h-12 text-pink-500" />
          </div>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-2xl mb-4 text-[20px]">
            🛍️ Wear Your Inspiration! Get official Kidspiration
            merchandise and show the world you're part of the
            movement! 🌟
          </p>
          <div className="flex items-center justify-center gap-3 bg-blue-100 border-2 border-blue-300 rounded-full px-6 py-3 max-w-fit mx-auto">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <p className="text-blue-800 font-bold">
              All orders via @kidspiration on KingsChat! 📱
            </p>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto"
        >
          {[
            {
              icon: Shield,
              title: "Premium Quality",
              desc: "High-quality materials",
              color: "from-[#4ECDC4] to-[#00D4FF]",
            },
            {
              icon: Truck,
              title: "Worldwide Delivery",
              desc: "Ships to your doorstep",
              color: "from-[#9B4DFF] to-[#C77DFF]",
            },
            {
              icon: Heart,
              title: "Supports Ministry",
              desc: "Funds Kidspiration programs",
              color: "from-[#FF6B9D] to-[#F472B6]",
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md`}
              >
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-900 mb-2 text-lg font-bold">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {categories.map((cat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all cursor-pointer hover:scale-105"
              >
                <div className="text-5xl mb-3">{cat.icon}</div>
                <h3
                  className={`text-lg font-bold bg-gradient-to-r ${cat.gradient} text-transparent bg-clip-text`}
                >
                  {cat.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-8">
            ✨ Featured Products
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute top-3 right-3 px-3 py-1 bg-gradient-to-r ${product.badgeColor} text-white rounded-full text-xs font-bold shadow-lg`}
                  >
                    {product.badge}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-gray-900 mb-2 font-bold text-lg">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Sizes: {product.sizes.join(", ")}
                  </p>
                  <button
                    onClick={() =>
                      handleOrderClick(product.name)
                    }
                    className={`w-full px-4 py-3 bg-gradient-to-r ${product.gradient} text-white rounded-full hover:shadow-xl transition-all font-bold inline-flex items-center justify-center gap-2 hover:scale-105`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order on KC</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl p-12 text-center text-white shadow-2xl mb-16"
        >
          <Heart className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-5xl mb-6 font-bold text-[40px]">
            Your Purchase Makes a Difference! 💝
          </h2>
          <p className="mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed text-[20px]">
            Every item you buy supports Kidspiration programs
            worldwide - ER100, Glowfest, HTTN distribution, and
            initiatives that inspire children globally! 🌍✨
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl border-2 border-blue-200"
        >
          <ShoppingBag className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-5xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 text-[40px]">
            Ready to Shop?
          </h2>
          <p className="text-gray-700 text-2xl mb-8 max-w-3xl mx-auto text-[20px]">
            Visit @kidspiration on KingsChat to browse our full
            collection and place your order! 📱
          </p>
          <button
            onClick={() =>
              window.open("https://kingsch.at/h/", "_blank")
            }
            className="px-6 py-3 sm:px-10 sm:py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:shadow-2xl transform hover:scale-105 transition-all font-bold inline-flex items-center gap-2 sm:gap-3"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-base sm:text-xl md:text-[24px] text-[16px] font-normal font-bold">Order on KingsChat</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}