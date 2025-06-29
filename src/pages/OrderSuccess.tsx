import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Download, Star } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { orderId, paymentId, amount, shippingInfo } = location.state || {};

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Order not found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-green-50 dark:bg-green-900/20 px-8 py-6 text-center border-b border-gray-200 dark:border-gray-700">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Thank you for shopping with StyleHub. Your order has been confirmed and will be processed shortly.
            </p>
          </div>

          {/* Order Details */}
          <div className="px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Information</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Order ID:</span>
                    <span className="font-mono text-sm text-gray-900 dark:text-white">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Payment ID:</span>
                    <span className="font-mono text-sm text-gray-900 dark:text-white">{paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Amount Paid:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹{amount?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Order Date:</span>
                    <span className="text-gray-900 dark:text-white">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Estimated Delivery:</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {estimatedDelivery.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              {shippingInfo && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shipping Address</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {shippingInfo.firstName} {shippingInfo.lastName}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">{shippingInfo.address}</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">{shippingInfo.country}</p>
                      <p className="text-gray-600 dark:text-gray-400">{shippingInfo.phone}</p>
                      <p className="text-gray-600 dark:text-gray-400">{shippingInfo.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* What's Next */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What happens next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Order Confirmation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">You'll receive an email confirmation shortly</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Processing</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">We'll prepare your order within 1-2 business days</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Shipping</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">You'll receive tracking information once shipped</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Package className="w-5 h-5 mr-2" />
                  Track Your Order
                </button>
                
                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Receipt
                </button>
                
                <button
                  onClick={() => navigate('/products')}
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Continue Shopping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-400 mb-2">How was your shopping experience?</p>
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="text-gray-300 dark:text-gray-600 hover:text-yellow-400 transition-colors"
                    >
                      <Star className="w-6 h-6" />
                    </button>
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Need help? Contact our support team at{' '}
                <a href="mailto:support@stylehub.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  support@stylehub.com
                </a>{' '}
                or call{' '}
                <a href="tel:+1-555-123-4567" className="text-blue-600 dark:text-blue-400 hover:underline">
                  +1 (555) 123-4567
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;