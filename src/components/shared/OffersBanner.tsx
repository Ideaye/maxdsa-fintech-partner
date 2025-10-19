const OffersBanner = () => {
  const offers = [
    "Unsecured Loan against Insurance Surrender Value",
    "Unsecured Loan for Kirana Stores & other Merchants",
    "Free Accident Insurance upto 1 cr",
    "Digital Assistance for New Channel Partners",
    "Exclusive Tie up with Mamta Housing Finance",
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
