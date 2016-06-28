import { GetLyrics } from '.'
import { typeov } from 'typeov'
import tap from 'tap'
const test = tap.test

test('for', t => {
  const getlyrics = new GetLyrics
  t.equal(typeov(getlyrics.for), 'function', 'is a function')
  t.equal(typeov(getlyrics.for.prototype), 'undefined', 'is bound')
  t.equal(getlyrics.for.name, 'bound getThoseMotherEffingLyrics', 'is bound correctly')
  t.end()
})

test('to', t => {
  const getlyrics = new GetLyrics
  t.equal(typeov(getlyrics.to), 'function', 'is a function')
  t.equal(typeov(getlyrics.to.prototype), 'undefined', 'is bound')
  t.equal(getlyrics.to.name, 'bound getThoseMotherEffingLyrics', 'is bound correctly')
  t.end()
})

test('of', t => {
  const getlyrics = new GetLyrics
  t.equal(typeov(getlyrics.of), 'function', 'is a function')
  t.equal(typeov(getlyrics.of.prototype), 'undefined', 'is bound')
  t.equal(getlyrics.of.name, 'bound getThoseMotherEffingLyrics', 'is bound correctly')
  t.end()
})

test('search', t => {
  const getlyrics = new GetLyrics
  t.equal(typeov(getlyrics.search), 'function', 'is a function')
  t.equal(typeov(getlyrics.search.prototype), 'undefined', 'is bound')
  t.equal(getlyrics.search.name, 'bound getThoseMotherEffingLyrics', 'is bound correctly')
  t.end()
})

test('query', t => {
  const getlyrics = new GetLyrics
  t.equal(typeov(getlyrics.query), 'function', 'is a function')
  t.equal(typeov(getlyrics.query.prototype), 'undefined', 'is bound')
  t.equal(getlyrics.query.name, 'bound getThoseMotherEffingLyrics', 'is bound correctly')
  t.end()
})

test('getThoseMotherEffingLyrics', t => {
  const getlyrics = new GetLyrics
  t.equal(typeov(getlyrics.getThoseMotherEffingLyrics), 'function', 'is a function')
  t.end()
})

test('fetchTracksByQuery', async t => {
  await GetLyrics.prototype.fetchTracksByQuery('Chet Faker - Gold', obj => {
    t.equal(typeov(obj.message.body), 'object', 'returns an object with a message and body')
    t.end()
  })
})

test('parseMessageBody', async t => {
  const tracks = await GetLyrics.prototype.fetchTracksByQuery('Chet Faker - Gold', GetLyrics.prototype.parseMessageBody)
  t.equal(typeov(tracks), 'object', 'parses a search query')
})

test('parseTracks', async t => {
  const tracks = GetLyrics.prototype.parseTracks({
    track_list: []
  })
  t.equal(typeov(tracks), 'array', 'can parse a track list')
})

test('getTracksWithLyrics', async t => {
  const tracks = [{
    track: {
      track_id: 68151731,
      has_lyrics: 1
    }
  }]
  const filteredTracks = GetLyrics.prototype.getTracksWithLyrics(tracks)
  t.equal(filteredTracks.length, 1, 'returns only the first result in an array of tracks')
  t.end()
})

test('parseTrackIdFromTrack', async t => {
  t.equal(GetLyrics.prototype.parseTrackIdFromTrack({ track: { track_id: 68151731 }}), 68151731, 'can parse a trackId from a track')
  t.end()
})

test('fetchLyricsWithTrackId', async t => {
  const response = await GetLyrics.prototype.fetchLyricsByTrackId(68151731)
  t.equal(response.message.body.lyrics.lyrics_body,
    'You gotta know, I\'m feeling love\nMade of gold, I never loved a\nAnother one, another you\nIt\'s gotta be love I said it\n\nYou gotta know, I\'m feeling love\nYou gotta know, I\'m feeling love\n\nYou gotta know, I\'m feeling love\nMade of gold, I never loved a\nAnother one, another you\nIt\'s gotta be love I said it\n\nI might as well be in a garden\nI said, ah\nA smell in the air is a dripping rose (you could be the one for me)\nAnother soul to meet my void then\nOf anything bare that\'s made of gold\n\nA physical kiss is nothing without it\nAnd you close your eyes to see what it\'s done\nThe body that lies is built up on looking\nCause all that remains before it\'s begun\n\nYou gotta know, I\'m feeling love\nMade of gold, I never loved a\nAnother one, another you\nIt\'s gotta be love, I said it\n\nYou gotta know, I\'m feeling love\nMade of gold, I never loved a\nAnother one, another you\nIt\'s gotta be love, I said it\n\nA heart will swell before it\'s hardened\nWith the flick of the hair, it can make you old\nAnother hole to dig my soul in\nI\'ll leave anything bare that keeps me soul\n\nAphysical kiss is nothing without it\nAnd you close your eyes to see what it\'s done\nThe body that lies is built up on looking\nCause all that remains before it\'s begun\n\nYou gotta know, I\'m feeling love\nMade of gold, I never loved a\nAnother one, another you\nIt\'s gotta be love, I said it\n\nYou gotta know, I\'m feeling love\nMade of gold, I never loved a\nAnother one, another you\nIt\'s gotta be love, I said it\n\nYou gotta know, I\'m feeling love\nMade of gold, I never loved a\nAnother one, another you\nIt\'s gotta be love, I said it',
    'gets lyrics with a track id')
  t.end()
})
