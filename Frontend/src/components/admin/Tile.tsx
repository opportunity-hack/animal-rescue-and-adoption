import React from "react";
import { motion } from "framer-motion";
import { Share2, MessageSquare, ChevronRight } from "lucide-react";

interface TileProps {
  title: string;
  icon: React.ReactNode;
  items: {
    name: string;
    icon: React.ReactNode;
    actions?: string[];
    url?: string;
    url2?: string;
  }[];
}

const Tile: React.FC<TileProps> = ({ title, icon, items }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("URL copied to clipboard!");
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-${title === "GiveButter" ? "darkergreen" : "lightgreen"} text-white p-6 rounded-lg shadow-lg`}
    >
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-2xl font-bold ml-2">{title}</h2>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 p-4 rounded-md"
          >
            <div className="flex items-center justify-between mb-2">
              {item.icon}
              <h3 className="text-lg font-semibold">{item.name}</h3>
            </div>
            {item.actions ? (
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    copyToClipboard(
                      `${item.url}`
                    )
                  }
                  className="bg-sage text-darkestgreen px-3 py-1 rounded-md text-sm flex items-center"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </button>
                <a
                  href={item.url2 || "#"}
                  className="bg-sage text-darkestgreen px-3 py-1 rounded-md text-sm flex items-center"
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Responses
                </a>
              </div>
            ) : (
              <a
                href={item.url || "#"}
                className="bg-sage text-darkestgreen px-3 py-1 rounded-md text-sm flex items-center justify-center"
              >
                View <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Tile;
