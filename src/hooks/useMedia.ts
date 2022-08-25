import * as React from 'react'

type TDevice = { isMobileOnly: boolean; isTablet: boolean; isBrowser: boolean; isMobile: boolean }

export default function useMedia(): TDevice {
  const device = {
    _mobileOnly: false,
    _tablet: false,
    _browser: true, // default
    _mobile: false,
  }
  const [isMobileOnly, setIsMobileOnly] = React.useState(device._mobileOnly)
  const [isMobile, setIsMobile] = React.useState(device._mobile)
  const [isTablet, setIsTablet] = React.useState(device._tablet)
  const [isBrowser, setIsBrowser] = React.useState(device._browser)

  function initialDevice(): void {
    if (typeof window !== 'undefined') {
      const resize = {
        _mobileOnly: window.matchMedia('only screen and (max-width: 640px)').matches,
        _tablet: window.matchMedia('only screen and (max-width: 1024px) and (min-width: 768px)').matches,
        _browser: window.matchMedia('only screen and (min-width: 1280px)').matches,
        _mobile: window.matchMedia('only screen and (max-width: 1024px)').matches,
      }
      setIsMobileOnly(resize._mobileOnly)
      setIsTablet(resize._tablet)
      setIsMobile(resize._mobile)
      setIsBrowser(resize._browser)
    }
  }

  function handleSizeChange(): void {
    let resolution = 0
    if (typeof window !== 'undefined') {
      resolution = window.innerWidth
    }
    const resize = {
      _mobileOnly: resolution >= 320 && resolution <= 640,
      _mobile: resolution >= 320 && resolution <= 1024,
      _tablet: resolution >= 768 && resolution <= 1024,
      _browser: resolution >= 1280,
    }
    setIsMobileOnly(resize._mobileOnly)
    setIsTablet(resize._tablet)
    setIsMobile(resize._mobile)
    setIsBrowser(resize._browser)
  }

  React.useEffect(() => {
    initialDevice()
  }, [])

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleSizeChange)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleSizeChange)
      }
    }
  }, [isMobileOnly, isMobile, isTablet, isBrowser])

  return { isMobileOnly, isTablet, isBrowser, isMobile }
}