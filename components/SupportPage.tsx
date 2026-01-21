import React, { useState } from 'react';
import { CheckCircle, Clock, MapPin, Package, Truck } from 'lucide-react';

interface SupportPageProps {
  type: string;
  onBack: () => void;
}

const TrackOrder: React.FC = () => {
    const [orderId, setOrderId] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId.trim()) {
            setError('Please enter a valid Order ID');
            return;
        }
        setError('');
        setLoading(true);
        setResult(null);

        // Simulate network request with a timeout
        setTimeout(() => {
            setLoading(false);
            const id = orderId.trim();
            
            // Mock error for demonstration
            if (id.toLowerCase() === 'invalid') {
                 setError('Order ID not found. Please check and try again.');
                 return;
            }

            // Mock Data
            setResult({
                id: id,
                status: 'In Transit',
                estimatedDelivery: 'Tomorrow, by 8:00 PM',
                currentLocation: 'Mumbai Sort Facility',
                history: [
                    { status: 'Order Placed', date: '2 days ago - 10:30 AM', completed: true },
                    { status: 'Packed', date: 'Yesterday - 02:15 PM', completed: true },
                    { status: 'Shipped', date: 'Yesterday - 06:00 PM', completed: true },
                    { status: 'In Transit', date: 'Today - 09:45 AM', completed: true },
                    { status: 'Out for Delivery', date: 'Pending', completed: false },
                    { status: 'Delivered', date: 'Pending', completed: false },
                ]
            });
        }, 1500);
    };

    return (
        <div className="max-w-xl animate-fadeIn">
             <p className="text-slate-600 mb-6">Enter your order ID (e.g., #1234) to track the status of your package.</p>
             <form onSubmit={handleTrack} className="flex gap-3 mb-2">
               <input
                 type="text"
                 value={orderId}
                 onChange={(e) => setOrderId(e.target.value)}
                 placeholder="Order ID"
                 className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
               />
               <button
                 type="submit"
                 disabled={loading}
                 className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center min-w-[100px] justify-center"
               >
                 {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 ) : 'Track'}
               </button>
             </form>
             {error && <p className="text-rose-500 text-sm mb-6 flex items-center"><span className="inline-block mr-1">⚠️</span> {error}</p>}

             {!result && !loading && !error && (
                <div className="mt-8 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm border border-yellow-100">
                    <p className="flex items-center gap-2"><Clock size={16}/> Tracking information is updated in real-time.</p>
                </div>
             )}

             {result && (
                 <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm animate-fadeIn">
                     <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
                         <div>
                             <h3 className="font-bold text-lg text-slate-900">Order {result.id}</h3>
                             <p className="text-primary-600 font-medium flex items-center mt-1">
                                 <Truck size={16} className="mr-1.5" />
                                 {result.status}
                             </p>
                         </div>
                         <div className="text-right">
                             <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Est. Delivery</p>
                             <p className="font-bold text-slate-900 mt-1">{result.estimatedDelivery}</p>
                         </div>
                     </div>

                     <div className="space-y-0 relative">
                         {/* Connecting Line */}
                         <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-100 -z-10"></div>

                         {result.history.map((step: any, idx: number) => (
                             <div key={idx} className="flex gap-4 py-3">
                                 <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border-2 bg-white z-10 ${step.completed ? 'border-primary-500 bg-primary-50' : 'border-slate-200 bg-slate-50'}`}>
                                     {step.completed ? (
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                                     ) : (
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                                     )}
                                 </div>
                                 <div className={`${step.completed ? 'text-slate-900' : 'text-slate-400'} flex-1`}>
                                     <p className="font-medium text-sm">{step.status}</p>
                                     <p className="text-xs mt-0.5 opacity-80">{step.date}</p>
                                 </div>
                             </div>
                         ))}
                     </div>
                     
                     <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-sm text-slate-600 bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-xl">
                        <MapPin size={16} className="mr-2 text-primary-500" />
                        <span>Last Update: <span className="font-medium text-slate-900">{result.currentLocation}</span></span>
                     </div>
                 </div>
             )}
        </div>
    );
};

const SupportPage: React.FC<SupportPageProps> = ({ type, onBack }) => {
  const renderContent = () => {
    switch (type) {
      case 'FAQ':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-slate-100 pb-6">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Do you ship internationally?</h3>
              <p className="text-slate-600 leading-relaxed">Currently, we only ship within India. We are working on expanding our reach to bring premium stationery to the world!</p>
            </div>
            <div className="border-b border-slate-100 pb-6">
              <h3 className="font-bold text-lg text-slate-900 mb-2">What is your return policy?</h3>
              <p className="text-slate-600 leading-relaxed">We accept returns within 7 days of delivery for unused items in original packaging. If you received a damaged item, please contact us immediately.</p>
            </div>
            <div className="border-b border-slate-100 pb-6">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Are your fountain pens authentic?</h3>
              <p className="text-slate-600 leading-relaxed">Yes, we are authorized retailers for all brands listed on our store, including Lamy, Kaweco, and Pilot.</p>
            </div>
          </div>
        );
      case 'Shipping & Returns':
        return (
          <div className="space-y-6 text-slate-600 leading-relaxed animate-fadeIn">
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center"><Truck size={20} className="mr-2 text-primary-500"/> Shipping Policy</h3>
                <p>We offer <strong>free shipping on orders above ₹999</strong>. For orders below that, a flat fee of ₹99 applies.</p>
                <p className="mt-2">Standard delivery takes 3-5 business days for metros and 5-7 business days for other locations.</p>
             </div>
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center"><Package size={20} className="mr-2 text-primary-500"/> Return Process</h3>
                <p>Returns are easy! Just email us at support@inkandpaper.in with your order ID within 7 days of receiving your package.</p>
             </div>
          </div>
        );
      case 'Track Order':
        return <TrackOrder />;
      case 'Contact Us':
        return (
          <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
            <div className="space-y-8">
                <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email Us</h3>
                    <p className="text-slate-600">support@inkandpaper.in</p>
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 mb-1">Call Us</h3>
                    <p className="text-slate-600">+91 98765 43210</p>
                    <p className="text-sm text-slate-400">Mon-Fri, 9am - 6pm IST</p>
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 mb-1">Visit Us</h3>
                    <p className="text-slate-600">123 Stationery Lane,<br/>Creative City,<br/>Mumbai - 400001</p>
                </div>
            </div>
            <form className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100" onSubmit={(e) => e.preventDefault()}>
                <h3 className="font-bold text-slate-900 mb-2">Send us a message</h3>
                <input type="text" placeholder="Your Name" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white" />
                <input type="email" placeholder="Your Email" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white" />
                <textarea placeholder="Message" rows={4} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white"></textarea>
                <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">Send Message</button>
            </form>
          </div>
        );
      default:
        return <p>Content not found.</p>;
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      <button 
        onClick={onBack}
        className="text-slate-500 hover:text-primary-600 mb-6 flex items-center text-sm font-medium transition-colors"
      >
        &larr; Back to Shop
      </button>
      <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">{type}</h1>
      <div className="w-16 h-1 bg-primary-500 rounded-full mb-8"></div>
      {renderContent()}
    </main>
  );
};

export default SupportPage;