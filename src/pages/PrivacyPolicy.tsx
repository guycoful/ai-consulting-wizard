import { legalContent } from "@/lib/legal-content";

const PrivacyPolicy = () => {
  const { title, body } = legalContent.privacy;

  return (
    <main dir="rtl" lang="he" className="bg-navy-dark min-h-screen py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-[680px]">
        <h1 className="text-3xl md:text-4xl font-bold font-heebo text-white mb-8">
          {title}
        </h1>
        <div className="text-gray-300 font-heebo text-sm leading-[1.9] whitespace-pre-line">
          {body}
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
