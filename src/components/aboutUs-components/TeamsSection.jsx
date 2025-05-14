import React from "react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import Matra from "../../assets/TeamsImage/Matra.JPG";
import Raksa from "../../assets/TeamsImage/Raksa.jpg";
import Channim from "../../assets/TeamsImage/Channim.JPG";
import Nita from "../../assets/TeamsImage/Nita.jpg";
import Vanly from "../../assets/TeamsImage/Vanly.jpg";
import Pisethi from "../../assets/TeamsImage/Pisethi.jpg";
import Seyla from "../../assets/TeamsImage/Seyla.png";
import Vicheka from "../../assets/TeamsImage/Vicheka.jpg";
const teams = [
  {
    name: "Chey Somatra",
    role: "UI/UX Design and Front-End",
    image: Matra,
    social: {
      github: "#",
      linkedin: "#",
      website: "#",
    },
  },
  {
    name: "Nov Raksa",
    role: "UI/UX Design and Front-End",
    image: Raksa,
    social: {
      github: "#",
      linkedin: "#",
      website: "#",
    },
  },
  {
    name: "Ey Channim",
    role: "UI/UX Design and Front-End",
    image: Channim,
    social: {
      github: "#",
      linkedin: "#",
      website: "#",
    },
  },
  {
    name: "Heng Nita",
    role: "UI/UX Design and Front-End",
    image: Nita,
    social: {
      github: "#",
      linkedin: "#",
      website: "#",
    },
  },
  {
    name: "Thouen Vanly",
    role: "Java app console and Front-End",
    image: Vanly,
    social: {
      github: "#",
      linkedin: "#",
      website: "#",
    },
  },
  {
    name: "Dina Pisethi",
    role: "Java app console and Front-End",
    image: Pisethi,
    social: {
      github: "#",
      linkedin: "#",
      website: "#",
    },
  },
  {
    name: "Choeun Seyla",
    role: "UI/UX Design and Front-End",
    image: Seyla,
    social: {
      github: "#",
      linkedin: "#",
      website: "#",
    },
  },
  {
    name: "Sokhem Vicheka",
    role: "UI/UX Design and Front-End",
    image: Vicheka,
    social: {
      github: "#",
      linkedin: "#",
      website: "#",
    },
  },
];

const TeamsSection = () => {
  return (
    <section className="text-center ">
      <h2 className=" flex justify-center text-4xl font-bold text-primary mb-10">
        Meet Our Teams
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 py-10 max-w-auto mx-[50px]">
        {teams.map((teams, index) => (
          <div key={index} className="flex flex-col items-center bg-white ">
            <img
              src={teams.image}
              alt={teams.name}
              className="w-50 h-48 rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold m-1">{teams.name}</h3>
            <p className="text-primary text-sm mb-1">{teams.role}</p>
            <div className=" flex space-x-3 mt-2 text-gray-500">
              <a href={teams.social.github} className="text-xl text-black">
                <FaGithub />
              </a>
              <a href={teams.social.linkedin} className="text-xl text-blue-800">
                <FaLinkedin />
              </a>
              <a href={teams.social.website} className="text-xl text-blue-600">
                <FaFacebook />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamsSection;
