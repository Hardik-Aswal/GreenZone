import React from 'react'
import { HeroSection } from '../components/learn/hero'
import { WhatIsGreenZone } from '../components/learn/why'
import { EcoAuditSteps } from '../components/learn/auditSteps'
import { TutorialVideos } from '../components/learn/tutorial'
import { WhyItMatters } from '../components/learn/matter'
import { SupportSection } from '../components/learn/support'

const page = () => {
  return (
    <main className="min-h-screen bg-white">
        <HeroSection />
      <WhatIsGreenZone />
      <EcoAuditSteps />
      <TutorialVideos />
      <WhyItMatters />
      <SupportSection />
    </main>
  )
}

export default page