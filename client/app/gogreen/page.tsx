"use client"
import React from 'react'
import HeroBanner from "../components/heroBanner";
import SaplingHero from '../components/sapling-hero';
import GreenForestHero from '../components/greenforest-hero';
import GroupDeliveryBanner from '../components/group-hero';


const page = () => {
  return (
    <div>
        <HeroBanner />
        <SaplingHero/>
        <GreenForestHero/>
        <GroupDeliveryBanner/>
    
    </div>
  )
}

export default page