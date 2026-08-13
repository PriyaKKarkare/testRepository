import React, { useState } from "react";
import { Mail, KeyRound, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to send reset link.");
			}

			setIsSubmitted(true);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
			<div className="w-full max-w-md bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
				<div className="text-center space-y-1.5">
					<div className="inline-flex items-center justify-center p-2.5 bg-indigo-50 text-indigo-600 rounded-xl mb-2">
						<KeyRound className="w-6 h-6" />
					</div>
					<h1 className="text-xl font-bold text-gray-900 tracking-tight">
						Reset Password
					</h1>
					<p className="text-xs text-gray-500">
						Enter your account email to receive a login verification link.
					</p>
				</div>

				{error && (
					<div className="p-2.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg">
						{error}
					</div>
				)}

				{!isSubmitted ? (
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-1">
							<label className="text-xs font-semibold text-gray-700">
								Email Address
							</label>
							<div className="relative">
								<Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
								<input
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="name@company.com"
									className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
						>
							{loading ? "Sending link..." : "Send Verification Email"}{" "}
							<ArrowRight className="w-3.5 h-3.5" />
						</button>
					</form>
				) : (
					<div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-lg text-center space-y-2">
						<p className="text-xs text-gray-700">
							We sent a verification link to <strong className="text-gray-900">{email}</strong>.
						</p>
						<p className="text-xs text-gray-500">
							Please check your inbox and click the verification button inside to log in.
						</p>
					</div>
				)}

				<div className="text-center pt-2">
					<Link
						to="/"
						className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
					>
						<ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
					</Link>
				</div>
			</div>
		</div>
	);
}