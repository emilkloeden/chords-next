import { Fragment } from "react/cjs/react.production.min"
import { knownChords } from "../utils/chords"
import songStyles from "../styles/song.module.css"

export const parseChords = (songText) => {
    const keys = Array.from(knownChords.keys())
    const lines = songText.split("\n")
    const processed = lines.map(line => {
      const tokens = line.split(/\s/).filter(a=>a) // strip out the ''s
      const isChords = tokens.every(token => keys.includes(token))
      if (isChords) {
        line = line.replace((/([^\s]+)/gi), (_, capture1) => knownChords.get(capture1))
      }
      return line
    }).join("\n")
    return processed
  }

  export const isChordLine = (line) => {
    const keys = Array.from(knownChords.keys())

    const tokens = line.split(/\s/).filter(a=>a) // strip out the ''s
    return tokens.every(token => keys.includes(token))
  }
  
function ChordLine({line}) {
    const chordData = buildChordObject(line)


    return (
        <>
            {chordData.map((chordDatum, i) => {
                const spaces = ' '.repeat(chordDatum.precedingSpaces)
        return (
        <Fragment key={i}>
            {spaces}
            <span key={chordDatum.index} className={songStyles.chord} data-finger-positioning={knownChords.get(chordDatum.chord)}>{chordDatum.chord}</span>
        
        </Fragment>)
    })}
    {`\n`}
    </>
    )
}

function buildChordObject(line) {
    const nonSpaceRegex = /[^\s]+/g
    const matches = [...line.matchAll(nonSpaceRegex)]
    let firstSpace = 0
    const chordData = matches.map((match, i) => {
        return {
            index: i,
            start: match.index,
            end: match.index + match[0].length,
            chord: match[0]
        }
    })

    for (const chordDatum of chordData) {
        chordDatum.precedingSpaces = chordDatum.start - firstSpace
        firstSpace = chordDatum.end
    }
    return chordData
}

function TextLine({line}) {
    return (
        <>{`${line}\n`}</>
    )
}

export default function Song ({song}) {
    return (
        <pre className={songStyles.song}>
            {song.split("\n").map((line, i) => {
                return isChordLine(line) ? <ChordLine key={i} line={line} /> : <TextLine key={i} line={line} />
            })}
        </pre>
    )
}