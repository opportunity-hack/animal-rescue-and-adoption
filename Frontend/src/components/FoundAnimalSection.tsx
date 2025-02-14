// FoundAnimalSection component definition
const FoundAnimalSection = () => {
  return (
    <section
      className="bg-[#DAD7CE] flex items-center justify-center px-16 py-16 lg:py-36"
      id="found" // Section ID for navigation
    >
      <div className="container mx-auto">
        {/* Section heading */}
        <h3 className="font-['Montserrat'] font-bold text-4xl text-[#3A4D42] mb-4">
          Found an Animal?
        </h3>
        {/* List of instructions for handling found animals, as per origin NEWRR website */}
        <ul className="text-[#3A4D42] space-y-4">
          <li>
            <strong className="font-['Outfit'] font-bold">
              Found a sick, injured, or orphaned wild animal?
            </strong>{" "}
            <span className="font-['Outfit'] text-lg">
              Get it into a box with a lid or crate with a door. You can use a
              towel, sheet, etc., place it over the animal, scoop the whole
              thing up and place in box/crate. Ensure the animal is warm and in
              a quiet area.{" "}
              <strong className="font-['Outfit'] font-bold">
                Baby animal?
              </strong>{" "}
              Place the box half on/half off of a heating pad set on low.
            </span>
          </li>
          <li>
            <strong className="font-['Outfit'] font-bold">
              Never give food or water to any animal, baby or adult.
            </strong>{" "}
            <span className="font-['Outfit'] text-lg">
              Think of it this way, if you go to the ER due to illness or
              injury, they don’t give you food or water until the doctor sees
              you.
            </span>
          </li>
          <li>
            <strong className="font-['Outfit'] font-bold">
              Please do not play with wild animals.
            </strong>{" "}
            <span className="font-['Outfit'] text-lg">
              Holding them, petting them, etc. just adds to their stress.
            </span>
          </li>
          <li>
            <strong className="font-['Outfit'] font-bold">
              Contact NEWRR.
            </strong>{" "}
            <span className="font-['Outfit'] text-lg">
              Enter information in the form below and we will reach out for
              intake and next steps.
            </span>
          </li>
          <li>
            <strong className="font-['Outfit'] font-bold">
              Animal is contained and I’ve contacted NEWRR, what now?
            </strong>{" "}
            <span className="font-['Outfit'] text-lg">
              Contact a permitted wildlife rehabilitator immediately. Helpful
              resources:{" "}
              <a href="https://ahnow.org/" className="underline">
                Animal Help Now
              </a>
              ,{" "}
              <a
                href="tel:972-234-9453"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                DFW Wildlife Hotline
              </a>
            </span>
          </li>
        </ul>
        {/* Button linking to the NEWRR Intake Form */}
        <button className="bg-darkestgreen text-wolfwhite px-6 py-2 mt-6 rounded font-outfit font-medium">
          <a
            href="https://form.jotform.com/250316409045147"
            target="_blank"
            rel="noreferrer"
          >
            NEWRR Intake Form
          </a>
        </button>
      </div>
    </section>
  );
};

export default FoundAnimalSection;
