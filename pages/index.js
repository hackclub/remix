import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import FaqDialog from '../components/FaqDialog';

export default function Home() {
  const [countdownText, setCountdownText] = useState('')
  const [isTimezoneReady, setIsTimezoneReady] = useState(false)
  const [showFaqDialog, setShowFaqDialog] = useState(false)
  const marqueefyInitialized = useRef(false)

  const onToggleFaqDialog = () => {
    setShowFaqDialog((value) => !value)
  }

  useEffect(() => {
    const loadScript = (src, integrity = null, crossorigin = null) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        if (integrity) script.integrity = integrity
        if (crossorigin) script.crossOrigin = crossorigin
        script.onload = () => resolve(script)
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
        document.body.appendChild(script)
      })
    }

    const loadScripts = async () => {
      try {
        await Promise.all([
          loadScript('https://unpkg.com/@strudel/embed@latest'),
          loadScript('https://unpkg.com/@strudel/repl@latest'),
          loadScript('https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js'),
          loadScript('https://cdn.jsdelivr.net/npm/keen-slider@6.8.5/keen-slider.min.js'),
          loadScript('https://cdn.jsdelivr.net/npm/simple-notify/dist/simple-notify.min.js'),
          loadScript(
            'https://cdn.jsdelivr.net/npm/@marqueefy/marqueefy@1.0.3/dist/js/marqueefy.min.js',
            'sha384-GkNdpzZA0aigYQs7bhB94ikrs1rxyzcoGZqE/KBxsvvsQPERiMHw4vrDlCgDewnu',
            'anonymous'
          ),
          loadScript('https://unpkg.com/countdown@2.6.0/countdown.min.js')
        ])

        initializeCountdown()
        initializeMarqueefy()
      } catch (error) {
        console.error('Error loading scripts:', error)
      }
    }

    loadScripts()

    return () => {
      marqueefyInitialized.current = false
    }
  }, [])

  const initializeCountdown = () => {
    function updateCountdown() {
      const now = new Date()
      let targetDate = new Date()
      targetDate.setHours(12, 59, 0, 0) // Set time to 12:59 PM on the current day.

      const dayOfWeek = now.getDay() // 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat
      const targetDay = 5 // Friday

      let daysUntilTarget = (targetDay - dayOfWeek + 7) % 7

      // If it's Friday and past 12:59, the target is next Friday.
      if (dayOfWeek === targetDay && now.getTime() > targetDate.getTime()) {
        daysUntilTarget = 7
      }

      targetDate.setDate(now.getDate() + daysUntilTarget)

      // Always get timezone info
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Use fallback countdown calculation only
      const timeDiff = targetDate.getTime() - now.getTime()
      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

        let countdownString = "REMIX CHALLENGE ENDS IN: "
        if (days) countdownString += `${days} days, `
        if (hours) countdownString += `${hours} hours, `
        if (minutes) countdownString += `${minutes} minutes, `
        if (seconds) countdownString += `${seconds} seconds`

        if (countdownString.endsWith(', ')) {
          countdownString = countdownString.slice(0, -2)
        }
        countdownString += ` (in your timezone: ${userTimezone})`
        setCountdownText(countdownString)
      } else {
        setCountdownText("REMIX CHALLENGE HAS ENDED!")
      }

    }

    updateCountdown()
    setIsTimezoneReady(true)
    setInterval(updateCountdown, 1000)
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="theme-color" content="#000000"/>
        <title>YSWS - Remix</title>
        <meta name="description"
              content="Join the HackClub Remix Challenge! Creatively remix a Strudel beat. Submit your unique sound today!"/>

        <link rel="icon" href="/logo.svg" type="image/svg+xml"/>

        <meta property="og:image" content="/logo.svg"/>
        <meta property="og:image:type" content="image/svg+xml"/>
        <meta property="og:image:alt" content="Site logo"/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content="/logo.svg"/>

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Bitcount+Grid+Double:wght@100..900&display=swap"
              rel="stylesheet"/>
        <link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet"/>
        <link rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/keen-slider@6.8.5/keen-slider.min.css"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simple-notify/dist/simple-notify.css"/>
        <link rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/@marqueefy/marqueefy@1.0.3/dist/css/marqueefy.min.css"
              integrity="sha384-wADgvhAqbORDLWCl6LHRmwaldDxcsCZJ9EfC4tyLmlqRSrxK8SQSmUprPJYdtCZb"
              crossOrigin="anonymous"/>
        <link rel="stylesheet" href="https://unpkg.com/rc-dialog@9.6.0/assets/index.css"/>
      </Head>

      <div className="bg-pink-500 heropattern-pianoman-red-100/50 min-h-screen flex flex-col"
      >
        {/* Marquee Banner - Fixed at top */}
        {/*<div*/}
        {/*  className="marqueefy w-full border-y-4 border-dashed px-5 py-6"*/}
        {/*  id="example3"*/}
        {/*  style={{*/}
        {/*    backgroundColor: 'rgba(128, 128, 128, 0.1)'*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <div className="content flex items-center justify-center h-full">*/}
        {/*    <span className="text-white text-3xl md:text-5xl font-bold">REMIX CHALLENGE</span>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Hack Club Flag */}
        <div className="fixed top-0 left-0 z-50 overflow-hidden">
          <a
              href="https://hackclub.com"
              target="_blank"
              rel="noopener noreferrer"
              width="30%"
              className="block transition-transform hover:scale-105"
          >
              <img src="/flag.svg" alt="Hack Club Flag" className="w-full h-full object-contain"/>
          </a>
            {/* Info Button - Top Right */}
            <button
                type="button"
                onClick={onToggleFaqDialog}
                className="fixed top-4 right-4 z-50 px-6 py-3 bg-white text-gray-900 rounded-full shadow-lg hover:bg-gray-100 transition-transform hover:scale-110 flex items-center justify-center font-bold text-xl border-4 border-gray-800"
                aria-label="Open FAQ"
            >
                FAQ
            </button>
        </div>



        {/* FAQ Dialog */}
        <FaqDialog visible={showFaqDialog} onClose={onToggleFaqDialog} />

        {/* Content Container */}
        <div className="flex-1 flex flex-col items-center justify-center py-8 px-4">
          {/* Description Section */}
          <section className="w-full max-w-5xl mx-auto items-center mb-12">
            <p className="text-gray-800 font-bold text-center text-3xl md:text-5xl mb-6"
               style={{fontFamily: "'Bitcount Grid Double', monospace"}}>
              Start Making Music Now! 🎵
            </p>
            <p className="text-center border-4 border-gray-800 rounded-lg p-6 text-gray-800 text-xl md:text-2xl leading-relaxed bg-white">
              <span className="font-bold">Just click PLAY ▶️ and Strudel Repl Logo below to get started!</span> Change notes, add
              effects, or swap instruments. When you're done, submit your remix to win one month of <strong>Apple Music</strong>, <strong>Spotify Premium</strong>, or <strong>SoundCloud Pro</strong>!
            </p>
          </section>

          {/* Main Content */}
          <section className="w-full max-w-7xl mx-auto px-4 mb-8 flex flex-col lg:flex-row items-center justify-center gap-8">
          <img src="/logo.svg" alt="Remix Logo" className="w-full max-w-lg h-auto" />

          <main id="strudel" className="flex rounded-lg flex-col items-center justify-center w-full">
            <div className="iframe-container w-full">
              <iframe
                src="https://strudel.cc/#Ly8gQ2xpY2sgUExBWSDigLYgYW5kIHN0YXJ0IHJlbWl4aW5nIQoKc2V0Y3BzKDEpIC8vIFRlbXBvOiBUcnkgMC44IChmb3Igc2xvd2VyKSBvciAxLjIgKGZvciBmYXN0ZXIpCgpzdGFjaygKICAvLyBNQUlOIE1FTE9EWSAtIFRyeSBjaGFuZ2luZyB0aGUgbnVtYmVycyEKICBuKCI8MCAzIDUgNyAzIDUgMiAwPiIpLnNjYWxlKCdHNCBtaW5vcicpCiAgICAucygiZ21fZWxlY3RyaWNfcGlhbm9fMSIpCiAgICAuZ2FpbigwLjYpLAoKICAvLyBEUlVNUyAtIENoYW5nZSAiYmQgaGggc2QgaGgiIGZvciBkaWZmZXJlbnQgYmVhdHMhCiAgc291bmQoImJkIGhoIHNkIGhoIiksCgogIC8vIEJBU1MgLSBUcnkgZGlmZmVyZW50IG5vdGVzOiAiZzIgZDIgYzIgZzIiCiAgbm90ZSgiZzIgZDIgYzIgZzIiKQogICAgLnMoImdtX2Fjb3VzdGljX2Jhc3MiKQogICAgLmdhaW4oMS4xKQopCgovLyBFeHBlcmltZW50ISBUcnkgY2hhbmdpbmcgbnVtYmVycywgbm90ZXMsIG9yIHNvdW5kcyBhYm92ZS4KLy8gV2hlbiB5b3UncmUgaGFwcHksIGNsaWNrIFNIQVJFIGFuZCBzdWJtaXQgeW91ciBsaW5rIQ=="
                width="100%"
                height="400"
                className="rounded-lg shadow-lg max-w-3xl"
                title="Strudel Live Editor"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Buttons */}
            <section className="flex flex-col sm:flex-row gap-6 mt-8">
              <button
                type="button"
                className="w-56 h-20 bg-white text-xl font-bold text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 shadow-md transform hover:scale-105 transition-transform"
                onClick={() => window.open('https://forms.hackclub.com/t/vhWBAyQzKrus', '_blank')}
              >
                Submit Remix
              </button>
              {/*<Link href="/projects" prefetch={true}>*/}
              {/*  <button*/}
              {/*    type="button"*/}
              {/*    className="w-56 h-20 bg-white text-xl font-bold text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 shadow-md transform hover:scale-105 transition-transform"*/}
              {/*  >*/}
              {/*    View Projects*/}
              {/*  </button>*/}
              {/*</Link>*/}
              <button
                type="button"
                className="w-56 h-20 bg-white text-xl font-bold text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 shadow-md transform hover:scale-105 transition-transform"
                onClick={() => window.open('https://join.slack.com/t/hackclub/shared_invite/zt-397pq8tdt-51gfblwFerWsRWtwFV0xCg', '_blank')}
              >
                Need Help?
              </button>
            </section>
          </main>
          </section>
        </div>
      </div>
    </>
  )
}