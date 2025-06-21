// src/components/StockTicker.tsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'

const SYMBOLS = [
  'AAPL','GOOGL','AMZN','MSFT','TSLA',
  'META','NVDA','AMD','INTC','JPM',
  'BAC','WMT','DIS','NFLX','CRM',
  'ORCL','SAP','XOM','CVX','PFE'
]
const POLL_INTERVAL = 10_000   // 10 seconds

// Finnhub /quote: c = current, pc = prev close, o = open
interface Quote { c: number; pc: number; o: number }

export default function StockTicker() {
  const [quotes, setQuotes] = useState<Record<string,Quote>>({})

  useEffect(() => {
    let mounted = true

    async function fetchAll() {
      const results: Record<string,Quote> = {}
      await Promise.all(
        SYMBOLS.map(async sym => {
          const res = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${sym}&token=${import.meta.env.FINNHUB_API_KEY}`
          )
          if (!mounted) return
          if (res.ok) {
            const data = await res.json()
            // only keep if data has open price
            if (data.o) results[sym] = data
          }
        })
      )
      if (mounted) setQuotes(results)
    }

    fetchAll()
    const timer = setInterval(fetchAll, POLL_INTERVAL)
    return () => { mounted = false; clearInterval(timer) }
  }, [])

  // duplicate for seamless scroll
  const items = [...SYMBOLS, ...SYMBOLS]

  return (
    <div className="w-full overflow-hidden bg-neutral-50 py-2 mb-6 rounded-lg">
      <motion.div
        className="inline-flex items-center space-x-8"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 120, ease: 'linear', repeat: Infinity }}
      >
        {items.map((sym, idx) => {
          const q = quotes[sym]
          // if we have open price, compute percent change
          const pct = q ? ((q.c - q.o) / q.o) * 100 : 0
          const up = pct >= 0

          return (
            <div
              key={idx}
              className="flex items-center space-x-1 min-w-[180px] px-2"
            >
              {/* symbol */}
              <span className="font-semibold">{sym}</span>

              {q ? (
                <>
                  {/* current price */}
                  <span className={`font-medium ${up ? 'text-green-600' : 'text-red-600'}`}>
                    {q.c.toFixed(2)}
                  </span>
                  {/* arrow */}
                  {up
                    ? <ChevronUp className="w-4 h-4 text-green-600" />
                    : <ChevronDown className="w-4 h-4 text-red-600" />
                  }
                  {/* percent from open */}
                  <span className={`text-sm ${up ? 'text-green-600' : 'text-red-600'}`}>
                    {up ? '+' : ''}{pct.toFixed(2)}%
                  </span>
                </>
              ) : (
                <span className="text-gray-400">--</span>
              )}
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
