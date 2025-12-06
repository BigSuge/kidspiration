import { motion } from "motion/react";
import { XCircle, RefreshCw, Home } from "lucide-react";

interface PaymentFailurePageProps {
    onNavigate: (page: string) => void;
}

export function PaymentFailurePage({ onNavigate }: PaymentFailurePageProps) {

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 pt-32 pb-20 px-4">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center border-4 border-red-100"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <XCircle className="w-12 h-12 text-red-600" />
                    </motion.div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Payment Failed
                    </h1>

                    <p className="text-xl text-gray-600 mb-8">
                        We couldn't complete your transaction. Please try again or contact support if the problem persists.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => onNavigate("dashboard")}
                            className="py-3 px-8 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all font-semibold flex items-center justify-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            <span>Dashboard</span>
                        </button>
                        <button
                            onClick={() => onNavigate("give")} // Navigate back to where they can try again
                            className="py-3 px-8 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            <span>Try Again</span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

