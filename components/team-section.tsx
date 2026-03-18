"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import FloatingNodes from "@/components/3d/floating-nodes"
import { useTranslations } from "next-intl"

const teamData = [
  {
    id: 1,
    name: "Philipp K. Masur",
    bioKey: "philipp" as const,
    role: "coDirector" as const,
    image: "https://research.vu.nl/files-asset/447630676/Portrait_01a_klein.jpg",
    personalWebpage: "https://www.philippmasur.de/",
    institutionalPage: "https://research.vu.nl/en/persons/philipp-k-masur",
  },
  {
    id: 2,
    name: "Douglas Parry",
    bioKey: "douglas" as const,
    role: "coDirector" as const,
    image: "https://research.vu.nl/files-asset/368615332/dougaparry.png/",
    personalWebpage: "https://dougaparry.com/",
    institutionalPage: "https://research.vu.nl/en/persons/douglas-parry",
  },
  {
    id: 3,
    name: "Jolanda Veldhuis",
    bioKey: "jolanda" as const,
    role: "coDirector" as const,
    image: "https://dmb-lab.nl/wp-content/uploads/2025/01/Jolanda-Veldhuis-CW-General-Info.jpg",
    personalWebpage: "",
    institutionalPage: "https://research.vu.nl/en/persons/jolanda-veldhuis",
  },
  {
    id: 4,
    name: "Tilo Hartmann",
    bioKey: "tilo" as const,
    role: "member" as const,
    image: "https://dmb-lab.nl/wp-content/uploads/2024/07/AGU6021-Tilo-Hartmann.jpg",
    personalWebpage: "",
    institutionalPage: "https://research.vu.nl/en/persons/tilo-hartmann/",
  },
  {
    id: 5,
    name: "Martin Baars",
    bioKey: "martin" as const,
    role: "member" as const,
    image: "https://dmb-lab.nl/wp-content/uploads/2026/01/Martin_Baars.jpg",
    personalWebpage: "",
    institutionalPage: "https://research.vu.nl/en/persons/martin-baars/",
  },
]

const partners = [
  {
    id: 1,
    name: "VU Amsterdam",
    logo: "https://keystoneacademic-res.cloudinary.com/image/upload/c_pad,w_640,h_304/dpr_auto/f_auto/q_auto/v1/element/11/119258_VUlogo_NL_Blauw_HR_RGB_tcm289-2013751.png",
    website: "https://vu.nl/en",
  },
  {
    id: 2,
    name: "Digital Media and Behavior Lab",
    logo: "https://dmb-lab.nl/wp-content/uploads/2024/02/DMB_logo_white-768x467.png",
    website: "https://dmb-lab.nl",
  },
  {
    id: 3,
    name: "Department of Communication Science",
    logo: "https://www.creativefabrica.com/wp-content/uploads/2021/10/05/University-Icon-Vector-Graphic-Graphics-18348460-1-1-580x386.jpg",
    website: "https://vu.nl/en/about-vu/faculties/faculty-of-social-sciences/departments/communication-science",
  },
  {
    id: 4,
    name: "Network Institute",
    logo: "https://networkinstitute.org/wp-content/themes/twentyeleven-child/img/logo_clean_sm3.png",
    website: "https://networkinstitute.org",
  },
  {
    id: 5,
    name: "Societal Analytics Lab",
    logo: "https://societal-analytics.nl/images/logo/logo.svg",
    website: "https://societal-analytics.nl/",
  },
]

const truncateWithReadMore = (text: string, maxLength = 200) => {
  if (text.length <= maxLength) return { truncated: text, needsReadMore: false }
  let truncateAt = maxLength
  while (truncateAt > 0 && text[truncateAt] !== " ") truncateAt--
  return { truncated: text.substring(0, truncateAt).trim(), needsReadMore: true }
}

export default function TeamSection() {
  const t = useTranslations("team")
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const selectedMember = selectedId !== null ? teamData.find((m) => m.id === selectedId) ?? null : null

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <FloatingNodes />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{t("title")}</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Team Member Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto w-full">
          {teamData.map((member, index) => {
            const bio = t(`members.${member.bioKey}.bio`)
            const { truncated, needsReadMore } = truncateWithReadMore(bio, 200)

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedId(member.id)}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 min-h-[400px] sm:min-h-[450px] flex flex-col"
              >
                <div className="w-44 h-44 sm:w-62 sm:h-62 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={`${member.name} - ${member.role === "coDirector" ? t("roleCoDirector") : t("roleMember")} at Digital Literacy Hub`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 176px, 248px"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                  {member.role === "coDirector" ? t("roleCoDirector") : t("roleMember")}
                </p>
                <div className="text-gray-600 text-xs sm:text-sm flex-grow">
                  {truncated}
                  {needsReadMore && (
                    <span className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer ml-1">{t("readMore")}</span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-12 sm:mt-16 w-full max-w-6xl mx-auto"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t("partnersTitle")}
              </span>
            </h3>
            <p className="text-sm sm:text-base text-gray-600">{t("partnersSubtitle")}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {partners.map((partner, index) => (
              <motion.a
                key={partner.id}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center group"
              >
                <div className="w-full h-16 sm:h-20 mb-3 flex items-center justify-center relative">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={`${partner.name} - Partner Institution Logo`}
                    fill
                    className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-700 text-center font-medium group-hover:text-purple-600 transition-colors duration-300">
                  {partner.name}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto max-h-[90vh] overflow-y-auto w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="w-36 h-36 sm:w-64 sm:h-64 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden relative">
                <Image
                  src={selectedMember.image || "/placeholder.svg"}
                  alt={`${selectedMember.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 144px, 256px"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">{selectedMember.name}</h3>
              <p className="text-purple-600 font-medium mb-4 text-center text-sm sm:text-base">
                {selectedMember.role === "coDirector" ? t("roleCoDirector") : t("roleMember")}
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">
                {t(`members.${selectedMember.bioKey}.bio`)}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                {selectedMember.personalWebpage && (
                  <a
                    href={selectedMember.personalWebpage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base text-center font-medium"
                  >
                    🌐 {t("personalWebsite")}
                  </a>
                )}
                {selectedMember.institutionalPage && (
                  <a
                    href={selectedMember.institutionalPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base text-center font-medium"
                  >
                    🏛️ {t("vuProfile")}
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
