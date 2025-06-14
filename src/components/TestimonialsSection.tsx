
const TestimonialsSection = () => {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heebo text-navy-dark mb-4">
            מה לקוחות מספרים?
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-gray-light p-8 rounded-xl border-2 border-dashed border-gold relative">
              <div className="absolute top-4 right-4 w-12 h-1 bg-gold"></div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-navy-dark font-bold text-xl">★</span>
                </div>
                <p className="text-lg text-gray-text font-heebo italic mb-4">
                  המלצת לקוח תתווסף כאן בקרוב...
                </p>
                <div className="h-px bg-gold w-12 mx-auto mb-2"></div>
                <p className="text-sm text-gray-text font-heebo">
                  שם הלקוח
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
