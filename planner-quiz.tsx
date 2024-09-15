'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const plannerData = {
  sizes: [
    { name: 'Passport', description: 'Compact and travel-friendly, perfect for on-the-go planning.', dimensions: '90mm x 125mm' },
    { name: 'Pocket', description: 'Slightly larger than Passport, fits easily in pockets or small bags.', dimensions: '90mm x 140mm' },
    { name: 'A6', description: 'Standard small notebook size, balances portability and writing space.', dimensions: '105mm x 148mm' },
    { name: 'N1', description: 'Custom size between A6 and B6, offers more writing area while remaining compact.', dimensions: '110mm x 210mm' },
    { name: 'N2', description: 'Slightly larger than N1, provides ample space without being too bulky.', dimensions: '95mm x 186mm' },
    { name: 'B6 Slim', description: 'Slimmer version of B6, ideal for those who want a sleek profile.', dimensions: '110mm x 182mm' },
    { name: 'B6', description: 'Popular size that offers a good balance of portability and writing space.', dimensions: '128mm x 182mm' },
    { name: 'A5', description: 'Classic notebook size, provides plenty of room for detailed planning.', dimensions: '148mm x 210mm' },
    { name: 'B5', description: 'Largest option, perfect for those who need maximum writing space.', dimensions: '182mm x 258mm' }
  ],
  layouts: {
    Vertical: 'Ideal for detailed daily planning, with hours listed vertically.',
    Horizontal: 'Great for weekly overview and task lists, with days spread horizontally.',
    Daily: 'Offers a full page per day, perfect for in-depth daily planning and journaling.'
  },
  yearTypes: {
    Full: 'Contains a full year of planning pages plus enough blank pages to fill out a page daily for the entire year. Best for those who want everything in one book.',
    Compact: 'Compact version with fewer note pages. Ideal for those who want a lighter planner but still need a full year.',
    Half: 'Covers 6 months. Perfect for academic planning or those who prefer to switch planners mid-year.'
  },
  availableOptions: {
    Passport: { Vertical: ['Compact'], Horizontal: ['Compact'] },
    Pocket: { Horizontal: ['Full'] },
    A6: { Vertical: ['Full', 'Compact'], Horizontal: ['Full'] },
    N1: { Vertical: ['Full', 'Compact', 'Half'], Horizontal: ['Full', 'Compact'] },
    N2: { Vertical: ['Full', 'Compact'], Horizontal: ['Full', 'Compact'] },
    'B6 Slim': { Vertical: ['Full', 'Compact'], Horizontal: ['Full', 'Compact'] },
    B6: { Vertical: ['Full', 'Compact', 'Half'], Horizontal: ['Full'], Daily: ['Full'] },
    A5: { Vertical: ['Full', 'Compact', 'Half'], Horizontal: ['Full'], Daily: ['Full'] },
    B5: { Vertical: ['Full', 'Compact'], Horizontal: ['Full', 'Compact'] }
  },
  pageInfo: {
    Full: '520 Pages (152 Planner Pages + 368 Blank Pages)',
    Compact: '272 Pages (152 Planner Pages + 120 Blank Pages)',
    Half: '272 Pages (88 Planner Pages + 184 Blank Pages)',
    Daily: '480 Pages (442 Planner Pages + 38 Blank Pages)'
  }
}

const plannerDetails = {
  'N1-Horizontal-Compact': {
    url: 'https://sterling-ink.com/collections/n1/products/n2-horizontal-compact-full-year-2025-common-planner-in-stock-1',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_749_1024x1024@2x.png?v=1725628938',
      'https://sterling-ink.com/cdn/shop/files/7231300_1024x1024@2x.jpg?v=1724474705'
    ]
  },
  'N1-Horizontal-Full': {
    url: 'https://sterling-ink.com/collections/2025-planners-launching-starting-september-8th-10-am-ny-time/products/n1-horizontal-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_748_1024x1024@2x.png?v=1725628937',
      'https://sterling-ink.com/cdn/shop/files/7231306_1024x1024@2x.jpg?v=1724474593'
    ]
  },
  'N1-Vertical-Compact': {
    url: 'https://sterling-ink.com/collections/2025-planners-launching-starting-september-8th-10-am-ny-time/products/n1-vertical-compact-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_747_1024x1024@2x.png?v=1725628919',
      'https://sterling-ink.com/cdn/shop/files/7231301_1024x1024@2x.jpg?v=1724474429'
    ]
  },
  'N1-Vertical-Full': {
    url: 'https://sterling-ink.com/collections/2025-planners-launching-starting-september-8th-10-am-ny-time/products/n1-vertical-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_746_1024x1024@2x.png?v=1725628840'
    ]
  },
  'N2-Horizontal-Compact': {
    url: 'https://sterling-ink.com/collections/2025-planners-launching-starting-september-8th-10-am-ny-time/products/n2-horizontal-compact-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_753_1024x1024@2x.png?v=1725628937',
      'https://sterling-ink.com/cdn/shop/files/7231292-Edit_1024x1024@2x.jpg?v=1724473574'
    ]
  },
  'N2-Horizontal-Full': {
    url: 'https://sterling-ink.com/collections/n2-weeks/products/n2-horizontal-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_751_1024x1024@2x.png?v=1725628937',
      'https://sterling-ink.com/cdn/shop/files/7171002_1024x1024@2x.jpg?v=1724473457'
    ]
  },
  'N2-Vertical-Compact': {
    url: 'https://sterling-ink.com/collections/n2-weeks/products/n2-vertical-compact-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_752_1024x1024@2x.png?v=1725628937'
    ]
  },
  'N2-Vertical-Full': {
    url: 'https://sterling-ink.com/collections/n2-weeks/products/n2-vertical-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_750_1024x1024@2x.png?v=1725628938'
    ]
  },
  'A5-Daily-Full': {
    url: 'https://sterling-ink.com/collections/2025-planners-launching-starting-september-15th-10-am-ny-time/products/a5-daily-full-year-2025-daily-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/A5_Daily_Planner_1024x1024@2x.png?v=1726067652'
    ]
  },
  'A5-Horizontal-Full': {
    url: 'https://sterling-ink.com/collections/2025-planners-launching-starting-september-15th-10-am-ny-time/products/a5-horizontal-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/A5_H_Full_1024x1024@2x.png?v=1726065180',
      'https://sterling-ink.com/cdn/shop/files/7171013_20bf94cd-f584-46c1-8f72-2f5a0e078c4d_1024x1024@2x.jpg?v=1724562547'
    ]
  },
  'A5-Vertical-Compact': {
    url: 'https://sterling-ink.com/collections/2025-planners-launching-starting-september-15th-10-am-ny-time/products/a5-vertical-compact-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/A5_V_Com_1024x1024@2x.png?v=1726065217',
      'https://sterling-ink.com/cdn/shop/files/7171066_1024x1024@2x.jpg?v=1724562472'
    ]
  },
  'A5-Vertical-Full': {
    url: 'https://sterling-ink.com/collections/2025-planners-launching-starting-september-15th-10-am-ny-time/products/a5-vertical-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/A5_V_Full_1024x1024@2x.png?v=1726064937',
      'https://sterling-ink.com/cdn/shop/files/7160924-2_1024x1024@2x.jpg?v=1724562079',
      'https://sterling-ink.com/cdn/shop/files/7171013_1024x1024@2x.jpg?v=1724562111',
      'https://sterling-ink.com/cdn/shop/files/7171035_1024x1024@2x.jpg?v=1724562133',
      'https://sterling-ink.com/cdn/shop/files/7170964_1024x1024@2x.jpg?v=1724562162'
    ]
  },
  'A5-Vertical-Half': {
    url: 'https://sterling-ink.com/collections/2025-planners-launching-starting-september-15th-10-am-ny-time/products/a5-vertical-half-year-bundle-2-book-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/A5_V_Half_1024x1024@2x.png?v=1726068218',
      'https://sterling-ink.com/cdn/shop/files/7251394_1024x1024@2x.jpg?v=1726067744',
      'https://sterling-ink.com/cdn/shop/files/7251392_1024x1024@2x.jpg?v=1726067743',
      'https://sterling-ink.com/cdn/shop/files/7251395_1024x1024@2x.jpg?v=1726067743'
    ]
  },
  'B6-Daily-Full': {
    url: 'https://sterling-ink.com/collections/2025-planners-launching-starting-september-15th-10-am-ny-time/products/b6-daily-full-year-2025-daily-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/B6_Daily_Planner_1024x1024@2x.png?v=1726065422'
    ]
  },
  'B6-Horizontal-Full': {
    url: 'https://sterling-ink.com/collections/2025-planners-launching-starting-september-15th-10-am-ny-time/products/b6-horizontal-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/B6_H_Full_1024x1024@2x.png?v=1726064999',
      'https://sterling-ink.com/cdn/shop/files/7251367_1024x1024@2x.jpg?v=1724476631'
    ]
  },
  'B6-Vertical-Compact': {
    url: 'https://sterling-ink.com/collections/2025-planners-launching-starting-september-15th-10-am-ny-time/products/b6-vertical-compact-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/B6_V_Com_1024x1024@2x.png?v=1726064882',
      'https://sterling-ink.com/cdn/shop/files/7231320_1024x1024@2x.jpg?v=1724475753'
    ]
  },
  'B6-Vertical-Full': {
    url: 'https://sterling-ink.com/collections/2025-planners-launching-starting-september-15th-10-am-ny-time/products/b6-vertical-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/B6_V_Full_1024x1024@2x.png?v=1726065061',
      'https://sterling-ink.com/cdn/shop/files/7160927_3869dc23-0e98-477c-bb81-43ce11ae2646_1024x1024@2x.jpg?v=1726061545',
      'https://sterling-ink.com/cdn/shop/files/7170960_ad001fec-01a3-430f-80a5-8326c4629720_1024x1024@2x.jpg?v=1726061545',
      'https://sterling-ink.com/cdn/shop/files/7171010_3df01536-ee01-4828-bb80-fc2023407148_1024x1024@2x.jpg?v=1726061619',
      'https://sterling-ink.com/cdn/shop/files/7171032_b8926337-11d4-4f00-a172-abf0ee715306_1024x1024@2x.jpg?v=1726061638'
    ]
  },
  'B6-Vertical-Half': {
    url: 'https://sterling-ink.com/collections/2025-planners-launching-starting-september-15th-10-am-ny-time/products/b6-vertical-half-year-bundle-2-book-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/B6_V_Half_1024x1024@2x.png?v=1726068218',
      'https://sterling-ink.com/cdn/shop/files/7251387_1024x1024@2x.jpg?v=1726067539',
      'https://sterling-ink.com/cdn/shop/files/7251386_1024x1024@2x.jpg?v=1726067539',
      'https://sterling-ink.com/cdn/shop/files/7251388_1024x1024@2x.jpg?v=1726067539'
    ]
  },
  'B5-Horizontal-Compact': {
    url: 'https://sterling-ink.com/collections/b5/products/b5-horizontal-compact-full-year-2025-common-planner-in-stock-copy',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_732_1024x1024@2x.png?v=1724944601'
    ]
  },
  'B5-Horizontal-Full': {
    url: 'https://sterling-ink.com/collections/b5/products/b5-horizontal-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_730_1024x1024@2x.png?v=1724944601'
    ]
  },
  'B5-Vertical-Compact': {
    url: 'https://sterling-ink.com/collections/b5/products/b5-vertical-compact-full-year-2025-common-planner-in-stock-copy',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_731_1024x1024@2x.png?v=1724944601'
    ]
  },
  'B5-Vertical-Full': {
    url: 'https://sterling-ink.com/collections/b5/products/b5-vertical-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_733_1024x1024@2x.png?v=1724944601'
    ]
  },
  'B6 Slim-Horizontal-Compact': {
    url: 'https://sterling-ink.com/collections/b6-slim/products/b6-slim-horizontal-compact-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_735_1024x1024@2x.png?v=1724944600'
    ]
  },
  'B6 Slim-Horizontal-Full': {
    url: 'https://sterling-ink.com/collections/b6-slim/products/b6-slim-horizontal-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_734_1024x1024@2x.png?v=1724944599'
    ]
  },
  'B6 Slim-Vertical-Compact': {
    url: 'https://sterling-ink.com/collections/b6-slim/products/b6-slim-vertical-compact-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_737_1024x1024@2x.png?v=1724944600'
    ]
  },
  'B6 Slim-Vertical-Full': {
    url: 'https://sterling-ink.com/collections/b6-slim/products/b6-slim-vertical-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_736_1024x1024@2x.png?v=1724944600'
    ]
  },
  'A6-Horizontal-Full': {
    url: 'https://sterling-ink.com/collections/a6/products/a6-horizontal-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_738_1024x1024@2x.png?v=1724944598'
    ]
  },
  'A6-Vertical-Compact': {
    url: 'https://sterling-ink.com/collections/a6/products/a6-vertical-compact-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_740_1024x1024@2x.png?v=1724944599'
    ]
  },
  'A6-Vertical-Full': {
    url: 'https://sterling-ink.com/collections/a6/products/a6-vertical-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_739_1024x1024@2x.png?v=1724944599'
    ]
  },
  'Pocket-Horizontal-Full': {
    url: 'https://sterling-ink.com/collections/pocket/products/pocket-horizontal-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_741_1024x1024@2x.png?v=1724944596'
    ]
  },
  'Passport-Horizontal-Compact': {
    url: 'https://sterling-ink.com/collections/passport/products/passport-horizontal-compact-full-year-2025-common-planner-in-stock-copy',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_744_1024x1024@2x.png?v=1724944599',
      'https://sterling-ink.com/cdn/shop/files/7231288_1024x1024@2x.jpg?v=1724472924'
    ]
  },
  'Passport-Vertical-Compact': {
    url: 'https://sterling-ink.com/collections/passport/products/passport-vertical-compact-full-year-2025-common-planner-in-stock',
    images: [
      'https://sterling-ink.com/cdn/shop/files/Frame_745_1024x1024@2x.png?v=1724944598',
      'https://sterling-ink.com/cdn/shop/files/7231290_1024x1024@2x.jpg?v=1724472702'
    ]
  }
}

export default function Component() {
  const [currentStep, setCurrentStep] = useState(-1)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedLayout, setSelectedLayout] = useState('')
  const [selectedYearType, setSelectedYearType] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > -1) {
      setCurrentStep(currentStep - 1)
      if (currentStep === 2) setSelectedYearType('')
      if (currentStep === 1) setSelectedLayout('')
      if (currentStep === 0) setSelectedSize('')
    }
  }

  const resetQuiz = () => {
    setCurrentStep(-1)
    setSelectedSize('')
    setSelectedLayout('')
    setSelectedYearType('')
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    const plannerKey = `${selectedSize}-${selectedLayout}-${selectedYearType}`
    const images = plannerDetails[plannerKey]?.images || []
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    const plannerKey = `${selectedSize}-${selectedLayout}-${selectedYearType}`
    const images = plannerDetails[plannerKey]?.images || []
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const renderStartPage = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="text-2xl font-bold mb-4 font-garamond">Are you ready to pick your perfect planner for 2025?</h2>
      <p className="mb-6 font-montserrat">Answer a few questions to find your perfect 2025 Common Planner match. We'll help you choose the ideal size, layout, and year type that fits your planning style.</p>
      <Button onClick={nextStep}>Start Quiz</Button>
    </motion.div>
  )

  const renderSizeSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 font-garamond">Step 1: Choose Your Planner Size</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plannerData.sizes.map((size) => (
          <Card
            key={size.name}
            className={`cursor-pointer transition-all ${
              selectedSize === size.name ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedSize(size.name)}
          >
            <CardHeader>
              <CardTitle className="font-garamond">{size.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-montserrat">{size.description}</p>
              <p className="text-sm text-muted-foreground mt-2 font-montserrat">Dimensions: {size.dimensions}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )

  const renderLayoutSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 font-garamond">Step 2: Choose Your Layout</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(plannerData.availableOptions[selectedSize]).map(([layout, _]) => (
          <Card
            key={layout}
            className={`cursor-pointer transition-all ${
              selectedLayout === layout ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedLayout(layout)}
          >
            <CardHeader>
              <CardTitle className="font-garamond">{layout}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-montserrat">{plannerData.layouts[layout]}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )

  const renderYearTypeSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 font-garamond">Step 3: Choose Your Year Type</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plannerData.availableOptions[selectedSize][selectedLayout].map((yearType) => (
          <Card
            key={yearType}
            className={`cursor-pointer transition-all ${
              selectedYearType === yearType ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedYearType(yearType)}
          >
            <CardHeader>
              <CardTitle className="font-garamond">{yearType}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-montserrat">{plannerData.yearTypes[yearType]}</p>
              <p className="text-sm text-muted-foreground mt-2 font-montserrat">
                {plannerData.pageInfo[yearType === 'Daily' ? 'Daily' : yearType]}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )

  const renderResult = () => {
    const selectedSizeData = plannerData.sizes.find((s) => s.name === selectedSize)
    const plannerKey = `${selectedSize}-${selectedLayout}-${selectedYearType}`
    const plannerInfo = plannerDetails[plannerKey]

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="font-garamond">Your Perfect Planner</CardTitle>
          </CardHeader>
          <CardContent className="font-montserrat">
            {plannerInfo && plannerInfo.images.length > 0 ? (
              <div className="mb-6 relative">
                <img
                  src={plannerInfo.images[currentImageIndex]}
                  alt={`Selected planner image ${currentImageIndex + 1}`}
                  className="w-full h-auto object-contain max-h-[50vh]"
                />
                {plannerInfo.images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/50 hover:bg-white/75"
                      onClick={prevImage}
                    >
                      <ChevronLeftIcon className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/50 hover:bg-white/75"
                      onClick={nextImage}
                    >
                      <ChevronRightIcon className="h-6 w-6" />
                    </Button>
                  </div>
                )}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                  {plannerInfo.images.map((_, index) => (
                    <span
                      key={index}
                      className={`h-2 w-2 mx-1 rounded-full ${
                        index === currentImageIndex ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-6 flex justify-center items-center h-64 bg-gray-100">
                <p>No image available</p>
              </div>
            )}
            <p><strong>Size:</strong> {selectedSize}</p>
            <p><strong>Layout:</strong> {selectedLayout}</p>
            <p><strong>Year Type:</strong> {selectedYearType}</p>
            <hr className="my-4" />
            <h3 className="text-lg font-semibold mb-2 font-garamond">Planner Details:</h3>
            <p><strong>Dimensions:</strong> {selectedSizeData?.dimensions}</p>
            <p><strong>Pages:</strong> {plannerData.pageInfo[selectedYearType === 'Daily' ? 'Daily' : selectedYearType]}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>Back</Button>
            {plannerInfo && (
              <Button onClick={() => window.open(plannerInfo.url, '_blank')}>
                Get Your Planner
              </Button>
            )}
            <Button variant="outline" onClick={resetQuiz}>Start Over</Button>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center font-garamond">Pick Your 2025 Common Planner</CardTitle>
          <CardDescription className="text-center font-montserrat">Find your perfect planning companion</CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === -1 && renderStartPage()}
          {currentStep === 0 && renderSizeSelection()}
          {currentStep === 1 && renderLayoutSelection()}
          {currentStep === 2 && renderYearTypeSelection()}
          {currentStep === 3 && renderResult()}
        </CardContent>
        {currentStep > -1 && currentStep < 3 && (
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === -1}>
              <ChevronLeftIcon className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={nextStep} disabled={
              (currentStep === 0 && !selectedSize) ||
              (currentStep === 1 && !selectedLayout) ||
              (currentStep === 2 && !selectedYearType)
            }>
              Next <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}