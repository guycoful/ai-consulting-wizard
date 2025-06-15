
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "972501234567"; // החלף במספר הטלפון האמיתי שלך
  const message = "שלום גיא! אני מעוניין לשמוע עוד על שירותי הייעוץ AI לעסקים 🚀";
  
  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-bounce"
      aria-label="שלח הודעה בוואטסאפ"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6" />
        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        שלח הודעה בוואטסאפ 💬
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>
    </button>
  );
};

export default WhatsAppButton;
