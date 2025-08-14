import Head from 'next/head'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [countdownText, setCountdownText] = useState('')
  const [isTimezoneReady, setIsTimezoneReady] = useState(false)
  useEffect(() => {
    // Load external scripts
    const loadScript = (src, integrity = null, crossorigin = null) => {
      const script = document.createElement('script')
      script.src = src
      if (integrity) script.integrity = integrity
      if (crossorigin) script.crossOrigin = crossorigin
      document.body.appendChild(script)
      return script
    }

    // Load all the required scripts
    loadScript('https://unpkg.com/@strudel/embed@latest')
    loadScript('https://unpkg.com/@strudel/repl@latest')
    loadScript('https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js')
    loadScript('https://cdn.jsdelivr.net/npm/keen-slider@6.8.5/keen-slider.min.js')
    loadScript('https://cdn.jsdelivr.net/npm/simple-notify/dist/simple-notify.min.js')
    loadScript(
      'https://cdn.jsdelivr.net/npm/@marqueefy/marqueefy@1.0.3/dist/js/marqueefy.min.js',
      'sha384-GkNdpzZA0aigYQs7bhB94ikrs1rxyzcoGZqE/KBxsvvsQPERiMHw4vrDlCgDewnu',
      'anonymous'
    )
    loadScript('https://unpkg.com/countdown@2.6.0/countdown.min.js')

    // Wait for scripts to load before initializing
    const timer = setTimeout(() => {
      initializeCountdown()
      initializeMarqueefy()
    }, 2000)

    return () => clearTimeout(timer)
  }, [isTimezoneReady])

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

      // Always get timezone info, even if countdown library isn't loaded
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      if (typeof window !== 'undefined' && window.countdown) {
        const units = window.countdown.DAYS | window.countdown.HOURS | window.countdown.MINUTES | window.countdown.SECONDS
        const ts = window.countdown(now, targetDate, units)

        let countdownString = ""
        if (ts.value > 0) {
          countdownString = "REMIX CHALLENGE ENDS IN: "
          if (ts.days) countdownString += `${ts.days} days, `
          if (ts.hours) countdownString += `${ts.hours} hours, `
          if (ts.minutes) countdownString += `${ts.minutes} minutes, `
          if (ts.seconds) countdownString += `${ts.seconds} seconds`

          if (countdownString.endsWith(', ')) {
            countdownString = countdownString.slice(0, -2)
          }
          countdownString += ` (in your timezone: ${userTimezone})`
        } else {
          countdownString = "REMIX CHALLENGE HAS ENDED!"
        }

        setCountdownText(countdownString)
      } else {
        // Fallback if countdown library doesn't load
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

      if (!isTimezoneReady) {
        setIsTimezoneReady(true)
      }
    }

    const countdownInterval = setInterval(updateCountdown, 1000)
    updateCountdown()
  }

  const initializeMarqueefy = () => {
    if (typeof window !== 'undefined' && window.marqueefy) {
      const marqueefyElement = document.getElementById('example3')
      if (marqueefyElement) {
        try {
          new window.marqueefy.Marqueefy(marqueefyElement, {direction: 'left', speed: 50})
        } catch (error) {
          console.log('Marqueefy initialization error:', error)
        }
      }
    }
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
      </Head>

      <div className="bg-pink-500 heropattern-pianoman-red-100/50 min-h-screen flex flex-col items-center justify-center"
      >
        {/* Marquee Banner */}
        <div 
          className="marqueefy w-full border-4 border-dashed px-5 mb-8" 
          id="example3"
          data-mq-speed="100"
          style={{
            height: '75px',
            width: '75%',
            backgroundColor: 'rgba(128, 128, 128, 0.1)'
          }}
        >
          <div className="content flex items-center justify-center h-full">
            <span id="countdown-display" className="font-bold text-black uppercase text-2xl">
              {isTimezoneReady ? countdownText : 'Loading...'}
            </span>
          </div>
        </div>

        {/* Hack Club Flag */}
        <a href="http://hackclub.com" className="absolute top-0 left-0 right-20">
          <img src="/flag.svg" alt="Hack Club" />
        </a>

        {/* Description Section */}
        <section className="w-full max-w-3xl mx-auto items-center mt-16">
          <p className="text-gray-800 font-bold text-center text-2xl md:text-3xl mb-4"
             style={{fontFamily: "'Bitcount Grid Double', monospace"}}>
            Start Making Music Now! 🎵
          </p>
          <p className="text-center mt-4 border-4 border-gray-800 rounded-lg p-4 text-gray-800 md:text-xl leading-relaxed bg-white">
            <span className="font-bold">Just click PLAY ▶️ and Strudel Repl Logo below to get started!</span> Change notes, add
            effects, or swap instruments. When you're done, submit your remix to win exclusive stickers and get featured in a showcase!
          </p>
        </section>

        {/* Main Content */}
        <section className="w-full max-w-max mx-auto mt-4 mb-4 p-6 flex flex-col md:flex-row items-center justify-center gap-4">
          <img src="/logo.svg" alt="Remix Logo" className="w-96 h-64" />

          <main id="strudel" className="flex rounded-lg flex-col items-center justify-center">
            <div className="iframe-container">
              <iframe
                src="https://strudel.cc/#Ly8gQ2xpY2sgUExBWSDigLYgYW5kIHN0YXJ0IHJlbWl4aW5nIQoKc2V0Y3BzKDEpIC8vIFRlbXBvOiBUcnkgMC44IChmb3Igc2xvd2VyKSBvciAxLjIgKGZvciBmYXN0ZXIpCgpzdGFjaygKICAvLyBNQUlOIE1FTE9EWSAtIFRyeSBjaGFuZ2luZyB0aGUgbnVtYmVycyEKICBuKCI8MCAzIDUgNyAzIDUgMiAwPiIpLnNjYWxlKCdHNCBtaW5vcicpCiAgICAucygiZ21fZWxlY3RyaWNfcGlhbm9fMSIpCiAgICAuZ2FpbigwLjYpLAoKICAvLyBEUlVNUyAtIENoYW5nZSAiYmQgaGggc2QgaGgiIGZvciBkaWZmZXJlbnQgYmVhdHMhCiAgc291bmQoImJkIGhoIHNkIGhoIiksCgogIC8vIEJBU1MgLSBUcnkgZGlmZmVyZW50IG5vdGVzOiAiZzIgZDIgYzIgZzIiCiAgbm90ZSgiZzIgZDIgYzIgZzIiKQogICAgLnMoImdtX2Fjb3VzdGljX2Jhc3MiKQogICAgLmdhaW4oMS4xKQopCgovLyBFeHBlcmltZW50ISBUcnkgY2hhbmdpbmcgbnVtYmVycywgbm90ZXMsIG9yIHNvdW5kcyBhYm92ZS4KLy8gV2hlbiB5b3UncmUgaGFwcHksIGNsaWNrIFNIQVJFIGFuZCBzdWJtaXQgeW91ciBsaW5rIQ=="
                width="600"
                height="300"
                className="rounded-lg shadow-lg"
                title="Strudel Live Editor"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Buttons */}
            <section className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                type="button"
                className="w-48 h-16 bg-white text-lg font-bold text-gray-900 px-5 py-2.5 rounded-lg hover:bg-gray-100 shadow-md transform hover:scale-105 transition-transform"
                onClick={() => window.open('https://forms.hackclub.com/t/vhWBAyQzKrus', '_blank')}
              >
                Submit Remix
              </button>
              <button
                type="button"
                className="w-48 h-16 bg-white text-lg text-gray-900 px-5 py-2.5 rounded-lg hover:bg-gray-100 shadow-md"
                onClick={() => window.open('https://join.slack.com/t/hackclub/shared_invite/zt-397pq8tdt-51gfblwFerWsRWtwFV0xCg', '_blank')}
              >
                Need Help?
              </button>
            </section>
          </main>
        </section>
      </div>
    </>
  )
}