import React, { useState } from "react";
import { Button } from "./ui/Button";

export const PaymentCard: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    card: "",
    expiry: "",
    cvc: "",
    amount: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.card || !/^\d{16}$/.test(form.card)) errs.card = "Card number must be 16 digits";
    if (!form.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) errs.expiry = "Expiry must be MM/YY";
    if (!form.cvc || !/^\d{3,4}$/.test(form.cvc)) errs.cvc = "CVC must be 3 or 4 digits";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) errs.amount = "Enter a valid amount";
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setSuccess(null);
      return;
    }
    setLoading(true);
    setSuccess(null);
    setTimeout(() => {
      setLoading(false);
      setSuccess("Payment successful! 🎉");
      setForm({
        name: "",
        card: "",
        expiry: "",
        cvc: "",
        amount: "",
      });
    }, 1800);
  };

  return (
    <div className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 mb-8 max-w-xl mx-auto">
      <h2 className="text-xl font-extrabold text-[#2563eb] mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="7" width="20" height="10" rx="3" fill="#6366f1" stroke="#2563eb" strokeWidth="2"/>
          <rect x="4" y="10" width="4" height="2" rx="1" fill="#fff"/>
        </svg>
        Payment Interface
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Name on Card</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] text-base ${errors.name ? "border-red-400" : "border-gray-300"}`}
            placeholder="Full Name"
            autoComplete="cc-name"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Card Number</label>
          <input
            name="card"
            value={form.card}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] text-base ${errors.card ? "border-red-400" : "border-gray-300"}`}
            placeholder="1234 5678 9012 3456"
            maxLength={16}
            inputMode="numeric"
            autoComplete="cc-number"
          />
          {errors.card && <p className="text-xs text-red-500 mt-1">{errors.card}</p>}
        </div>
        <div className="flex space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Expiry</label>
            <input
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] text-base ${errors.expiry ? "border-red-400" : "border-gray-300"}`}
              placeholder="MM/YY"
              maxLength={5}
              autoComplete="cc-exp"
            />
            {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">CVC</label>
            <input
              name="cvc"
              value={form.cvc}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] text-base ${errors.cvc ? "border-red-400" : "border-gray-300"}`}
              placeholder="123"
              maxLength={4}
              inputMode="numeric"
              autoComplete="cc-csc"
            />
            {errors.cvc && <p className="text-xs text-red-500 mt-1">{errors.cvc}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Amount</label>
          <input
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] text-base ${errors.amount ? "border-red-400" : "border-gray-300"}`}
            placeholder="Amount"
            inputMode="decimal"
          />
          {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
        </div>
        <div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#2563eb] to-[#6366f1] text-white font-bold px-6 py-2 rounded-lg shadow-md hover:from-[#1d4ed8] hover:to-[#4f46e5] transition"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="spinner mr-2"></span> Processing...
              </span>
            ) : (
              "Pay Now"
            )}
          </Button>
          {success && <p className="text-green-600 text-center mt-2 font-semibold">{success}</p>}
        </div>
      </form>
    </div>
  );
};
