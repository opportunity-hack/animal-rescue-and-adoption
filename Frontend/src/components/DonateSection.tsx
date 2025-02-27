const DonateSection = () => {
  return (
    <section
      className="bg-[#E8E8E8] flex items-center justify-center px-16 py-16 lg:py-30"
      id="donate"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <div className="text-left flex flex-col justify-center pb-8">
          <h3 className="font-['Montserrat'] font-bold text-4xl text-[#3A4D42] mb-4">
            Support Us!
          </h3>
          <p className="font-['Outfit'] text-lg text-[#3A4D42] mb-4">
            Nature’s Edge Wildlife and Reptile Rescue does not receive any state
            or federal funding. We rely solely on tax-deductible donations from
            the public. If you would like to donate, click on the button below
            to go to the GiveButter platform:
          </p>
          <button className="bg-[#3A4D42] text-white px-6 py-2 w-fit rounded font-outfit font-medium">
            <a
              href="https://givebutter.com/5xEV7E" //href="https://givebutter.com/RlS6V8" (link of unpublished campaign owned by newrr@ohack.org account)
              target="_blank"
              rel="noreferrer"
            >
              Donate
            </a>
          </button>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="sm:pl-16 w-full">
            <givebutter-widget //replace with id of new campaign when published by newrr@ohack.org account
              id="jwM6og"
              height="auto"
              style={{ width: "100%" }}
            ></givebutter-widget>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;
