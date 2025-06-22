'use client';
import { useEffect, useState } from 'react';
import HeroBanner from './components/heroBanner';
import ProductGrid from './components/productGrid';
import { useAppSelector } from './store/hooks';
export default function Home() {
  const user = useAppSelector((state) => state.user.user);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [notification, setNotification] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    const apiToken = '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';

    async function getLlamaResponse() {
      try {
        const response = await fetch(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiToken}`,
            },
            body: JSON.stringify({
              model: 'meta-llama/llama-4-scout-17b-16e-instruct',
              messages: [
                {
                  role: 'user',
                  content: `Generate a personalized message for ${user?.name} who is interested in buying sustainable products. 
            Generate only message and nothing else.
            The message should be in a friendly tone and encourage them to explore our eco-friendly product range. 
            The message should be short and concise, no more than 50 words.
            The message should be in English.
            `,
                },
              ],
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setNotification(data.choices[0].message.content);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 4000);
        setAiResponse(data.choices[0].message.content);

        console.log('Response:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    if (user != null) {
      getLlamaResponse();
    }
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <HeroBanner />
        <ProductGrid />

          {showNotification && (
        <div className="fixed top-[10vh] left-1/2 transform -translate-x-1/2 w-[80vw] z-50 animate-[slideDown_0.4s_ease-out,fadeIn_0.4s_ease-out]">
          <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl border border-green-400/30 backdrop-blur-sm">
         
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-xl blur-xl animate-pulse"></div>
            
  
            <div className="relative flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center animate-[scaleIn_0.5s_ease-out_0.2s_both]">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <span className="flex-1 font-medium text-sm sm:text-base animate-[fadeInRight_0.5s_ease-out_0.3s_both]">
                {notification}
              </span>
              
              <button
                className="ml-4 w-8 h-8 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                onClick={() => setShowNotification(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
      
            <div className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-xl overflow-hidden">
              <div className="h-full bg-white/60 rounded-b-xl animate-[shrink_4s_linear] origin-right"></div>
            </div>
          </div>
        </div>
      )}

 <style jsx>{`
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scaleIn {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes fadeInRight {
    from {
      transform: translateX(20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes shrink {
    from { transform: scaleX(1); }
    to { transform: scaleX(0); }
  }
`}</style>


      </div>
    </>
  );
}


