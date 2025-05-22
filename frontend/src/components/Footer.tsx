import { Header_3 } from "../assets";

const Footer = () => {
  return (
    <div className="relative h-60 mt-4">
      <img
        src={Header_3}
        alt="cover-image"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-25" />
      <div className="wrapper-header absolute inset-0 flex flex-col justify-end items-center text-center text-white py-4">
        <span className="text-sm animate-fade-in md:text-base">
          © {new Date().getFullYear()} Tea Information Portal
        </span>
      </div>
    </div>
  );
};

export default Footer;
