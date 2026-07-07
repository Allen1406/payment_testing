'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useApp } from '@/context/AppContext';
import { OrderSummary } from '@/components/OrderSummary';
import { motion } from 'framer-motion';
import { UserCheck, ArrowLeft, ArrowRight } from 'lucide-react';

interface RegistrationFormInputs {
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
}

export const DetailsView: React.FC = () => {
  const { details, updateDetails, setStep } = useApp();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegistrationFormInputs>({
    defaultValues: {
      name: details.name,
      email: details.email,
      phone: details.phone,
      college: details.college,
      department: details.department,
      year: details.year
    }
  });

  const onSubmit = (data: RegistrationFormInputs) => {
    updateDetails(data);
    setStep('payment');
  };

  return (
    <div className="select-none py-4">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold font-orbitron tracking-wider text-white uppercase flex items-center justify-center gap-2">
          <UserCheck className="w-7 h-7 text-cyber-cyan" />
          Lorem Ipsum
        </h2>
        <p className="text-xs text-gray-400 font-sans mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 space-y-4">
          <motion.form
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="glass-panel border-cyber-purple/15 rounded-2xl p-6 shadow-xl space-y-4 text-left"
            noValidate
          >
            <h3 className="text-base font-bold font-orbitron text-white tracking-widest uppercase border-b border-white/5 pb-3">
              Lorem Ipsum
            </h3>

            {/* Row 1: Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold font-orbitron uppercase tracking-wider text-gray-400">
                  Lorem ipsum
                </label>
                <input
                  type="text"
                  placeholder="Lorem ipsum"
                  className={`w-full px-4 py-2.5 rounded-xl bg-black/45 border font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(6,182,212,0.15)] transition-all duration-200 ${
                    errors.name ? 'border-rose-500/50' : 'border-cyber-purple/15'
                  }`}
                  {...register('name', { required: 'Lorem ipsum dolor sit amet' })}
                />
                {errors.name && (
                  <p className="text-[10px] text-rose-400 font-medium pl-1">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold font-orbitron uppercase tracking-wider text-gray-400">
                  Lorem ipsum
                </label>
                <input
                  type="email"
                  placeholder="lorem@ipsum.com"
                  className={`w-full px-4 py-2.5 rounded-xl bg-black/45 border font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(6,182,212,0.15)] transition-all duration-200 ${
                    errors.email ? 'border-rose-500/50' : 'border-cyber-purple/15'
                  }`}
                  {...register('email', {
                    required: 'Lorem ipsum dolor sit amet',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Lorem ipsum'
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-[10px] text-rose-400 font-medium pl-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Row 2: Phone Number & College Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold font-orbitron uppercase tracking-wider text-gray-400">
                  Lorem ipsum
                </label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  maxLength={10}
                  className={`w-full px-4 py-2.5 rounded-xl bg-black/45 border font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(6,182,212,0.15)] transition-all duration-200 ${
                    errors.phone ? 'border-rose-500/50' : 'border-cyber-purple/15'
                  }`}
                  {...register('phone', {
                    required: 'Lorem ipsum dolor sit amet',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Lorem ipsum'
                    }
                  })}
                />
                {errors.phone && (
                  <p className="text-[10px] text-rose-400 font-medium pl-1">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold font-orbitron uppercase tracking-wider text-gray-400">
                  Lorem ipsum
                </label>
                <input
                  type="text"
                  placeholder="Lorem ipsum"
                  className={`w-full px-4 py-2.5 rounded-xl bg-black/45 border font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(6,182,212,0.15)] transition-all duration-200 ${
                    errors.college ? 'border-rose-500/50' : 'border-cyber-purple/15'
                  }`}
                  {...register('college', { required: 'Lorem ipsum dolor sit amet' })}
                />
                {errors.college && (
                  <p className="text-[10px] text-rose-400 font-medium pl-1">{errors.college.message}</p>
                )}
              </div>
            </div>

            {/* Row 3: Department & Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold font-orbitron uppercase tracking-wider text-gray-400">
                  Lorem ipsum
                </label>
                <input
                  type="text"
                  placeholder="Lorem ipsum"
                  className={`w-full px-4 py-2.5 rounded-xl bg-black/45 border font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(6,182,212,0.15)] transition-all duration-200 ${
                    errors.department ? 'border-rose-500/50' : 'border-cyber-purple/15'
                  }`}
                  {...register('department', { required: 'Lorem ipsum dolor sit amet' })}
                />
                {errors.department && (
                  <p className="text-[10px] text-rose-400 font-medium pl-1">{errors.department.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold font-orbitron uppercase tracking-wider text-gray-400">
                  Lorem ipsum
                </label>
                <select
                  className={`w-full px-4 py-2.5 rounded-xl bg-black/45 border font-sans text-sm text-gray-300 focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(6,182,212,0.15)] transition-all duration-200 cursor-pointer ${
                    errors.year ? 'border-rose-500/50' : 'border-cyber-purple/15'
                  }`}
                  {...register('year', { required: 'Academic year is required' })}
                >
                  <option value="" disabled className="bg-cyber-bg text-gray-600">Lorem ipsum</option>
                  <option value="1st Year" className="bg-cyber-bg text-gray-200">Lorem ipsum</option>
                  <option value="2nd Year" className="bg-cyber-bg text-gray-200">Lorem ipsum</option>
                  <option value="3rd Year" className="bg-cyber-bg text-gray-200">Lorem ipsum</option>
                  <option value="4th Year" className="bg-cyber-bg text-gray-200">Lorem ipsum</option>
                  <option value="Postgraduate" className="bg-cyber-bg text-gray-200">Lorem ipsum</option>
                </select>
                {errors.year && (
                  <p className="text-[10px] text-rose-400 font-medium pl-1">{errors.year.message}</p>
                )}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-4 pt-4 border-t border-white/5 mt-4">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="flex-1 py-3.5 px-4 rounded-xl font-bold font-orbitron text-xs uppercase tracking-wider bg-cyber-purple/10 border border-cyber-purple/20 text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Lorem ipsum
              </button>
              
              <button
                type="submit"
                className="flex-1 py-3.5 px-4 bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:from-cyber-cyan hover:to-cyber-purple text-white border border-cyan-400/20 rounded-xl font-bold font-orbitron text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-950/20 hover:scale-[1.01] transition-all duration-300"
              >
                Lorem Ipsum
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.form>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-5">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};
