import { AssociationOutput, EventOutput, LiveData, SourceOutput } from 'types'

const events: EventOutput[] = [
  {
    associations: [
      {
        filter_paths: ['Type of incident', 'Unlawful attacks on civilians'],
        id: 'CIVILIANS',
        title: '',
        desc: 'CIVILIANS',
        mode: 'FILTER'
      },
      {
        filter_paths: ['Means of attack', 'Missile fire'],
        id: 'MISSILE_FIRE',
        title: '',
        desc: 'MISSILE_FIRE',
        mode: 'FILTER'
      }
    ],
    sources: ['https://t.me/ressentiment_channel/15782'],
    id: 0,
    description: 'Cyclist killed in explosion',
    date: '24/02/2022',
    time: '',
    location: 'Uman, Cherkasy Oblast',
    latitude: '48.7494',
    longitude: '30.2214'
  },
  {
    associations: [
      {
        filter_paths: [
          'Type of incident',
          'Attacks on civilian objects',
          'Residential'
        ],
        id: 'RESIDENTIAL',
        title: '',
        desc: 'RESIDENTIAL',
        mode: 'FILTER'
      },
      {
        filter_paths: ['Type of incident', 'Unlawful attacks on civilians'],
        id: 'CIVILIANS',
        title: '',
        desc: 'CIVILIANS',
        mode: 'FILTER'
      },
      {
        filter_paths: ['Means of attack', 'Undefined'],
        id: 'MEANS_OF_ATTACK_UNDEFINED',
        title: '',
        desc: 'MEANS_OF_ATTACK_UNDEFINED',
        mode: 'FILTER'
      }
    ],
    sources: [
      'https://twitter.com/ChaudharyParvez/status/1496740208376750085',
      'https://t.me/Pravda_Gerashchenko/209',
      'https://t.me/Pravda_Gerashchenko/207',
      'https://t.me/ressentiment_channel/15804a'
    ],
    id: 1,
    description: 'Severe damage to residential buildings',
    date: '24/02/2022',
    time: '',
    location: 'Chuhuiv, Kharkiv Oblast',
    latitude: '49.8363',
    longitude: '36.6813'
  },
  {
    associations: [
      {
        filter_paths: [
          'Type of incident',
          'Attacks on civilian objects',
          'Residential'
        ],
        id: 'RESIDENTIAL',
        title: '',
        desc: 'RESIDENTIAL',
        mode: 'FILTER'
      },
      {
        filter_paths: ['Means of attack', 'Missile fire'],
        id: 'MISSILE_FIRE',
        title: '',
        desc: 'MISSILE_FIRE',
        mode: 'FILTER'
      }
    ],
    sources: ['https://twitter.com/by_Ukraine/status/1496795626553720835'],
    id: 2,
    description:
      'Remains of the rocket assisted projectile in the residential area',
    date: '24/02/2022',
    time: '',
    location: 'Kharkiv, Kharkiv Oblast',
    latitude: '49.9935',
    longitude: '36.2304'
  },
  {
    associations: [
      {
        filter_paths: ['Type of incident', 'Attacks on civilian objects'],
        id: 'CIVILIAN_OBJECTS',
        title: '',
        desc: 'CIVILIAN_OBJECTS',
        mode: 'FILTER'
      },
      {
        filter_paths: ['Means of attack', 'Missile fire'],
        id: 'MISSILE_FIRE',
        title: '',
        desc: 'MISSILE_FIRE',
        mode: 'FILTER'
      },
      {
        filter_paths: ['Means of attack', 'Air strike', 'Fab 500'],
        id: 'AIR_STRIKE_FAB_500',
        title: '',
        desc: 'AIR_STRIKE_FAB_500',
        mode: 'FILTER'
      },
      {
        filter_paths: ['Means of attack', 'Air strike'],
        id: 'AIR_STRIKE',
        title: '',
        desc: 'AIR_STRIKE',
        mode: 'FILTER'
      },
      {
        filter_paths: ['Means of attack', 'Air strike', 'Fab 250'],
        id: 'AIR_STRIKE_FAB_250',
        title: '',
        desc: 'AIR_STRIKE_FAB_250',
        mode: 'FILTER'
      }
    ],
    sources: ['https://www.facebook.com/chesno.kyiv/posts/735100127876464'],
    id: 3,
    description: 'Missile damage in civilian area',
    date: '24/02/2022',
    time: '',
    location: "Holosiivs'kyi district, Kyiv Oblast",
    latitude: '50.3957343',
    longitude: '30.5061981'
  }
]

const associations: AssociationOutput[] = [
  {
    filter_paths: ['Type of incident', 'Unlawful attacks on civilians'],
    id: 'CIVILIANS',
    title: '',
    desc: 'CIVILIANS',
    mode: 'FILTER'
  },
  {
    filter_paths: ['Type of incident', 'Attacks on civilian objects'],
    id: 'CIVILIAN_OBJECTS',
    title: '',
    desc: 'CIVILIAN_OBJECTS',
    mode: 'FILTER'
  },
  {
    filter_paths: [
      'Type of incident',
      'Attacks on civilian objects',
      'Residential'
    ],
    id: 'RESIDENTIAL',
    title: '',
    desc: 'RESIDENTIAL',
    mode: 'FILTER'
  },
  {
    filter_paths: ['Type of incident', 'Bridges'],
    id: 'BRIDGES',
    title: '',
    desc: 'BRIDGES',
    mode: 'FILTER'
  },
  {
    filter_paths: ['Means of attack', 'Undefined'],
    id: 'MEANS_OF_ATTACK_UNDEFINED',
    title: '',
    desc: 'MEANS_OF_ATTACK_UNDEFINED',
    mode: 'FILTER'
  },
  {
    filter_paths: ['Means of attack', 'Air strike'],
    id: 'AIR_STRIKE',
    title: '',
    desc: 'AIR_STRIKE',
    mode: 'FILTER'
  },
  {
    filter_paths: ['Means of attack', 'Air strike', 'Fab 250'],
    id: 'AIR_STRIKE_FAB_250',
    title: '',
    desc: 'AIR_STRIKE_FAB_250',
    mode: 'FILTER'
  },
  {
    filter_paths: ['Means of attack', 'Air strike', 'Fab 500'],
    id: 'AIR_STRIKE_FAB_500',
    title: '',
    desc: 'AIR_STRIKE_FAB_500',
    mode: 'FILTER'
  },
  {
    filter_paths: ['Means of attack', 'Missile fire'],
    id: 'MISSILE_FIRE',
    title: '',
    desc: 'MISSILE_FIRE',
    mode: 'FILTER'
  }
]

const sources: Record<string, SourceOutput> = {
  'https://www.facebook.com/chesno.kyiv/posts/735100127876464': {
    paths: [
      '1EvifeNRl7B7TN0MRSGuYEqAvz6JtTJp5',
      '1F0EvYu16M9IFNy7P5L0cVBSTJxSuQej7',
      '1fBe_2ZBRwz7dbDkQPA1PcPWNu_SQDYv6',
      '16AkkSWOSl0k-Qk4i_aI4VCqml80ZHqOH',
      '1lut2JC41a64fwtcecD6dNujonfn_RuXi',
      '1PxItVVtfHjUQOyqsKkFM1_g90BngMUS3',
      '19ep8jT7aoc0WekcTuVjJETpnxpP3tAP8'
    ],
    id: 'https://www.facebook.com/chesno.kyiv/posts/735100127876464',
    title: '',
    thumbnail: '',
    description: '',
    type: 'Manual'
  },
  'https://twitter.com/ChaudharyParvez?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1496740208376750085%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fnews.liga.net%2Fpolitics%2Fchronicle%2Fnovaya-ugroza-iz-rossii-vse-glavnoe-ob-eskalatsii-voennoy-agressii-rf-protiv-ukrainy-live':
    {
      paths: [
        'https://twitter.com/ChaudharyParvez?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1496740208376750085%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fnews.liga.net%2Fpolitics%2Fchronicle%2Fnovaya-ugroza-iz-rossii-vse-glavnoe-ob-eskalatsii-voennoy-agressii-rf-protiv-ukrainy-live'
      ],
      id: 'https://twitter.com/ChaudharyParvez?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1496740208376750085%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fnews.liga.net%2Fpolitics%2Fchronicle%2Fnovaya-ugroza-iz-rossii-vse-glavnoe-ob-eskalatsii-voennoy-agressii-rf-protiv-ukrainy-live',
      title: '',
      thumbnail: '',
      description: '',
      type: 'Tweet'
    },
  'https://twitter.com/ChaudharyParvez/status/1496740208376750085': {
    paths: ['https://twitter.com/ChaudharyParvez/status/1496740208376750085'],
    id: 'https://twitter.com/ChaudharyParvez/status/1496740208376750085',
    title: '',
    thumbnail: '',
    description: '',
    type: 'Tweet'
  },
  'https://t.me/Pravda_Gerashchenko/209': {
    paths: ['https://t.me/Pravda_Gerashchenko/209'],
    id: 'https://t.me/Pravda_Gerashchenko/209',
    title: '',
    thumbnail: '',
    description: '',
    type: 'Telegram'
  },
  'https://t.me/Pravda_Gerashchenko/207': {
    paths: ['https://t.me/Pravda_Gerashchenko/207'],
    id: 'https://t.me/Pravda_Gerashchenko/207',
    title: '',
    thumbnail: '',
    description: '',
    type: 'Telegram'
  },
  'https://t.me/ressentiment_channel/15782': {
    paths: ['https://t.me/ressentiment_channel/15782'],
    id: 'https://t.me/ressentiment_channel/15782',
    title: '',
    thumbnail: '',
    description: '',
    type: 'Telegram'
  },
  'https://t.me/ressentiment_channel/15804a': {
    paths: ['https://t.me/ressentiment_channel/15804a'],
    id: 'https://t.me/ressentiment_channel/15804a',
    title: '',
    thumbnail: '',
    description: '',
    type: 'Telegram'
  },
  'https://twitter.com/by_Ukraine/status/1496795626553720835': {
    paths: ['https://twitter.com/by_Ukraine/status/1496795626553720835'],
    id: 'https://twitter.com/by_Ukraine/status/1496795626553720835',
    title: '',
    thumbnail: '',
    description: '',
    type: 'Tweet'
  }
}

export const liveData: LiveData = {
  events,
  associations,
  sources,
  sites: [],
  regions: [],
  shapes: [],
  notifications: []
}
