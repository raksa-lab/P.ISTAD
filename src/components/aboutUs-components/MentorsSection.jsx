import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import TeacherPhea from "../../assets/MentorImage/teacherPhea.jpg";
import TeacherPor from "../../assets/MentorImage/teacherPor.png";

const mentors = [
  {
    name: "Sin SreyPhea",
    role: "Mentor",
    image: TeacherPhea,
    social: {
      github: "#",
      linkedin: "#",
      facebook: "#",
    },
  },
  {
    name: "Sreng Chipor",
    role: "Mentor",
    image: TeacherPor,
    social: {
      github: "#",
      linkedin: "#",
      facebook: "#",
    },
  },
];

const MentorsSection = () => {
  return (
    <section className="text-center py-8 ">
      <h2 className="text-4xl font-bold text-primary mb-10">
        Meet Our Mentors
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 p-10 lg:grid-cols-2 justify-center max-w-4xl mx-auto gap-y-10">
        {mentors.map((mentor, index) => (
          <div key={index} className="flex flex-col items-center bg-white  ">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-50 h-48 rounded-full object-cover mb-3"
            />
            <h3 className="text-xl font-semibold">{mentor.name}</h3>
            <p className="text-primary text-sm mb-2">{mentor.role}</p>

            <div className="flex space-x-4 mt-3 text-gray-500">
              <a href={mentor.social.github} className="text-2xl text-black ">
                <FaGithub />
              </a>
              <a
                href={mentor.social.linkedin}
                className="text-2xl text-blue-800"
              >
                <FaLinkedin />
              </a>
              <a
                href={mentor.social.facebook}
                className="text-2xl  text-blue-600 "
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default MentorsSection;
