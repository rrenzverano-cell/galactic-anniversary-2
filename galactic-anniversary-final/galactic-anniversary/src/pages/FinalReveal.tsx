import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'

// The letter is split into 7 sections for progressive reveal
const LETTER_SECTIONS = [
  {
    label: 'I.',
    lines: [
      'Alinah Joyce V. Francisco',
      '',
      'Una sa lahat, ang layo na talaga ng narating natin.',
      '',
      'Sometimes, I look back and I still can\'t believe na nagsimula lang tayo sa isang simpleng follow sa Mobile Legends: Bang Bang.',
      '',
      'After mo akong i-follow sa MLBB, nag-talking stage kaagad tayo. Hinihintay pa talaga kitang mag-online kasi curious na curious ako tungkol sa\'yo. Hindi ko alam noon kung saan tayo dadalhin ng mga conversations natin, pero somehow, every little talk made me want to know you more.',
      '',
      'Then, after many random scenarios, nag-add-add tayo sa Instagram, and doon na tayo mas nagkaroon ng mas maraming conversations.',
    ],
  },
  {
    label: 'II.',
    lines: [
      'Unti-unti, nakilala natin ang isa\'t isa.',
      '',
      'You told me about your past, including your breakup with your ex. I learned about your insecurities, your strengths, your weaknesses, your little habits, your favorite things, and even the things you were afraid to show.',
      '',
      'And somewhere along the way, nagkaroon tayo ng misunderstandings. Nag-away. Nagkaroon ng tampuhan. May moments na parang gusto na nating sumuko.',
      '',
      'Pero somehow...',
      '',
      'we stayed.',
      '',
      'And I think that\'s one of the things I will always be thankful for. Because loving someone isn\'t just about the happy moments. It\'s also about choosing to stay when things become difficult.',
    ],
  },
  {
    label: 'III.',
    lines: [
      'Fast forward to the time na nagkaroon na tayo ng feelings sa isa\'t isa... nalaman natin na crush pala natin ang isa\'t isa through that Truth or Dare game. 🥲',
      '',
      'At ang nakakatawa, sinabi ko pa noon na hindi ako pupunta sa kasal mo someday.',
      '',
      '🥲',
      '',
      'Eh gusto ko pala ako yung ikakasal sa\'yo. Kaya kahit i-invite mo pa ako, hindi ako pupunta. Bakit? Kasi dapat ako yung nasa altar kasama mo. 😂❤️',
      '',
      'At that time, Ella pa ang tawag ko sa\'yo because you were still hiding your identity from me.',
      '',
      'But then one day, nawala ka gamit yung photo ng kapatid mo na sinend mo sa akin. Hinanap talaga kita. Hindi dahil gusto lang kitang mahanap. Nag-worry ako.',
      '',
      'Napaisip ako kung okay ba kayo after ng bagyo.',
      '',
      'And because of that worry and curiosity, I kept looking until I found you.',
    ],
  },
  {
    label: 'IV.',
    lines: [
      'Then I asked you: "Francisco ba last name mo?" And nag-send pa ako ng photo. 😂',
      '',
      'You were shocked. And that\'s also when I started seeing the insecurities you were carrying. Maybe you thought I would judge you. But I didn\'t. I just wanted you to calm down and realize that you didn\'t need to hide from me.',
      '',
      'Then I learned that Joyce pala ang second name mo. And eventually, I learned your beautiful full name:',
      '',
      'Alinah Joyce V. Francisco.',
      '',
      'I still remember that.',
      '',
      'And honestly? Ang ganda pala ng pangalan mo... pero mas maganda yung taong may pangalan na iyon. 🥰',
      '',
      'Tapos naalala ko pa yung time na mali yung napili kong photo. Pinsan mo pala. 😂 Nagtampo ka pa sa akin. Pero nag-explain naman ako na hindi ko talaga alam. Nanghuhula lang ako.',
      '',
      'Pero alam mo ba? Kahit mali-mali ang picks ko noon, ang goal ko talaga ay isa-isahin hanggang mahanap ko yung tunay na ikaw. And when I finally knew who you really were... kinilig ako. 🥰',
      '',
      'Because suddenly, the person I had been talking to wasn\'t just a random person behind a screen anymore. It was you.',
    ],
  },
  {
    label: 'V.',
    lines: [
      'Then came the many little things.',
      '',
      'Nalaman ko ang favorite songs mo. Favorite foods mo. Family mo. Places mo. Stories mo. Habits mo. Your happiness. Your sadness. Your fears.',
      '',
      'And eventually, even the parts of you that you thought were too difficult to love.',
      '',
      'I got to know you little by little. And somehow... I fell deeper.',
      '',
      'Then came more memories. Our MLBB duos. Our late-night talks. Our tawanan. Our iyakan. Our lambingan. Our awkward moments. Our random conversations na tayo lang ang nakakaintindi.',
      '',
      'Our birthdays. Our New Year celebrations. All those ordinary little moments that somehow became some of my favorite memories.',
      '',
      'I even went through surgery. And then came the result sa Nursing. And honestly, I know there were times na hindi kita na-comfort nang maayos. I know I could have done better. And I\'m sorry for the moments na kailangan mo ako pero hindi ko naibigay agad yung comfort na deserve mo.',
      '',
      'But even after all those moments... we\'re still here. That\'s what makes our story special to me. Hindi dahil perfect tayo. We are far from perfect. But because every time something tried to break us apart... we found a reason to come back to each other.',
      '',
      'Kapag nag-aaway tayo, somehow, pinipili pa rin nating magbati. Pinipili nating ayusin. Pinipili nating pag-usapan. Pinipili nating intindihin ang isa\'t isa.',
    ],
  },
  {
    label: 'VI.',
    lines: [
      'Wah... Lagi na lang kita naiisip. Minsan, parang kailangan kita. Kailangan ko yung warmth mo. Kailangan ko yung attention mo. Kailangan ko yung lambing mo. Kailangan ko yung presence mo.',
      '',
      'And kahit magkalayo tayo... there are moments when it doesn\'t even feel like we\'re far apart. Parang naka-hug lang tayo. Parang nandiyan ka lang.',
      '',
      'Because behind every tampuhan, every misunderstanding, and every quiet moment... we both know that we miss each other. We crave each other\'s warmth. We crave each other\'s presence. We crave that feeling of being understood.',
      '',
      'Wah. Kahit sensitive ka po, nakaka-cute ka talaga. Gusto kitang inisin minsan. ☺️',
      '',
      'Pero honestly... I love every little part of you. Even the parts that you think are flaws. Even the parts you are insecure about. Even the moods. Even the tampuhan. Even the pagiging sensitive mo. Even the days when you don\'t feel lovable.',
      '',
      'Because I want you to remember something:',
      '',
      'You don\'t have to be perfect to be loved by me. You just have to be you.',
      '',
      'At ngayon... Nasa college na tayo. Panibagong chapter na naman.',
      '',
      'And I know this part of our story won\'t always be easy. Nahihirapan pa tayong mag-adjust sa college life. We have studies. Deadlines. Responsibilities. Pressure. Personal problems. And a relationship that still needs time, effort, patience, and understanding.',
      '',
      'But please remember this:',
      '',
      'A hard day does not mean you\'re failing. Being tired does not mean you\'re weak. Making mistakes does not mean you\'re incapable. And struggling does not mean you\'re losing.',
      '',
      'Sometimes, you\'re simply growing.',
    ],
  },
  {
    label: 'VII.',
    lines: [
      'So let\'s promise each other something.',
      '',
      'When life gets hard, we don\'t disappear. We communicate. We understand. We adjust. We support. We rest when we need to. Then we continue.',
      '',
      'Because we don\'t need to have everything figured out right now. We just need to keep moving. One step at a time. One day at a time. One challenge at a time.',
      '',
      'And langga... After all the things we\'ve been through, there is something I want you to know.',
      '',
      'There are probably thousands of words I could use to describe how much you mean to me. But none of them would ever feel enough. Because what we have is bigger than one message.',
      '',
      'It\'s in the memories. It\'s in the late-night talks. It\'s in the random laughs. It\'s in the moments we cried. It\'s in the times we almost gave up. It\'s in every time we chose to stay.',
      '',
      'It\'s in every "ingat ka." Every "good morning." Every "good night." Every "miss na kita." Every "I love you." Every moment we waited for each other.',
      '',
      'And all those little things became our universe.',
      '',
      '— — —',
      '',
      'So today. August 23, 2026. 365 days. One whole year.',
      '',
      'One year of us. One year of being best friends. One year of learning each other. One year of loving each other. One year of hurting, healing, laughing, crying, forgiving, growing, and choosing each other again.',
      '',
      'And honestly... I\'m proud of us. I\'m proud that we made it this far.',
      '',
      'And maybe someday, when we\'re older, when college is already a memory, when we\'ve reached the dreams we\'re fighting for now, I hope we look back at this first year and say:',
      '',
      '"Buti na lang hindi tayo sumuko."',
      '',
      'Because that\'s what I want. I don\'t want our story to end at one year. I want this to be just the first chapter.',
      '',
      'I want more birthdays. More New Years. More late-night talks. More random arguments. More lambingan. More adventures. More memories. More dreams. More years.',
      '',
      'And hopefully... more moments where we can finally look at each other without a screen between us.',
      '',
      'Until that day comes, let\'s keep going. Let\'s keep fighting. Let\'s keep growing. Let\'s keep believing in ourselves. And let\'s keep choosing each other.',
      '',
      'Because no matter how many kilometers are between us... you will always have a place in my heart that no distance can reach.',
      '',
      'Alinah...',
      '',
      'Thank you for staying. Thank you for choosing me. Thank you for letting me know you. Thank you for trusting me with your heart. Thank you for becoming my best friend, my comfort, my happiness, and someone I can call my palangga.',
      '',
      'And if there is one thing I hope you remember from everything I\'ve written here, it is this:',
      '',
      'I am grateful that out of all the people in this huge universe, somehow, our paths crossed.',
      '',
      'From one random follow on MLBB... to late-night conversations... to secrets... to misunderstandings... to laughter... to tears... to love... we became us.',
      '',
      'And I wouldn\'t trade that story for anything.',
      '',
      '— — —',
      '',
      'Happy 1st Anniversary, langga.',
      '',
      'Happy 365 days to us.',
      '',
      'Happy 1 year to my best friend.',
      '',
      'I love you.',
      '',
      'And I hope that every time you look at the stars, you remember that somewhere under the same sky... someone is loving you, missing you, believing in you, and choosing you.',
      '',
      'Always.',
      '',
      'I love you, my palangga. ❤️🌌',
      '',
      'Happy 1st Anniversary to us.',
      '',
      'Our story has only just begun.',
    ],
  },
]

export const FinalReveal: React.FC = () => {
  const navigate = useNavigate()
  const { isChapterCompleted, state } = useGame()
  const [section, setSection] = useState(0)
  const [visible, setVisible] = useState(false)
  const [showPhoto, setShowPhoto] = useState(false)
  const [photoLoaded, setPhotoLoaded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isChapterCompleted(22)) {
      navigate('/chapter/22', { replace: true })
      return
    }
    const t = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(t)
  }, [isChapterCompleted, navigate])

  // Show photo before letter starts
  useEffect(() => {
    if (section === 0) {
      const t = setTimeout(() => setShowPhoto(true), 1000)
      return () => clearTimeout(t)
    }
  }, [section])

  const handleNext = () => {
    if (section < LETTER_SECTIONS.length - 1) {
      setSection(s => s + 1)
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const isLast = section === LETTER_SECTIONS.length - 1
  const current = LETTER_SECTIONS[section]

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 20, background: '#020214' }}>
      {/* Deep space background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/assets/backgrounds/deep-space.png')" }}
      />
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(2,2,20,0.6) 0%, rgba(2,2,20,0.80) 50%, rgba(2,2,20,0.97) 100%)',
        }}
      />

      {/* Scrollable content */}
      <div
        ref={contentRef}
        className="relative z-20 h-full overflow-y-auto"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.2s ease',
        }}
      >
        <div className="min-h-full flex flex-col items-center px-6 py-16">
          <div className="w-full max-w-md mx-auto">

            {/* Chapter 23 header */}
            <div className="text-center mb-12">
              <div
                className="font-ui text-xs tracking-[0.4em] uppercase mb-6"
                style={{ color: '#fbbf24', opacity: 0.7 }}
              >
                Chapter 23 · The Final Star
              </div>
              <div
                className="font-display text-6xl mb-4"
                style={{
                  color: '#f0f4ff',
                  textShadow: '0 0 60px rgba(251,191,36,0.4)',
                  lineHeight: 1,
                }}
              >
                ✦
              </div>
              <h1
                className="font-display mb-3 leading-tight"
                style={{
                  fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
                  color: '#f0f4ff',
                }}
              >
                OUT OF ALL THE PEOPLE<br />IN THIS HUGE UNIVERSE...
              </h1>
              <div
                className="font-ui text-xs tracking-[0.3em] uppercase mt-4"
                style={{ color: '#fbbf24', opacity: 0.6 }}
              >
                23 · 08 · 2026
              </div>
            </div>

            {/* Photo */}
            <div
              className="mb-14 flex justify-center"
              style={{
                opacity: showPhoto ? 1 : 0,
                transform: showPhoto ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 1.5s ease, transform 1.5s ease',
              }}
            >
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width: '100%',
                  maxWidth: '320px',
                  aspectRatio: '3/4',
                  boxShadow: '0 0 60px rgba(251,191,36,0.15), 0 0 120px rgba(196,181,253,0.08)',
                  border: '1px solid rgba(251,191,36,0.15)',
                }}
              >
                <img
                  src="/assets/photo/us.webp"
                  alt="Us"
                  className="w-full h-full object-cover"
                  onLoad={() => setPhotoLoaded(true)}
                  onError={() => setPhotoLoaded(false)}
                  style={{ display: photoLoaded ? 'block' : 'none' }}
                />
                {!photoLoaded && (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #1a1040 0%, #0a0a2e 100%)',
                    }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3" style={{ opacity: 0.3 }}>✦</div>
                      <p className="font-ui text-xs" style={{ color: '#475569' }}>
                        Add your photo to<br />/assets/photo/us.webp
                      </p>
                    </div>
                  </div>
                )}
                {/* Gold frame shimmer */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(251,191,36,0.06) 0%, transparent 50%, rgba(196,181,253,0.06) 100%)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>

            {/* Section divider */}
            <div className="flex items-center gap-3 mb-8 justify-center opacity-30">
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #fbbf24)' }} />
              <span style={{ color: '#fbbf24', fontSize: '8px' }}>✦</span>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, #fbbf24)' }} />
            </div>

            {/* Section label */}
            <div
              className="font-ui text-xs tracking-[0.3em] uppercase text-center mb-8"
              style={{ color: '#fbbf24', opacity: 0.5 }}
            >
              {current.label} of {LETTER_SECTIONS.length}
            </div>

            {/* Letter content */}
            <div
              key={section}
              className="space-y-1 mb-12"
              style={{ animation: 'cosmicReveal 0.8s ease-out forwards' }}
            >
              {current.lines.map((line, i) => {
                if (line === '— — —') {
                  return (
                    <div key={i} className="py-4 text-center">
                      <span style={{ color: '#4b5563', letterSpacing: '0.4em', fontSize: '12px' }}>— — —</span>
                    </div>
                  )
                }
                if (line === '') {
                  return <div key={i} style={{ height: '0.75rem' }} />
                }
                // Highlight certain important lines
                const isHighlight = [
                  'we stayed.',
                  'You don\'t have to be perfect to be loved by me. You just have to be you.',
                  '"Buti na lang hindi tayo sumuko."',
                  'I love you, my palangga. ❤️🌌',
                  'Happy 1st Anniversary, langga.',
                  'Our story has only just begun.',
                  'Alinah Joyce V. Francisco',
                  'Alinah...',
                  'Always.',
                ].includes(line)

                const isLargeQuote = [
                  'Alinah Joyce V. Francisco',
                  '"Buti na lang hindi tayo sumuko."',
                  'Always.',
                ].includes(line)

                return (
                  <p
                    key={i}
                    className={isLargeQuote ? 'font-display text-center py-2' : 'font-ui'}
                    style={{
                      fontSize: isLargeQuote
                        ? 'clamp(1.2rem, 4vw, 1.6rem)'
                        : 'clamp(0.9rem, 2.8vw, 1rem)',
                      color: isHighlight ? '#f0f4ff' : '#94a3b8',
                      lineHeight: isLargeQuote ? 1.3 : 1.8,
                      fontStyle: isLargeQuote ? 'italic' : 'normal',
                      textShadow: isHighlight ? '0 0 20px rgba(251,191,36,0.15)' : 'none',
                      animationDelay: `${i * 0.025}s`,
                    }}
                  >
                    {line}
                  </p>
                )
              })}
            </div>

            {/* Navigation */}
            {!isLast ? (
              <div className="text-center pb-8">
                <button
                  onClick={handleNext}
                  className="cosmic-btn cosmic-btn-primary"
                  style={{ maxWidth: '260px', margin: '0 auto' }}
                >
                  Continue reading →
                </button>
                <p className="font-ui text-xs mt-3" style={{ color: '#334155' }}>
                  {section + 1} of {LETTER_SECTIONS.length}
                </p>
              </div>
            ) : (
              <div className="text-center pb-16">
                {/* Final closing */}
                <div
                  className="mb-10"
                  style={{
                    animation: 'cosmicReveal 1.5s ease forwards',
                    animationDelay: '0.5s',
                    opacity: 0,
                  }}
                >
                  <div
                    className="text-5xl mb-6"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.6)) drop-shadow(0 0 50px rgba(196,181,253,0.3))',
                    }}
                  >
                    ✦
                  </div>
                  <div
                    className="font-display text-2xl mb-3"
                    style={{ color: '#fbbf24', fontStyle: 'italic' }}
                  >
                    Happy 1st Anniversary
                  </div>
                  <div
                    className="font-ui text-sm tracking-widest"
                    style={{ color: '#64748b' }}
                  >
                    23 · 08 · 2026
                  </div>
                </div>

                <button
                  onClick={() => navigate('/')}
                  className="cosmic-btn"
                  style={{ maxWidth: '260px', margin: '0 auto', color: '#475569', borderColor: '#1e293b' }}
                >
                  Return to the stars
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Music note (floating) */}
      {state.musicEnabled && (
        <div
          className="fixed bottom-6 right-6 z-40 font-ui text-xs"
          style={{ color: '#fbbf24', opacity: 0.4, animation: 'float 4s ease-in-out infinite' }}
        >
          ♪
        </div>
      )}
    </div>
  )
}
