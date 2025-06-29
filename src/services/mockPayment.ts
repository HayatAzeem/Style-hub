export interface MockPaymentOptions {
  amount: number;
  currency: string;
  name: string;
  description: string;
  userDetails: {
    name: string;
    email: string;
    contact: string;
  };
  onSuccess: (response: MockPaymentResponse) => void;
  onError: (error: any) => void;
}

export interface MockPaymentResponse {
  payment_id: string;
  order_id: string;
  signature: string;
  status: 'success';
}

export const createMockOrder = async (amount: number): Promise<{ orderId: string; amount: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orderId = `mock_order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      resolve({
        orderId,
        amount: Math.round(amount * 100) // Convert to paise equivalent
      });
    }, 500);
  });
};

export const initiateMockPayment = (options: MockPaymentOptions) => {
  // Create a mock payment modal
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
      <div class="text-center">
        <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Mock Payment Gateway</h3>
        <p class="text-gray-600 mb-4">This is a demo payment system</p>
        
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <div class="text-left space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Merchant:</span>
              <span class="font-medium">${options.name}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Amount:</span>
              <span class="font-medium">₹${(options.amount).toFixed(2)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Email:</span>
              <span class="font-medium">${options.userDetails.email}</span>
            </div>
          </div>
        </div>
        
        <div class="space-y-3">
          <button id="mock-pay-success" class="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold">
            ✓ Simulate Successful Payment
          </button>
          <button id="mock-pay-fail" class="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-semibold">
            ✗ Simulate Failed Payment
          </button>
          <button id="mock-pay-cancel" class="w-full bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors font-semibold">
            Cancel Payment
          </button>
        </div>
        
        <p class="text-xs text-gray-500 mt-4">
          This is a mock payment system for demonstration purposes only.
        </p>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Handle success payment
  const successBtn = modal.querySelector('#mock-pay-success');
  successBtn?.addEventListener('click', () => {
    document.body.removeChild(modal);
    
    setTimeout(() => {
      const response: MockPaymentResponse = {
        payment_id: `mock_pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        order_id: `mock_order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        signature: `mock_sig_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`,
        status: 'success'
      };
      options.onSuccess(response);
    }, 1000);
  });

  // Handle failed payment
  const failBtn = modal.querySelector('#mock-pay-fail');
  failBtn?.addEventListener('click', () => {
    document.body.removeChild(modal);
    
    setTimeout(() => {
      options.onError({
        code: 'PAYMENT_FAILED',
        description: 'Payment failed due to insufficient funds or card declined.'
      });
    }, 1000);
  });

  // Handle cancel payment
  const cancelBtn = modal.querySelector('#mock-pay-cancel');
  cancelBtn?.addEventListener('click', () => {
    document.body.removeChild(modal);
    
    setTimeout(() => {
      options.onError({
        code: 'USER_CANCELLED',
        description: 'Payment was cancelled by the user.'
      });
    }, 500);
  });

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
      setTimeout(() => {
        options.onError({
          code: 'USER_CANCELLED',
          description: 'Payment was cancelled by the user.'
        });
      }, 500);
    }
  });
};

export const verifyMockPayment = async (
  paymentId: string,
  orderId: string,
  signature: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate verification - in real app this would be done on backend
      const isValid = paymentId.startsWith('mock_pay_') && 
                     orderId.startsWith('mock_order_') && 
                     signature.startsWith('mock_sig_');
      resolve(isValid);
    }, 1000);
  });
};

export const formatCurrency = (amount: number, currency: 'USD' | 'INR' = 'INR'): string => {
  if (currency === 'INR') {
    return `₹${amount.toFixed(2)}`;
  }
  return `$${amount.toFixed(2)}`;
};

export const convertUSDToINR = (usdAmount: number): number => {
  const exchangeRate = 83; // Approximate USD to INR rate
  return Math.round(usdAmount * exchangeRate * 100) / 100;
};