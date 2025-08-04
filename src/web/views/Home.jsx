import React from 'react'
import { Box } from '@chakra-ui/react'
import HeroSection from '../components/landingpage/HeroSection'
import SlidingText from '../components/landingpage/SlidingText'
import CategoryBar from '../components/landingpage/CategoryBar'
import SearchCourses from '../components/landingpage/SearchCourses'
import Cards from '../components/landingpage/Cards'
import WhatIsOTS from '../components/landingpage/WhatIsOTS'
import OurFeaturesSection from '../components/landingpage/OurFeaturesSection'
import ToolsForTeachersSection from '../components/landingpage/ToolsForTeachersSection'
import AssessmentsSection from '../components/landingpage/AssessmentsSection'
import ClassManagementSection from '../components/landingpage/ClassManagementSection'
import WhatYouCanDo from '../components/landingpage/WhatYouCanDo'
import Newsletter from '../components/landingpage/Newsletter'
import MediaRecognition from '../components/landingpage/MediaRecognition'
import Testimonials from '../components/landingpage/Testimonials'
import LatestNewsAndResources from '../components/landingpage/Latest-News-and-Resources'
import FeedbackSection from "../components/AboutUS/Feedback/FeedbackSection"
import LetsStartWithOTS from "../components/landingpage/Let's-Start-With-OTS"
import Footer from '../components/landingpage/Footer'
import WelcometoOTS from '../components/landingpage/WelcometoOTS'
import OurServices from '../components/landingpage/OurServices'
import PhotoGallery from '../components/landingpage/PhotoGallery'
import SuccessStories from '../components/landingpage/SuccessStories'
import BOX from './BOX'
import ScrollToTopButton from '../components/ScrollToTopButton'
import Features from '../components/landingpage/Features'

function Home() {
  return (
    <BOX>
      <HeroSection />
      <WelcometoOTS/>
      <Features />
      <OurServices />
      <SlidingText />
      <WhatIsOTS />
      <Cards />
      <PhotoGallery />
      <SuccessStories />
      <WhatYouCanDo />
      <MediaRecognition />
      <Testimonials />
      <FeedbackSection />
      <Footer />
      <ScrollToTopButton />
    </BOX>
  )
}

export default Home