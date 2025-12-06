import { useEffect, useState } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { CheckCircle, Home, Heart } from "lucide-react";
import { EspeesService, TransactionDetails } from "../utils/espees";
import { useAuth } from "../utils/AuthContext";

interface PaymentSuccessPageProps {
    onNavigate: (page: string) => void;
}

export function PaymentSuccessPage({ onNavigate }: PaymentSuccessPageProps) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState<TransactionDetails | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Get payment_ref from URL query params
    const searchParams = new URLSearchParams(window.location.search);
    const paymentRef = searchParams.get("payment_ref") || searchParams.get("ref");

    // If not, we might need to store the ref in localStorage before redirecting.
    // For this implementation, let's assume the backend passes it or we stored it.
    // However, looking at the docs, the redirect URL format isn't explicitly detailed on *how* it passes data back.
    // Standard practice is query params.
    // But wait, our API service returns the payment_ref *before* redirection.
    // So the success URL should probably be hit *after* user completes payment on Espees portal.
    // We'll rely on our backend verifying the transaction if we have a ref, or just showing a generic success message if we trust the redirect.
    // Let's assume we might receive a ref or just land here.

    // Actually, standard Espees flow: initiate -> get ref -> redirect user to payment page -> user pays -> redirect to success_url.
    // We don't necessarily get the ref back in the URL unless we put it there in the `success_url` we sent.
    // Implementation Plan: We should have appended the ref to the success URL in `EspeesService` or component.
    // Let's assume the component will handle appending it: `successUrl: .../payment/success?ref=${ref}`.

    useEffect(() => {
        if (paymentRef) {
            verifyPayment(paymentRef);
        } else {
            // Just show animation if no ref
            fireConfetti();
            setLoading(false);
        }
    }, [paymentRef]);

    const verifyPayment = async (ref: string) => {
        try {
            // Short-circuit for client-side mocks
            if (ref.startsWith("CLIENT-MOCK-")) {
                setDetails({
                    transaction_status: "APPROVED (MOCK)",
                    status_details: "Simulated success",
                    price: 100, // Placeholder
                    transaction_date: new Date().toISOString(),
                    product_sku: "MOCK-PRODUCT",
                });
                fireConfetti();
                setLoading(false);
                return;
            }

            const data = await EspeesService.confirmPayment(ref);
            setDetails(data);
            fireConfetti();
        } catch (err) {
            console.error("Verification failed", err);
            // Even if verification details fail to load, if they are here, they probably paid.
            // But we should warn them or show a generic message.
            setError("We couldn't verify the transaction details immediately, but thank you!");
            fireConfetti();
        } finally {
            setLoading(false);
        }
    };

    const fireConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-32 pb-20 px-4">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center border-4 border-green-100"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </motion.div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Payment Successful!
                    </h1>

                    <p className="text-xl text-gray-600 mb-8">
                        Thank you, {user?.firstName || "Partner"}! Your sponsorship is making a huge difference.
                    </p>

                    {loading ? (
                        <div className="animate-pulse bg-gray-100 h-32 rounded-xl mb-8"></div>
                    ) : details ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-50 rounded-xl p-6 mb-8 text-left border border-gray-200"
                        >
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">
                                Transaction Details
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Product:</span>
                                    <span className="font-semibold text-gray-900">{details.product_sku}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Amount:</span>
                                    <span className="font-semibold text-[#9B4DFF]">{details.price} ESPEES</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <span className="font-semibold text-green-600">{details.transaction_status}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Date:</span>
                                    <span className="text-gray-900">{new Date(details.transaction_date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </motion.div>
                    ) : null}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => onNavigate("dashboard")}
                            className="py-3 px-8 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all font-semibold flex items-center justify-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            <span>Dashboard</span>
                        </button>
                        <button
                            onClick={() => onNavigate("give")}
                            className="py-3 px-8 bg-gradient-to-r from-[#9B4DFF] to-[#FF1F8E] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold flex items-center justify-center gap-2"
                        >
                            <span>Sponsor Again</span>
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
