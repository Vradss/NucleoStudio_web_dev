'use client'

import { motion } from 'framer-motion'

export function BrowserAnimation() {
  // Definir las animaciones con delays para crear el efecto de progresión
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.2,
      },
    },
  }

  const boxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className="mt-20 flex justify-center">
      <motion.svg
        width="100%"
        height="auto"
        viewBox="0 0 1440 866"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Browser chrome */}
        <path
          d="M0 25.6C0 16.6392 0 12.1587 1.7439 8.73615C3.27787 5.72556 5.72556 3.27787 8.73615 1.7439C12.1587 0 16.6392 0 25.6 0H1414.4C1423.36 0 1427.84 0 1431.26 1.7439C1434.27 3.27787 1436.72 5.72556 1438.26 8.73615C1440 12.1587 1440 16.6392 1440 25.6V56H0V25.6Z"
          fill="#0F0F0F"
        />
        <circle cx="30" cy="28" r="6" fill="#ED6B5D" />
        <circle cx="50" cy="28" r="6" fill="#F4BE50" />
        <circle cx="70" cy="28" r="6" fill="#61C554" />

        {/* URL bar and controls */}
        <path
          d="M446.8 14.5H1061.2C1063.45 14.5 1065.11 14.5005 1066.41 14.6074C1067.72 14.7139 1068.63 14.9233 1069.41 15.3174C1070.82 16.0364 1071.96 17.1837 1072.68 18.5947C1073.08 19.3681 1073.29 20.2831 1073.39 21.5859C1073.5 22.8948 1073.5 24.5514 1073.5 26.7998V29.2002C1073.5 31.4486 1073.5 33.1052 1073.39 34.4141C1073.29 35.7169 1073.08 36.6319 1072.68 37.4053C1071.96 38.8163 1070.82 39.9636 1069.41 40.6826C1068.63 41.0767 1067.72 41.2861 1066.41 41.3926C1065.11 41.4995 1063.45 41.5 1061.2 41.5H446.8C444.551 41.5 442.895 41.4995 441.586 41.3926C440.283 41.2861 439.368 41.0767 438.595 40.6826C437.184 39.9636 436.036 38.8163 435.317 37.4053C434.923 36.6319 434.714 35.7169 434.607 34.4141C434.5 33.1052 434.5 31.4486 434.5 29.2002V26.7998C434.5 24.5514 434.5 22.8948 434.607 21.5859C434.714 20.2831 434.923 19.3681 435.317 18.5947C436.036 17.1837 437.184 16.0364 438.595 15.3174C439.368 14.9233 440.283 14.7139 441.586 14.6074C442.895 14.5005 444.551 14.5 446.8 14.5Z"
          stroke="#1F1F1F"
        />

        {/* White background */}
        <rect y="56" width="1426" height="810" fill="#F7F6F3" />

        {/* Box 1 - Producto confuso */}
        <motion.g variants={boxVariants}>
          <rect x="89.5" y="383.5" width="227" height="107" rx="4.5" fill="#F7F6F3" stroke="#6F31FF" />
          <text x="203" y="425" textAnchor="middle" fontSize="20" fill="#0A0A0A" fontWeight="600">
            Producto
          </text>
          <text x="203" y="455" textAnchor="middle" fontSize="18" fill="#6F31FF" fontWeight="500">
            confuso
          </text>
        </motion.g>

        {/* Arrow 1 */}
        <motion.path
          variants={boxVariants}
          d="M402.53 436.53C402.823 436.237 402.823 435.763 402.53 435.47L397.757 430.697C397.464 430.404 396.99 430.404 396.697 430.697C396.404 430.99 396.404 431.464 396.697 431.757L400.939 436L396.697 440.243C396.404 440.536 396.404 441.01 396.697 441.303C396.99 441.596 397.464 441.596 397.757 441.303L402.53 436.53ZM317 436V436.75H402V436V435.25H317V436Z"
          fill="#6F31FF"
        />

        {/* Box 2 - Producto claro (con color morado de Nucleo) */}
        <motion.g variants={boxVariants}>
          <motion.rect
            x="404.5"
            y="383.5"
            width="228"
            height="107"
            rx="4.5"
            fill="#F7F6F3"
            stroke="#6F31FF"
            strokeWidth="2"
            initial={{ fill: '#F7F6F3' }}
            animate={{ fill: ['#F7F6F3', '#E4DEFF', '#D3CBFF', '#C3BDFF'] }}
            transition={{
              duration: 1,
              delay: 1.6,
              ease: 'easeInOut',
            }}
          />
          <text x="518" y="425" textAnchor="middle" fontSize="20" fill="#6F31FF" fontWeight="600">
            Producto
          </text>
          <text x="518" y="455" textAnchor="middle" fontSize="18" fill="#6F31FF" fontWeight="600">
            claro
          </text>
        </motion.g>

        {/* Arrow 2 */}
        <motion.path
          variants={boxVariants}
          d="M718.53 436.53C718.823 436.237 718.823 435.763 718.53 435.47L713.757 430.697C713.464 430.404 712.99 430.404 712.697 430.697C712.404 430.99 712.404 431.464 712.697 431.757L716.939 436L712.697 440.243C712.404 440.536 712.404 441.01 712.697 441.303C712.99 441.596 713.464 441.596 713.757 441.303L718.53 436.53ZM633 436V436.75H718V436V435.25H633V436Z"
          fill="#6F31FF"
        />

        {/* Box 3 - Producto */}
        <motion.g variants={boxVariants}>
          <rect x="719.5" y="383.5" width="229" height="107" rx="4.5" fill="#F7F6F3" stroke="#6F31FF" strokeWidth="2" />
          <text x="834" y="425" textAnchor="middle" fontSize="20" fill="#6F31FF" fontWeight="600">
            Producto
          </text>
          <text x="834" y="455" textAnchor="middle" fontSize="18" fill="#6F31FF" fontWeight="600">
            diferenciado
          </text>
        </motion.g>

        {/* Right side - Framework boxes */}
        <motion.g variants={boxVariants}>
          {/* Sitio web */}
          <rect x="1171.5" y="154.5" width="162" height="64" rx="4.5" fill="#F7F6F3" stroke="#6F31FF" strokeWidth="1.5" />
          <text x="1252" y="186" textAnchor="middle" fontSize="12" fill="#6F31FF" fontWeight="500">
            Sitio web
          </text>

          {/* Linked in */}
          <rect x="1171.5" y="278.5" width="162" height="64" rx="4.5" fill="#F7F6F3" stroke="#6F31FF" strokeWidth="1.5" />
          <text x="1252" y="310" textAnchor="middle" fontSize="12" fill="#6F31FF" fontWeight="500">
            Linked in
          </text>

          {/* Ads */}
          <rect x="1171.5" y="401.5" width="162" height="65" rx="4.5" fill="#F7F6F3" stroke="#6F31FF" strokeWidth="1.5" />
          <text x="1252" y="434" textAnchor="middle" fontSize="12" fill="#6F31FF" fontWeight="500">
            Ads
          </text>

          {/* Materials */}
          <rect x="1171.5" y="522.5" width="162" height="65" rx="4.5" fill="#F7F6F3" stroke="#6F31FF" strokeWidth="1.5" />
          <text x="1252" y="555" textAnchor="middle" fontSize="12" fill="#6F31FF" fontWeight="500">
            Materials
          </text>

          {/* Landing pages */}
          <rect x="1173.5" y="654.5" width="162" height="65" rx="4.5" fill="#F7F6F3" stroke="#6F31FF" strokeWidth="1.5" />
          <text x="1254" y="687" textAnchor="middle" fontSize="12" fill="#6F31FF" fontWeight="500">
            Landing pages
          </text>

          {/* Connecting lines */}
          <line x1="1061.58" y1="185.984" x2="1063.42" y2="693.987" stroke="#6F31FF" strokeWidth="1.5" />
          <line x1="1061" y1="185.25" x2="1171" y2="185.25" stroke="#6F31FF" strokeWidth="1.5" />
          <line x1="1061" y1="309.25" x2="1171" y2="309.25" stroke="#6F31FF" strokeWidth="1.5" />
          <line x1="1061" y1="433.25" x2="1171" y2="433.25" stroke="#6F31FF" strokeWidth="1.5" />
          <line x1="1063" y1="554.25" x2="1173" y2="554.25" stroke="#6F31FF" strokeWidth="1.5" />
          <line x1="1063" y1="693.25" x2="1173" y2="693.25" stroke="#6F31FF" strokeWidth="1.5" />
          <line x1="949" y1="433.25" x2="1061" y2="433.25" stroke="#6F31FF" strokeWidth="1.5" />
        </motion.g>

        {/* Border */}
        <rect x="0.5" y="56.5" width="1425" height="809" stroke="#C3BDFF" />
      </motion.svg>
    </div>
  )
}

