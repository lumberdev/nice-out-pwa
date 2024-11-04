import { useEffect, useState } from 'react'
import IosShare from '../../assets/svg/ui/iosShare.svg'
import { useDeviceAndVersion } from '@/utils/useDeviceAndVersion'
const CustomPrompt = () => {
  const { isStandalone, isValidOS } = useDeviceAndVersion()
  const [showPrompt, setShowPrompt] = useState<null | boolean>(false)
  const [animateUp, setAnimateUp] = useState<null | boolean>(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timeout = setTimeout(() => {
        setShowPrompt(true)
      }, 3000) // wait 3 seconds to show the prompt
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [])

  const handleClose = () => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        setShowPrompt(false)
      }, 1500)
      setAnimateUp(false)
    }
  }

  return (
    !isStandalone &&
    isValidOS &&
    showPrompt && (
      <div
        className={`fixed bottom-0 left-2/4 z-[1000] flex h-fit w-full max-w-[500px] -translate-x-2/4 ${animateUp ? 'animate-[slide-up-prompt_1.5s_ease-in-out_forwards]' : 'animate-[slide-down-prompt_1s_ease-in-out_forwards]'} items-center justify-center bg-black bg-opacity-0`}
      >
        <div className="w-100 rounded-t-lg bg-gray-900 p-4 text-white shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Add to Home Screen</h2>
            <button
              onClick={handleClose}
              className="text-blue-400 hover:text-blue-600"
            >
              Close
            </button>
          </div>
          <div className="text-gray-500">
            <hr className="mb-4 border-gray-700" />
            <p className="mb-4 px-8 text-center text-sm">
              This website has app functionality. Add it to your home screen to
              use it in fullscreen.
            </p>
            <hr className="mb-4 border-gray-700" />
            <div className="mb-2 flex items-center gap-2">
              <div className="relative rounded-full p-2 text-blue-400">
                <IosShare />
              </div>
              <p className="text-sm">1) Press the &apos;Share&apos; button</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative rounded-full p-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    fill="none"
                    stroke="#fff"
                  />
                  <path
                    d="M12 8v4m0 0v4m0-4h4m-4 0H8"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-sm">2) Press Add to Home Screen</p>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default CustomPrompt
