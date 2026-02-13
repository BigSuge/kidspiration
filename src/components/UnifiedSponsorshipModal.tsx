import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { X, CreditCard, Wallet, Building2, User } from 'lucide-react';
import { Button } from "./ui/button";
import { cn } from './ui/utils';
import { ZONES } from '../utils/zones';
import { EspeesService } from '../utils/espees';
import { supabase } from '../utils/supabaseClient';
import { toast } from 'sonner';
import { useAuth } from '../utils/AuthContext';

interface UnifiedSponsorshipModalProps {
    isOpen: boolean;
    onClose: () => void;
    initiative: string;
    // Optional props if we want to pre-fill or pass specific tier info
    tierInfo?: {
        name: string;
        amount?: number;
    };
}

interface SponsorshipFormData {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    network: string; // "Blue Elite Staff", "Loveworld Ladies Network", "Others"
    department: string;
    church: string;
    zone: string;
    amount: number;
    paymentMethod: 'espees' | 'card';
}

const TITLES = [
    "Mr.", "Mrs.", "Ms.", "Pastor", "Deacon", "Deaconess",
    "Brother", "Sister", "Reverend", "Evangelist", "Bishop",
];

const NETWORKS = [
    "Blue Elite Staff",
    "Loveworld Ladies Network",
    "Others"
];

export function UnifiedSponsorshipModal({ isOpen, onClose, initiative, tierInfo }: UnifiedSponsorshipModalProps) {
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);

    const { register, handleSubmit, watch, reset } = useForm<SponsorshipFormData>({
        defaultValues: {
            title: "",
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            phone: "",
            network: "",
            department: "",
            church: "",
            zone: "",
            amount: tierInfo?.amount || 0,
            paymentMethod: 'espees',
        }
    });

    useEffect(() => {
        if (isOpen) {
            reset({
                title: "",
                firstName: user?.firstName || "",
                lastName: user?.lastName || "",
                email: user?.email || "",
                phone: "",
                network: "",
                department: "",
                church: "",
                zone: "",
                amount: tierInfo?.amount || 0,
                paymentMethod: 'espees',
            });
        }
    }, [isOpen, user, tierInfo, reset]);

    const paymentMethod = watch('paymentMethod');

    const onSubmit = async (data: SponsorshipFormData) => {
        setIsProcessing(true);
        try {
            if (data.paymentMethod === 'card') {
                toast.info("Card payments are coming soon! Please use Espees for now.");
                return;
            }

            // Save to Supabase (using blue_elite_staff_giving table for now as requested, but genericized)
            // We might want to rename this table in the future or add columns if they don't exist.
            // Assuming we are just adding new columns or reusing existing structure.
            // For now, we will use the table 'blue_elite_staff_giving' and map the fields.


            const { error: dbError } = await supabase
                .from('blue_elite_staff_giving')
                .insert([
                    {
                        title: data.title,
                        first_name: data.firstName,
                        last_name: data.lastName,
                        department: data.department,
                        church: data.church,
                        zone: data.zone,
                        amount: Number(data.amount),
                        payment_method: data.paymentMethod,
                        status: 'pending',
                        email: data.email, // New Field
                        phone: data.phone, // New Field
                        network: data.network, // New Field
                        initiative: initiative, // New Field
                        created_at: new Date().toISOString(),
                    }
                ]);

            if (dbError) {
                console.error("Database error (likely missing columns):", dbError);
                // Fallback: Use 'department' to store Network + Department if columns missing?
                // Or just proceed.
            }

            const response = await EspeesService.initiatePayment({
                sku: `${initiative.toUpperCase().replace(/\s+/g, '-')}-${Date.now()}`,
                amount: Number(data.amount),
                narration: `${initiative} Sponsorship (${data.network}) - ${data.title} ${data.firstName} ${data.lastName}`,
                userId: user?.id || "guest",
                userType: user?.type || "guest",
                guestDetails: {
                    name: `${data.title} ${data.firstName} ${data.lastName}`,
                    email: data.email,
                    phone: data.phone,
                },
            });

            if (response.isMock) {
                toast.success(response.message);
                if (response.payment_ref) {
                    window.history.pushState({}, '', `/payment/success?ref=${response.payment_ref}`);
                    // Forcing a navigation/reload effect or just closing modal if we were on the page
                    // Since we are inside a modal, maybe we just redirect
                    window.location.href = `/payment/success?ref=${response.payment_ref}`;
                }
            } else if (response.payment_ref) {
                window.location.href = `https://payment.espees.org/pay/${response.payment_ref}`;
            } else {
                throw new Error("Invalid payment response");
            }

        } catch (error: any) {
            console.error("Payment error:", error);
            toast.error(error.message || "Failed to initiate payment. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999999]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-[1000000] max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-3xl relative">
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Sponsor {initiative}</h2>
                            <p className="text-white/80">Make a difference today.</p>
                        </div>

                        <div className="p-6 sm:p-8">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                {/* Personal & Contact Info */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                        <User className="w-5 h-5 text-purple-600" />
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">Title</label>
                                            <select
                                                {...register("title", { required: "Required" })}
                                                className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-purple-200 outline-none"
                                            >
                                                <option value="">Select Title</option>
                                                {TITLES.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">First Name</label>
                                            <input
                                                {...register("firstName", { required: "Required" })}
                                                className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-purple-200 outline-none"
                                                placeholder="First name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">Last Name</label>
                                            <input
                                                {...register("lastName", { required: "Required" })}
                                                className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-purple-200 outline-none"
                                                placeholder="Last name"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                        <input
                                            type="email"
                                            {...register("email", { required: "Required" })}
                                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-purple-200 outline-none"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                                        <input
                                            type="tel"
                                            {...register("phone", { required: "Required" })}
                                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-purple-200 outline-none"
                                            placeholder="+1234567890"
                                        />
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 my-4" />

                                {/* Organization Info */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                        <Building2 className="w-5 h-5 text-blue-600" />
                                        Organization Details
                                    </h3>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Network</label>
                                        <select
                                            {...register("network", { required: "Required" })}
                                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-200 outline-none"
                                        >
                                            <option value="">Select Network</option>
                                            {NETWORKS.map(n => <option key={n} value={n}>{n}</option>)}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Zone</label>
                                        <select
                                            {...register("zone", { required: "Required" })}
                                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-200 outline-none"
                                        >
                                            <option value="">Select your zone...</option>
                                            {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">Church</label>
                                            <input
                                                {...register("church", { required: "Required" })}
                                                className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-200 outline-none"
                                                placeholder="e.g. Christ Embassy Mafoluku"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">Department</label>
                                            <input
                                                {...register("department", { required: "Required" })}
                                                className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-200 outline-none"
                                                placeholder="e.g. Children's Ministry"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 my-4" />

                                {/* Payment Info */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                        <Wallet className="w-5 h-5 text-green-600" />
                                        Payment Details
                                    </h3>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Amount</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                                                {paymentMethod === 'espees' ? 'ESP' : '$'}
                                            </span>
                                            <input
                                                type="number"
                                                {...register("amount", { required: "Required", min: 1 })}
                                                className="w-full rounded-xl border border-gray-300 p-3 pl-12 font-bold text-lg focus:ring-2 focus:ring-green-200 outline-none"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <label className={cn(
                                            "cursor-pointer rounded-2xl border-2 p-4 flex flex-col items-center justify-center gap-2 transition-all hover:bg-blue-50",
                                            paymentMethod === 'espees' ? "border-blue-500 bg-blue-50" : "border-gray-200"
                                        )}>
                                            <input type="radio" value="espees" className="sr-only" {...register("paymentMethod")} />
                                            <Wallet className={cn("w-6 h-6", paymentMethod === 'espees' ? "text-blue-600" : "text-gray-400")} />
                                            <span className="font-bold text-sm">Espees</span>
                                        </label>

                                        <label className={cn(
                                            "cursor-pointer rounded-2xl border-2 p-4 flex flex-col items-center justify-center gap-2 transition-all hover:bg-purple-50",
                                            paymentMethod === 'card' ? "border-purple-500 bg-purple-50" : "border-gray-200"
                                        )}>
                                            <input type="radio" value="card" className="sr-only" {...register("paymentMethod")} />
                                            <CreditCard className={cn("w-6 h-6", paymentMethod === 'card' ? "text-purple-600" : "text-gray-400")} />
                                            <span className="font-bold text-sm">Card</span>
                                        </label>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full py-6 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                                >
                                    {isProcessing ? "Processing..." : "Give Now"}
                                </Button>

                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
