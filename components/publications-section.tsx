"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const publications = [
  {
    id: 1,
    title:
      "Examining learners’ engagement patterns and knowledge outcome in an experiential learning intervention for youth’s social media literacy",
    authors: ["Zou, W.", "Purington Drake, A.", "Masur, P. K.", "Whitlock, J.", "Bazarova, N. N."],
    year: 2024,
    journal: "Computers & Education",
    theme: ["Education", "Literacy", "Social Media"],
    abstract:
      "Social media has become an integral part of youth's daily lives. Though it brings many benefits such as creative self‑expression and opportunities for social connection and support, studies have revealed that exposure to cyberbullying, misinformation and disinformation, or phishing and scams pose great risks to youth's mental health and long‑term development. ... This study seeks to fill in this gap by examining how learners' engagement patterns predict learning outcomes (social media literacy) in a simulated environment that embodies the core components of experiential learning. The findings revealed learners' engagement patterns (e.g., time spent, completion rate of actions etc.) ... highlighted the importance of active participation ... in predicting better learning outcomes. ... offers practical implications for the improvement of instructional design to enhance experiential learning.",
    summary:
      "Analyzes how youth’s active engagement (e.g. time spent, completion rate) in an experiential learning simulation predicts gains in social media literacy; emphasizes active participation for better outcomes.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1016/j.compedu.2024.105046",
    },
  },
  {
    id: 2,
    title: "The Youth Social Media Literacy Inventory: Development and Validation Using Item Response Theory",
    authors: ["Purington Drake, A.", "Masur, P. K.", "Bazarova, N. N.", "Zou, E. W.", "Whitlock, J."],
    year: 2023,
    journal: "Journal of Children and Media",
    theme: ["Literacy", "Social Media"],
    abstract:
      "Social media has opened new doors of opportunities and risks for youth. Potential risks include exposure to harmful content, engagement with strangers, or unwanted consequences from irresponsible or naive use. ... This paper aimed to develop a comprehensive Youth Social Media Literacy Inventory (YSMLI) to objectively assess young adolescents’ (9–13 years) knowledge and skills in the context of social media use. The development process included four consecutive steps: ... 4) empirical validation of the final 90‑item pool using item response theory based on a sample of n = 306 youth participants in the US. ... The final item bank is well‑fitting, reliable, and valid, offering scales with varying lengths for different purposes including domain‑specific assessment and parallel testing.",
    summary:
      "Introduces the YSMLI, a 90‑item inventory assessing six domains of social media literacy for ages 9–13, thoroughly validated using IRT.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1080/17482798.2023.2230493",
    },
  },
  {
    id: 3,
    title:
      "Behavioral Contagion on Social Media: Effects of Social Norms, Design Interventions, and Critical Media Literacy on Self-Disclosure",
    authors: ["Masur, P. K.", "DiFranzo, D. J.", "Bazarova, N. N."],
    year: 2021,
    journal: "PLOS One",
    theme: ["Literacy"],
    abstract: "",
    summary:
      "Investigates how social norms, UI interventions, and critical media literacy influence users’ willingness to self‑disclose on social media.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1371/journal.pone.0254670",
    },
  },
  {
    id: 4,
    title:
      "Learning by doing oder doing by learning? Die Wechselwirkung zwischen Online-Privatheitskompetenz und Datenschutzverhalten",
    authors: ["Schäwel, J.", "Frener, R.", "Masur, P. K.", "Trepte, S."],
    year: 2021,
    journal: "Medien & Kommunikationswissenschaft",
    theme: ["Literacy", "Privacy"],
    abstract: "",
    summary:
      "Examines the reciprocal relationship between online privacy literacy and data protection behavior, questioning whether competency leads to action or vice versa.",
    figure: "",
    links: {
      journal: "https://doi.org/10.5771/1615-634X-2021-2-221",
    },
  },
  {
    id: 5,
    title: "How online privacy literacy supports self-data protection and self-determination in the age of information",
    authors: ["Masur, P. K."],
    year: 2020,
    journal: "Media and Communication",
    theme: ["Literacy", "Privacy"],
    abstract: "",
    summary:
      "Argues that privacy literacy empowers individuals to better protect their personal data and exercise self‑determination amidst intensive informational environments.",
    figure: "",
    links: {
      journal: "https://doi.org/10.17645/mac.v8i2.2855",
    },
  },
  {
    id: 6,
    title:
      "Mehr als Bewusstsein für Privatheitsrisiken: Eine Rekonzeptualisierung der Online‑Privatheitskompetenz als Kombination aus Wissen, Fähig‑ und Fertigkeiten",
    authors: ["Masur, P. K."],
    year: 2018,
    journal: "Medien & Kommunikationswissenschaft",
    theme: ["Literacy", "Privacy"],
    abstract: "",
    summary:
      "Reconceptualizes privacy literacy as a combination of knowledge, abilities, and skills, going beyond mere awareness of risks.",
    figure: "",
    links: {
      journal: "https://doi.org/10.5771/1615-634X-2018-4-446",
    },
  },
  {
    id: 7,
    title: "Online-Privatheitskompetenz und deren Bedeutung für demokratische Gesellschaften",
    authors: ["Masur, P. K.", "Teutsch, D.", "Dienlin, T.", "Trepte, S."],
    year: 2017,
    journal: "Forschungsjournal Soziale Bewegungen",
    theme: ["Literacy", "Privacy"],
    abstract: "",
    summary:
      "Discusses the importance of online privacy literacy for democratic societies, linking literacy to civic participation and democratic values.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1515/fjsb-2017-0039",
    },
  },
  {
    id: 8,
    title: "Development and validation of an algorithm literacy scale for Internet users",
    authors: ["Dogruel, L.", "Masur, P. K.", "Jöckel, S."],
    year: 2022,
    journal: "Communication Methods & Measures",
    theme: ["Literacy", "Algorithms"],
    abstract: "",
    summary:
      "Develops and validates a scale to assess ‘algorithm literacy’—users’ understanding of algorithmic processes—filling a measurement gap.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1080/19312458.2021.1968361",
    },
  },
  {
    id: 9,
    title: "Entwicklung und Validierung der Online-Privatheitskompetenzskala (OPLIS)",
    authors: ["Masur, P. K.", "Teutsch, D.", "Trepte, S."],
    year: 2017,
    journal: "Diagnostica",
    theme: ["Literacy", "Privacy"],
    abstract: "",
    summary: "Presents the development and validation of OPLIS, a scale to measure online privacy literacy.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1026/0012-1924/a000179",
    },
  },
  {
    id: 10,
    title: "Challenges in Studying Social Media Privacy Literacy",
    authors: ["Masur, P. K.", "Hagendorff, T.", "Trepte, S."],
    year: 2023,
    journal: "In S. Trepte & P. K. Masur (Eds.), The Routledge Handbook of Privacy and Social Media",
    theme: ["Literacy", "Privacy", "Social Media"],
    abstract: "",
    summary:
      "A chapter addressing methodological and conceptual challenges in researching social media privacy literacy.",
    figure: "",
    links: {},
  },
  {
    id: 11,
    title:
      "Do people know about privacy and data protection strategies? Towards the “Online Privacy Literacy Scale” (OPLIS)",
    authors: ["Trepte, S.", "Teutsch, D.", "Masur, P. K.", "Eicher, C.", "Fischer, M.", "Hennhöfer, A.", "Lind, F."],
    year: 2015,
    journal: "In S. Gutwirth, R. Leenes & P. de Hert (Eds.), Reforming European Data Protection Law",
    theme: ["Literacy", "Privacy"],
    abstract: "",
    summary:
      "A book chapter discussing public awareness of privacy/data protection strategies and contributing to the development of OPLIS.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1007/978-94-017-9385-8",
    },
  },
  {
    id: 12,
    title: "Social Media and Youth Mental Health: Simple Narratives Produce Biased Interpretations",
    authors: ["Sewall, C.", "Parry, D. A."],
    year: 2024,
    journal: "Journal of Psychopathology and Clinical Science",
    theme: ["Mental Health", "Media Effects"],
    abstract:
      "This article critiques the use of simplistic narratives in interpreting the relationship between social media and youth mental health. The authors argue that such narratives can lead to biased conclusions, overlooking complex mechanisms and heterogeneity in effects. The paper calls for more nuanced approaches to media effects research.",
    summary:
      "Argues that oversimplified narratives distort understanding of social media’s impact on youth mental health and calls for more nuanced interpretations.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1037/abn0000950",
    },
  },
  {
    id: 13,
    title: "Mapping a Pluralistic Continuum of Approaches to Digital Disconnection",
    authors: ["Ross, M.", "Gilbert, A.", "Klingelhoefer, J.", "Matassi, M.", "Nassen, L.", "Van Bruyssel, S.", "Verlinden, A.", "Parry, D. A."],
    year: 2024,
    journal: "Media, Culture & Society",
    theme: ["Digital Wellbeing", "Media Use"],
    abstract:
      "This article proposes a pluralistic framework for understanding digital disconnection. Based on empirical research, it identifies a continuum of motivations, strategies, and consequences that individuals experience when disconnecting from digital media.",
    summary:
      "Outlines a continuum of strategies and motivations for digital disconnection, promoting a pluralistic understanding of digital wellbeing.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1177/01634437241228785",
    },
  },
  {
    id: 14,
    title: "Does the Mere Presence of a Smartphone Impact Cognitive Performance? A Meta-Analysis of the 'Brain Drain Effect'",
    authors: ["Parry, D. A."],
    year: 2024,
    journal: "Media Psychology",
    theme: ["Cognition", "Smartphone Use"],
    abstract:
      "This meta-analysis evaluates the 'brain drain effect'—the hypothesis that the mere presence of a smartphone impairs cognitive performance. Findings suggest a small but significant effect, moderated by study design and task complexity.",
    summary:
      "Conducts a meta-analysis on how smartphone presence impacts cognition, confirming a small negative effect under certain conditions.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1080/15213269.2023.2286647",
    },
  },
  {
    id: 15,
    title: "Using Browser Data to Understand Desires to Spend Time Online",
    authors: ["McCrosky, J.", "Parry, D. A.", "Sewall, C. J. R.", "Orben, A."],
    year: 2023,
    journal: "Technology, Mind, and Behavior",
    theme: ["Digital Behavior", "Self-Regulation"],
    abstract:
      "By analyzing browser data, this study examines users’ momentary desires to spend time online. It provides insights into how actual online behavior aligns with internal states, contributing to the understanding of digital self-regulation.",
    summary:
      "Uses browser data to link momentary online behavior with internal desires, providing insight into digital self-regulation.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1037/tmb0000095",
    },
  },
  {
    id: 16,
    title: "Digital Wellbeing Applications: Adoption, Use and Perceived Effects",
    authors: ["Parry, D. A.", "le Roux, D. B.", "Morton, J.", "Pons, R.", "Pretorius, R.", "Schoeman, A."],
    year: 2023,
    journal: "Computers in Human Behavior",
    theme: ["Digital Wellbeing", "App Use"],
    abstract:
      "This study investigates the adoption and usage of digital wellbeing apps among a diverse population. It explores perceived effectiveness and barriers to sustained use, offering implications for app design and public health messaging.",
    summary:
      "Explores who uses digital wellbeing apps, how they use them, and how effective users perceive them to be.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1016/j.chb.2022.107542",
    },
  },
  {
    id: 17,
    title: "Investigating Predictors of Online Vigilance among University Students",
    authors: ["le Roux, D. B.", "Parry, D. A."],
    year: 2022,
    journal: "Information Technology & People",
    theme: ["Digital Behavior", "Media Vigilance"],
    abstract:
      "This paper explores psychological and situational predictors of online vigilance—defined as persistent monitoring of digital channels. Results suggest that perceived obligation, FOMO, and academic demands shape online vigilance among students.",
    summary:
      "Examines drivers of students’ persistent digital monitoring and highlights FOMO and academic expectations as key predictors.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1108/ITP-04-2020-0226",
    },
  },
  {
    id: 18,
    title: "A Systematic Review and Meta-Analysis of Discrepancies Between Logged and Self-Reported Digital Media Use",
    authors: ["Parry, D. A.", "Davidson, B. I.", "Sewall, C. J.", "Fisher, J. T.", "Mieczkowski, H.", "Quintana, D. S."],
    year: 2021,
    journal: "Nature Human Behaviour",
    theme: ["Methodology", "Digital Media Use"],
    abstract:
      "This meta-analysis compares self-reported and objectively logged digital media use. Findings reveal consistent overreporting and underscore the importance of incorporating behavioral data in media effects research.",
    summary:
      "Reveals systematic discrepancies between logged and self-reported media use, emphasizing need for behavioral tracking in research.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1038/s41562-021-01117-5",
    },
  },
  {
    id: 19,
    title: "The Role of Depression in the Discrepancy Between Estimated and Actual Smartphone Use: A Cubic Response Surface Analysis",
    authors: ["Sewall, C.", "Parry, D. A."],
    year: 2021,
    journal: "Technology, Mind, and Behavior",
    theme: ["Mental Health", "Smartphone Use"],
    abstract:
      "Using response surface analysis, this study finds that depressive symptoms are linked to larger discrepancies between actual and estimated smartphone use, offering a nuanced perspective on self-monitoring accuracy.",
    summary:
      "Finds that depressive symptoms are linked to greater mismatches between actual and perceived smartphone use.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1037/tmb0000036",
    },
  },
  {
    id: 20,
    title: "An Exploratory Investigation of the Use and Effects of Academic Instant Messaging Groups among University Students",
    authors: ["le Roux, D. B.", "Parry, D. A."],
    year: 2021,
    journal: "Education and Information Technologies",
    theme: ["Education", "Digital Communication"],
    abstract:
      "This exploratory study examines how students use academic instant messaging groups (AIMGs), their perceived benefits, and unintended consequences such as overload or pressure to respond.",
    summary:
      "Explores how university students use academic messaging groups and the resulting social and academic implications.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1007/s10639-021-10631-y",
    },
  },
  {
    id: 21,
    title: "“Cognitive Control in Media Multitaskers” Ten Years On: A Meta-Analysis",
    authors: ["Parry, D. A.", "le Roux, D. B."],
    year: 2021,
    journal: "Cyberpsychology: Journal of Psychosocial Research on Cyberspace",
    theme: ["Cognition", "Media Multitasking"],
    abstract:
      "A decade after the original media multitasking research, this meta-analysis reevaluates the evidence on whether multitaskers show deficits in cognitive control, finding only limited support for such claims.",
    summary:
      "A meta-analysis revisiting cognitive control in media multitaskers; finds only modest support for impairment.",
    figure: "",
    links: {
      journal: "https://doi.org/10.5817/CP2021-2-7",
    },
  },
  {
    id: 22,
    title:
      "The active-passive dichotomy refined: How types of photo sharing and photo viewing coincide with adolescents’ mental health and body image",
    authors: ["Bij de Vaate, N. A. J. D.", "Veldhuis, J.", "Konijn, E. A."],
    year: 2024,
    journal: "Telematics and Informatics",
    theme: ["Mental Health", "Body Image", "Social Media"],
    abstract:
      "This study refines the active-passive social media use dichotomy by distinguishing types of photo sharing and viewing. It examines how these behaviors are associated with adolescents' mental health and body image outcomes.",
    summary:
      "Refines the active-passive media use framework by exploring how photo sharing and viewing relate to adolescents’ mental health and body image.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1016/j.tele.2024.102160",
    },
  },
  {
    id: 23,
    title:
      "Motives for using social networking sites: a uses & gratifications perspective amongst people with eating disorder symptoms",
    authors: ["Dingemans, A. E.", "Veldhuis, J.", "Lähde, I."],
    year: 2023,
    journal: "Journal of Eating Disorders",
    theme: ["Eating Disorders", "Social Media Use"],
    abstract:
      "This study applies uses and gratifications theory to explore social networking motives among individuals experiencing eating disorder symptoms, identifying specific needs driving their engagement.",
    summary:
      "Explores social media motives among people with eating disorder symptoms using a uses and gratifications framework.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1186/s40337-023-00991-6",
    },
  },
  {
    id: 24,
    title:
      "The impact of seeing and posting photos on mental health and body satisfaction: A panel study among Dutch and Japanese adolescents",
    authors: ["Bij de Vaate, N. A. J. D.", "Veldhuis, J.", "Konijn, E. A."],
    year: 2023,
    journal: "Computers in Human Behavior",
    theme: ["Mental Health", "Cross-Cultural", "Body Image"],
    abstract:
      "This panel study explores the longitudinal relationship between photo-related social media behaviors and body satisfaction among adolescents in the Netherlands and Japan.",
    summary:
      "Panel study showing how photo viewing/posting on social media affects body satisfaction among Dutch and Japanese adolescents.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1016/j.chb.2023.107906",
    },
  },
  {
    id: 25,
    title:
      "Follow, filter, filler? Social media usage and cosmetic procedure intention, acceptance, and normalization among young adults",
    authors: ["Hermans, A. M.", "Boerman, S. C.", "Veldhuis, J."],
    year: 2022,
    journal: "Body Image",
    theme: ["Body Image", "Social Media", "Cosmetic Surgery"],
    abstract:
      "This study examines how different types of social media usage relate to intentions and attitudes toward cosmetic procedures in young adults.",
    summary:
      "Explores how various social media behaviors predict young adults' cosmetic surgery intentions and attitudes.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1016/j.bodyim.2022.10.004",
    },
  },
  {
    id: 26,
    title:
      "Plurality in the measurement of social media use and mental health: An exploratory study among adolescents and young adults",
    authors: [
      "Petropoulos Petalas, D.",
      "Konijn, E. A.",
      "Johnson, B. K.",
      "Veldhuis, J.",
      "Bij de Vaate, N. A. J. D.",
      "Burgers, C.",
      "Droog, E.",
      "Międzobrodzka, E.",
      "Balint, K. E.",
      "van de Schoot, R.",
    ],
    year: 2021,
    journal: "Social Media + Society",
    theme: ["Mental Health", "Measurement", "Social Media"],
    abstract:
      "This exploratory study investigates various operationalizations of social media use and their differential associations with mental health outcomes.",
    summary:
      "Examines how different ways of measuring social media use affect observed links to adolescent and young adult mental health.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1177/20563051211033836",
    },
  },
  {
    id: 27,
    title:
      "How online self-presentation affects well-being and body image: A systematic review",
    authors: ["Bij de Vaate, N. A. J. D.", "Veldhuis, J.", "Konijn, E."],
    year: 2020,
    journal: "Telematics and Informatics",
    theme: ["Self-Presentation", "Body Image", "Well-being"],
    abstract:
      "This systematic review synthesizes literature on the relationship between online self-presentation and outcomes like body image and well-being.",
    summary:
      "Reviews how presenting oneself online affects well-being and body image, highlighting both risks and benefits.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1016/j.tele.2020.101316",
    },
  },
  {
    id: 28,
    title:
      "Me, my selfie, and I: the relations between selfie behaviors, body image, self-objectification, and self-esteem in young women",
    authors: ["Veldhuis, J.", "Alleva, J. M.", "Bij de Vaate, N. A. J. D.", "Keijer, M. G.", "Konijn, E. A."],
    year: 2020,
    journal: "Psychology of Popular Media",
    theme: ["Selfie", "Body Image", "Self-Esteem"],
    abstract:
      "This study investigates associations between selfie-taking and viewing behavior and psychological outcomes including body image, self-objectification, and self-esteem in young women.",
    summary:
      "Links selfie behavior to body image, self-objectification, and self-esteem in young women.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1037/ppm0000206",
    },
  },
  {
    id: 29,
    title:
      "Face yourself(ie): Investigating selfie-behavior in females with severe eating disorder symptoms",
    authors: ["Yellowlees, R.", "Dingemans, A. E.", "Veldhuis, J.", "Bij de Vaate, N. A. J. D."],
    year: 2019,
    journal: "Computers in Human Behavior",
    theme: ["Selfie", "Eating Disorders", "Mental Health"],
    abstract:
      "This study explores selfie behavior among females with severe eating disorder symptoms, aiming to understand potential psychological correlates.",
    summary:
      "Investigates selfie use in females with severe eating disorder symptoms, linking it to mental health concerns.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1016/j.chb.2019.07.009",
    },
  },
  {
    id: 30,
    title:
      "Is that my friend or an advert? The Effectiveness of Instagram Native Advertisements Posing as Social Posts",
    authors: ["Johnson, B.", "Potocki, B.", "Veldhuis, J."],
    year: 2019,
    journal: "Journal of Computer-Mediated Communication",
    theme: ["Advertising", "Social Media"],
    abstract:
      "This article examines how users perceive and respond to Instagram native ads disguised as social posts, evaluating their persuasive effectiveness and transparency.",
    summary:
      "Analyzes how native ads on Instagram influence perception and effectiveness when posed as regular posts.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1093/jcmc/zmz006",
    },
  },
  {
    id: 31,
    title:
      "The effect of Instagram 'likes' on women's social comparison and body dissatisfaction",
    authors: ["Tiggemann, M.", "Hayden, S.", "Brown, Z.", "Veldhuis, J."],
    year: 2018,
    journal: "Body Image",
    theme: ["Social Comparison", "Body Image"],
    abstract:
      "This study examines whether the number of 'likes' on Instagram posts influences women's social comparison tendencies and feelings of body dissatisfaction.",
    summary:
      "Shows how Instagram likes can intensify body dissatisfaction via social comparison processes.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1016/j.bodyim.2018.07.002",
    },
  },
  {
    id: 32,
    title:
      "Show your best self(ie): An exploratory study on selfie-related motivations and behavior in emerging adulthood",
    authors: ["Bij de Vaate, N. A. J. D.", "Veldhuis, J.", "Alleva, J. M.", "Konijn, E. A.", "van Hugten, C. H. M."],
    year: 2018,
    journal: "Telematics and Informatics",
    theme: ["Selfie", "Emerging Adulthood", "Motivation"],
    abstract:
      "This exploratory study investigates young adults’ motivations for taking and sharing selfies, relating them to underlying psychological needs and behavioral tendencies.",
    summary:
      "Explores why young adults take selfies, linking behavior to motivations like self-expression and self-presentation.",
    figure: "",
    links: {
      journal: "https://doi.org/10.1016/j.tele.2018.03.010",
    },
  }
]

const themes = ["All", "Literacy", "Privacy", "Education", "Wellbeing", "Algorithms", "Social Media"]

export default function PublicationsSection() {
  const [selectedPublication, setSelectedPublication] = useState<(typeof publications)[0] | null>(null)
  const [selectedTheme, setSelectedTheme] = useState("All")

  const filteredPublications = (
    selectedTheme === "All" ? publications : publications.filter((pub) => pub.theme.includes(selectedTheme))
  ).sort((a, b) => b.year - a.year)

  const handleLinkClick = (url: string, e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Publications
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Research outputs contributing to the field of digital literacy
          </p>
        </motion.div>

        {/* Theme Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-6 sm:mb-8 justify-center"
        >
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedTheme === theme ? "bg-indigo-600 text-white" : "bg-white/80 text-gray-700 hover:bg-indigo-100"
              }`}
            >
              {theme}
            </button>
          ))}
        </motion.div>

        {/* Publications Grid */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-h-[70vh] sm:max-h-[600px] overflow-y-auto max-w-5xl">
            {filteredPublications.map((publication, index) => (
              <motion.div
                key={publication.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedPublication(publication)}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {publication.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  {publication.authors.join(", ")} ({publication.year})
                </p>
                <p className="text-xs sm:text-sm text-indigo-600 font-medium mb-2">{publication.journal}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {publication.theme.map((theme, index) => (
                      <span
                        key={index}
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          theme === "Privacy"
                            ? "bg-red-100 text-red-800"
                            : theme === "Education"
                              ? "bg-blue-100 text-blue-800"
                              : theme === "Wellbeing"
                                ? "bg-green-100 text-green-800"
                                : theme === "Literacy"
                                  ? "bg-purple-100 text-purple-800"
                                  : theme === "Social Media"
                                    ? "bg-pink-100 text-pink-800"
                                    : theme === "Algorithms"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                  {/* Quick access links */}
                  <div className="flex gap-1">
                    {publication.links.preprint && (
                      <button
                        onClick={(e) => handleLinkClick(publication.links.preprint!, e)}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                        title="View preprint"
                      >
                        Preprint
                      </button>
                    )}
                    {publication.links.journal && (
                      <button
                        onClick={(e) => handleLinkClick(publication.links.journal!, e)}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                        title="View journal article"
                      >
                        Journal
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Publication Detail Modal */}
      <AnimatePresence>
        {selectedPublication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPublication(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Content */}
                <div className="flex-1">
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                    {selectedPublication.title}
                  </h3>

                  <div className="mb-4">
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">
                      <strong>Authors:</strong> {selectedPublication.authors.join(", ")}
                    </p>
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">
                      <strong>Year:</strong> {selectedPublication.year}
                    </p>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">
                      <strong>Journal:</strong> {selectedPublication.journal}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPublication.theme.map((theme, index) => (
                        <span
                          key={index}
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            theme === "Privacy"
                              ? "bg-red-100 text-red-800"
                              : theme === "Education"
                                ? "bg-blue-100 text-blue-800"
                                : theme === "Wellbeing"
                                  ? "bg-green-100 text-green-800"
                                  : theme === "Literacy"
                                    ? "bg-purple-100 text-purple-800"
                                    : theme === "Social Media"
                                      ? "bg-pink-100 text-pink-800"
                                      : theme === "Algorithms"
                                        ? "bg-orange-100 text-orange-800"
                                        : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Summary (if available) */}
                  {selectedPublication.summary && (
                    <div className="mb-4 sm:mb-6">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Summary:</h4>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base bg-blue-50 p-4 rounded-lg">
                        {selectedPublication.summary}
                      </p>
                    </div>
                  )}

                  {/* Abstract */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Abstract:</h4>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{selectedPublication.abstract}</p>
                  </div>

                  {/* Access Links */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Access:</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedPublication.links.preprint && (
                        <motion.button
                          onClick={(e) => handleLinkClick(selectedPublication.links.preprint!, e)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium flex items-center gap-2"
                        >
                          📄 Preprint
                        </motion.button>
                      )}
                      {selectedPublication.links.journal && (
                        <motion.button
                          onClick={(e) => handleLinkClick(selectedPublication.links.journal!, e)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2"
                        >
                          🔗 Journal Article
                        </motion.button>
                      )}
                      {selectedPublication.links.pdf && (
                        <motion.button
                          onClick={(e) => handleLinkClick(selectedPublication.links.pdf!, e)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
                        >
                          📥 Download PDF
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Figure (if available) */}
                {selectedPublication.figure && (
                  <div className="lg:w-1/3">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Figure:</h4>
                      <img
                        src={selectedPublication.figure || "/placeholder.svg"}
                        alt={`Figure from ${selectedPublication.title}`}
                        className="w-full h-auto rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedPublication(null)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
