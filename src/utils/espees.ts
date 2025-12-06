/// <reference types="vite/client" />
import { API_BASE_URL } from "../config/urls";

export interface InitiatePaymentParams {
    sku: string;
    amount: number;
    narration: string;
    userId: string;
    userType: string;
    successUrl?: string; // Optional override
    failUrl?: string;    // Optional override
    guestDetails?: {
        name: string;
        email: string;
        phone: string;
    };
}

export interface PaymentResponse {
    statusCode?: number;
    payment_ref?: string;
    message?: string;
    error?: string;
    isMock?: boolean;
}

export interface TransactionDetails {
    transaction_status: string;
    status_details: string;
    price: number;
    transaction_date: string;
    product_sku: string;
    customer_username?: string;
    narration?: string;
}

export class EspeesService {
    private static readonly ENDPOINT_INITIATE = `${API_BASE_URL}/payment/initiate`;
    private static readonly ENDPOINT_CONFIRM = `${API_BASE_URL}/payment/confirm`;

    /**
     * Initiates a payment process
     */
    static async initiatePayment(params: InitiatePaymentParams): Promise<PaymentResponse> {
        try {
            const response = await fetch(this.ENDPOINT_INITIATE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...params,
                    // Build absolute URLs for success/failure redirection
                    successUrl: params.successUrl || `${window.location.origin}/payment/success`,
                    failUrl: params.failUrl || `${window.location.origin}/payment/failure`,
                }),
            });

            if (!response.ok) {
                let errorMessage = response.statusText;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorData.message || JSON.stringify(errorData);
                } catch (e) {
                    // Ignore json parse error
                }
                throw new Error(`Payment initiation failed: ${response.status} ${errorMessage}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Espees init error:", error);
            // CLIENT-SIDE FALLBACK MOCK for development when backend is offline
            if (import.meta.env.DEV) {
                console.warn("Backend unreachable. Falling back to CLIENT-SIDE MOCK.");
                return {
                    statusCode: 200,
                    payment_ref: `CLIENT-MOCK-${Math.random().toString(36).substring(7)}`,
                    message: "Successfully Done (CLIENT-SIDE MOCK)",
                    isMock: true
                };
            }
            throw error;
        }
    }

    /**
     * Confirms a payment transaction using the reference
     */
    static async confirmPayment(paymentRef: string): Promise<TransactionDetails> {
        try {
            const response = await fetch(this.ENDPOINT_CONFIRM, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ paymentRef }),
            });

            if (!response.ok) {
                throw new Error(`Payment confirmation failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Espees confirm error:", error);
            throw error;
        }
    }
}
