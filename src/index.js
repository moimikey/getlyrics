import { typeov } from 'typeov'
import argv from 'yargs'
import assert from 'assert'
import musicmatch from 'musicmatch'
import { isEnv } from './util'

export const getlyrics = new class GetLyrics {
  static music = musicmatch()

  constructor() {
    this.start().catch(process.stderr.write)
    return {
      parseMessageBody: this.parseMessageBody.bind(this),
      parseTracks: this.parseTracks.bind(this),
      parseTrackIdFromTrack: this.parseTrackIdFromTrack.bind(this),
      parseLyrics: this.parseLyrics.bind(this),
      fetchTracksByQuery: this.fetchTracksByQuery.bind(this),
      fetchLyricsByTrackId: this.fetchLyricsByTrackId.bind(this),
      getTracksWithLyrics: this.getTracksWithLyrics.bind(this)
    }
  }

  async start() {
    if (!isEnv('test')) {
      const args = argv.usage('Usage: $0 <command> [options]')
        .demand('s')
        .alias('s', 'search')
        .nargs('s', 1)
        .describe('s', 'Grimes - REALiTi')
        .help('h')
        .alias('h', 'help')
        .argv
      const searchTerm = args.search
      process.stdout.write(`searching ${searchTerm}...\n`)
      const result = await this.getThoseMotherEffingLyrics(searchTerm)
      process.stdout.write(`${result}\n`)
    }
  }

  async getThoseMotherEffingLyrics(searchTerm) {
    const query = await this.fetchTracksByQuery(searchTerm, this.parseMessageBody)
    const tracks = this.parseTracks(query)
    const filteredTracks = this.getTracksWithLyrics(tracks)
    const trackId = this.parseTrackIdFromTrack(filteredTracks[0])
    const response = await this.fetchLyricsByTrackId(trackId, this.parseMessageBody)
    return this.parseLyrics(response)
  }

  parseLyrics(lyrics$) {
    assert.equal(typeov(lyrics$), 'object')
    assert.equal(typeov(lyrics$.lyrics), 'object')
    assert.equal(typeov(lyrics$.lyrics.lyrics_body), 'string')
    return lyrics$.lyrics.lyrics_body
  }

  parseMessageBody(obj) {
    assert.equal(typeov(obj), 'object')
    assert.equal(typeov(obj.message), 'object')
    assert.equal(typeov(obj.message.body), 'object')
    return obj.message.body
  }


  parseTrackIdFromTrack(obj) {
    assert.equal(typeov(obj), 'object')
    return obj.track.track_id
  }

  parseTracks(tracks$) {
    assert.equal(typeov(tracks$), 'object')
    assert.equal(typeov(tracks$.track_list), 'array')
    return tracks$.track_list
  }

  getTracksWithLyrics(obj) {
    assert.equal(typeov(obj), 'array')
    return obj.filter(tracks => tracks.track.has_lyrics)
  }

  async fetchTracksByQuery(query, parserFn) {
    const tracks = await GetLyrics.music.trackSearch({
      q: query,
      page: 1,
      page_size: 1
    })
    return typeov(parserFn) === 'function' ? parserFn(tracks) : tracks
  }

  async fetchLyricsByTrackId(trackId, parserFn) {
    const tracks = await GetLyrics.music.trackLyrics({ track_id: trackId })
    return typeov(parserFn) === 'function' ? parserFn(tracks) : tracks
  }
}
