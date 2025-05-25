import { Tea_Disease, Tea_Export, Tea_Exports, Tea_Price } from "../assets";
import TitleBadge from "./TitleBadge";
import { motion } from "framer-motion";

const Card = ({
  image,
  title,
  description,
  link,
}: {
  image: string;
  title: string;
  description: string;
  link: string;
}) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-white border rounded-lg overflow-hidden transition-transform transform hover:scale-105"
  >
    <img src={image} alt={description} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h2 className="text-gray-700 text-lg font-semibold mb-1">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  </a>
);

const Portal = () => {
  const cards = [
    {
      image: Tea_Export,
      title: "FEE Information",
      description:
        "Track tea export earnings with forecasted forex insights to make informed trade decisions.",
      link: "/forex",
    },
    {
      image: Tea_Exports,
      title: "Demand Information",
      description:
        "Stay updated on global demand for Ceylon tea while exploring emerging markets.",
      link: "/demand",
    },
    {
      image: Tea_Disease,
      title: "Disease Information",
      description:
        "Get essential updates on tea plant diseases and prevention methods.",
      link: "/disease",
    },
    {
      image: Tea_Price,
      title: "Price Information",
      description:
        "Access the latest tea price trends from auctions and global markets.",
      link: "/price",
    },
  ];

  return (
    <section id="portal" className="wrapper flex flex-col items-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <TitleBadge name="TheGuard Portal" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
              link={card.link}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Portal;
