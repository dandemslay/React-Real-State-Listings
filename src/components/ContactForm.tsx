import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ContactFormProps {
  listingId: number;
  listingTitle: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  comments: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  comments?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ listingId, listingTitle }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    comments: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must contain only numbers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would send this data to your backend
      console.log('Form submitted:', { listingId, ...formData });
      setSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 p-6 rounded-lg text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
          <Send className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-lg font-semibold text-emerald-900 mb-2">
          Thank you for your interest!
        </h3>
        <p className="text-emerald-700">
          We've received your inquiry about {listingTitle} and will contact you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Interested in this property?
      </h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full rounded-lg border ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            } shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50`}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full rounded-lg border ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            } shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            rows={4}
            value={formData.comments}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
        >
          Contact Now
        </button>
      </div>
    </form>
  );
};