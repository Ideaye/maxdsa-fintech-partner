const OffersBanner = () => {
  const offers = [
    "🎉 Limited Time: Zero Processing Fee on Business Loans up to ₹50 Lakhs",
    "⚡ Quick Approval: Get Working Capital in 48 Hours",
    "🏆 Special Rate: 8.5% p.a. on Term Loans for Manufacturing Sector",
    "💼 New Partner Benefit: Earn Up to 2% Commission on Every Loan",
  ];

  // Duplicate offers for seamless infinite scroll
  const duplicatedOffers = [...offers, ...offers, ...offers];

  return (
    <div className="bg-gradient-to-r from-primary via-fintech-blue to-primary text-white overflow-hidden border-b border-white/10">
      <div className="relative h-10 flex items-center">
        <div className="flex animate-scroll-left pause-animation">
          {duplicatedOffers.map((offer, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-8 text-sm font-medium whitespace-nowrap"
            >
              {offer}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffersBanner;
