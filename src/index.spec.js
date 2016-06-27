import { getlyrics } from '.'
import { typeov } from 'typeov'
import tap from 'tap'
const describe = tap.test
describe('getlyrics', i => {
  const it = i.test

  it('fetchTracksByQuery', async t => {
    await getlyrics.fetchTracksByQuery('Chet Faker - Gold', obj => {
      t.equal(typeov(obj), 'object')
      t.equal(typeov(obj.message), 'object')
      t.equal(typeov(obj.message.body), 'object')
      t.end()
    })
  })

  it('parseMessageBody', async t => {
    const tracks = await getlyrics.fetchTracksByQuery('Chet Faker - Gold', getlyrics.parseMessageBody)
    t.equal(typeov(tracks), 'object', 'parses a query')
  })

  it('parseTracks', async t => {
    const tracks = getlyrics.parseTracks({
      track_list: []
    })
    t.equal(typeov(tracks), 'array')
  })

  it('getTracksWithLyrics', async t => {
    const tracks = [{
      track: {
        track_id: 68151731,
        has_lyrics: 1
      }
    }]
    const filteredTracks = getlyrics.getTracksWithLyrics(tracks)
    t.equal(filteredTracks.length, 1, 'returns only the first result')
    t.end()
  })

  it('parseTrackIdFromTrack', async t => {
    t.equal(getlyrics.parseTrackIdFromTrack({ track: { track_id: 68151731 }}), 68151731)
    t.end()
  })

  it('fetchLyricsWithTrackId', async t => {
    const response = await getlyrics.fetchLyricsByTrackId(68151731)
    t.equal(response.message.body.lyrics.lyrics_body,
      'You gotta know, I\'m feeling love\nMade of gold, I never loved a\nAnother one, another you\nIt\'s gotta be love I said it\n\nYou gotta know, I\'m feeling love\nYou gotta know, I\'m feeling love\n\nYou gotta know, I\'m feeling love\nMade of gold, I never loved a\nAnother one, another you\nIt\'s gotta be love I said it\n\nI might as well be in a garden\nI said, ah\nA smell in the air is a dripping rose (you could be the one for me)\nAnother soul to meet my void then\nOf anything bare that\'s made of gold\n\nA physical kiss is nothing without it\nAnd you close your eyes to see what it\'s done\nThe body that lies is built up on looking\nCause all that remains before it\'s begun\n\nYou gotta know, I\'m feeling love\nMade of gold, I never loved a\nAnother one, another you\nIt\'s gotta be love, I said it\n\nYou gotta know, I\'m feeling love\nMade of gold, I never loved a\nAnother one, another you\nIt\'s gotta be love, I said it\n\nA heart will swell before it\'s hardened\nWith the flick of the hair, it can make you old\nAnother hole to dig my soul in\nI\'ll leave anything bare that keeps me soul\n\nAphysical kiss is nothing without it\nAnd you close your eyes to see what it\'s done\nThe body that lies is built up on looking\nCause all that remains before it\'s begun\n\nYou gotta know, I\'m feeling love\nMade of gold, I never loved a\nAnother one, another you\nIt\'s gotta be love, I said it\n\nYou gotta know, I\'m feeling love\nMade of gold, I never loved a\nAnother one, another you\nIt\'s gotta be love, I said it\n\nYou gotta know, I\'m feeling love\nMade of gold, I never loved a\nAnother one, another you\nIt\'s gotta be love, I said it',
      'gets lyrics with a track id')
    t.end()
  })

  i.end()
})
