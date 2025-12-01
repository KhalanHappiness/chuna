import React from 'react';
import { Mail, Shield, MessageCircle, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 mt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            We Are Here To Ease The Financial Obstacles!
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The choice is in your hands: Get in touch with us today.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Options */}
          <div className="space-y-6">
            {/* Send Email Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    SEND US AN EMAIL
                  </h3>
                  <div className="space-y-2">
                    <p className="text-slate-600">
                      For credit queries:{' '}
                      <a
                        href="mailto:loans.chuna@uonbi.ac.ke"
                        className="text-emerald-600 hover:text-emerald-700 font-medium underline"
                      >
                        loans.chuna@uonbi.ac.ke
                      </a>
                    </p>
                    <p className="text-slate-600">
                      For General Queries please use{' '}
                      <a
                        href="mailto:chunasacco@uonbi.ac.ke"
                        className="text-emerald-600 hover:text-emerald-700 font-medium underline"
                      >
                        chunasacco@uonbi.ac.ke
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    DO YOU WANT TO BE A MEMBER
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Apply and be a member in few seconds. Click
                  </p>
                  <a
                    href="http://applications.chunasacco.co.ke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                  >
                    applications.chunasacco.co.ke
                  </a>
                </div>
              </div>
            </div>

            {/* Communication Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    OPTIMIZED COMMUNICATION
                  </h3>
                  <div className="space-y-2 text-slate-600">
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Give us a call:{' '}
                      <a href="tel:0705951672" className="text-emerald-600 hover:text-emerald-700 font-medium">
                        0705 951 672
                      </a>{' '}
                      or{' '}
                      <a href="tel:0794875028" className="text-emerald-600 hover:text-emerald-700 font-medium">
                        0794 87 50 28
                      </a>
                    </p>
                    <p>or simply write to us from your email.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Map & Location */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-emerald-500 text-white p-6">
                <h2 className="text-3xl font-bold mb-2">VISIT OUR OFFICES</h2>
                <p className="text-emerald-50">It's easy. Write to us.</p>
              </div>
              
              {/* Map Container */}
              <div className="relative h-96 bg-slate-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176449917766!2d36.8165!3d-1.2795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTYnNDYuMiJTIDM2wrA0OCc1OS40IkU!5e0!3m2!1sen!2ske!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Address Info */}
              <div className="p-6 bg-slate-50">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Location</h3>
                    <p className="text-slate-600">
                      University of Nairobi<br />
                      Kijabe Street, Nairobi<br />
                      Near Central Police Station
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}