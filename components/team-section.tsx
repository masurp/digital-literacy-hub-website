"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const teamMembers = [
  {
    id: 1,
    name: "Philipp K. Masur",
    role: "Co-Director",
    bio: "Philipp Masur is an Assistant Professor at the Department of Communication Science at the Vrije Universiteit Amsterdam and Managing Director of the Digital Media and Behavior Lab. His research is concerned with applying socio-psychological and communication theories to study online communication. Particularly, he investigates social influences on social media, privacy and self-disclosure dynamics, and implications for individuals' well-being. In doing so, I aim to identify and foster knowledge and skills necessary to navigate online environments in a healthy and self-determined way.",
    image: "https://dmb-lab.nl/wp-content/uploads/2024/07/AGU5929_Philipp-Masur.jpg",
    personalWebpage: "https://www.philippmasur.de/",
    institutionalPage: "https://research.vu.nl/en/persons/philipp-k-masur",
  },
  {
    id: 2,
    name: "Douglas Parry",
    role: "Co-Director",
    bio: "Doug Parry is an Assistant Professor in the Department of Communication Science at the Vrije Universiteit Amsterdam. His research focuses on the ways in which adolescents and young adults use digital media; the potential effects that this behaviour can have on their cognition, mental health, and well-being; and the knowledge and skills that enable them to thrive in a digital society.",
    image: "https://research.vu.nl/files-asset/368615332/dougaparry.png/",
    personalWebpage: "https://dougaparry.com/",
    institutionalPage: "https://research.vu.nl/en/persons/douglas-parry",
  },
  {
    id: 3,
    name: "Jolanda Veldhuis",
    role: "Co-Director",
    bio: "Jolanda Veldhuis is an Associate Professor in the field of Health and Risk Communication as well as Media Psychology at the Department of Communication Science (Vrije Universiteit Amsterdam). She specializes in digital literacy education and intervention design for diverse populations, often with a specific focus on body image satisfaction and well-being.",
    image: "https://dmb-lab.nl/wp-content/uploads/2025/01/Jolanda-Veldhuis-CW-General-Info.jpg",
    personalWebpage: "",
    institutionalPage: "https://research.vu.nl/en/persons/jolanda-veldhuis",
  },
]

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<(typeof teamMembers)[0] | null>(null)

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-hidden">
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Meet the researchers shaping the future of digital literacy
          </p>
        </motion.div>

        {/* Team Member Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto w-full">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedMember(member)}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 min-h-[400px] sm:min-h-[450px] flex flex-col"
            >
              <div className="w-44 h-44 sm:w-62 sm:h-62 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
              <p className="text-purple-600 font-medium mb-2 sm:mb-3 text-sm sm:text-base">{member.role}</p>
              <p className="text-gray-600 text-xs sm:text-sm line-clamp-6 flex-grow">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto max-h-[90vh] overflow-y-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-36 h-36 sm:w-64 sm:h-64 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden">
                <img
                  src={selectedMember.image || "/placeholder.svg"}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">{selectedMember.name}</h3>
              <p className="text-purple-600 font-medium mb-4 text-center text-sm sm:text-base">{selectedMember.role}</p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">{selectedMember.bio}</p>

              {/* Webpage Links */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                {selectedMember.personalWebpage && (
                  <a
                    href={selectedMember.personalWebpage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base text-center font-medium"
                  >
                    🌐 Personal Website
                  </a>
                )}
                {selectedMember.institutionalPage && (
                  <a
                    href={selectedMember.institutionalPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base text-center font-medium"
                  >
                    🏛️ VU Profile
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
