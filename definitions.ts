

export interface EntryData {
  'id': number
  'title': string
  'date_added': Date
  'description': string
  'artists': string[]
  'tags': string[]
  'catPath': string[]
}

export function blankEntry(){
  return (
  {
    id: 0,
    title: 'No entry available',
    date_added: new Date(),
    description: 'No entry data available.',
    artists: [],
    tags: [],
    catPath: []
  }
  )
}