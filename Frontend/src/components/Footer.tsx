interface FooterProps {
  color?: string;
}

const Footer: React.FC<FooterProps> = ({ color }) => {
  return (
    <footer
      style={{ backgroundColor: color ?? "#3A4D42" }}
      className="text-white py-4"
    >
      {/* Basic footer with copyright information and social media links */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-16">
        <p className="text-center font-['Outfit'] text-sm mb-2 md:mb-0">
          © Copyright {new Date().getFullYear()} Nature's Edge Wildlife and
          Reptile Rescue, All Rights Reserved.
        </p>
        <div className="flex space-x-5">
          <a
            href="https://form.jotform.com/242857471828065"
            className="hover:text-gray-300 hover:underline"
          >
            Digital Rights
          </a>
          <a
            href="tel:682-463-9453"
            className="hover:text-gray-300 hover:underline"
          >
            Contact Us
          </a>
          <a
            href="https://www.youtube.com/c/NaturesEdgeWildlifeandReptileRescue"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-300 hover:underline"
          >
            YouTube
          </a>
          <a
            href="https://www.instagram.com/naturesedgewildliferescue/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-300 hover:underline"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/Naturesedgewildliferescue"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-300 hover:underline"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
