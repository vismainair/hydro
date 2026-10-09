export interface Speech {
  name: string;
  duration: number;
  isSecondary: boolean;
}

export interface Flow {
  name: string;
  columns: string[];
}

export interface DebateFormat {
  name: string;
  flows: Flow[];
  speeches: Speech[];
  prepMinutes: number;
}

/**
 * Const storing lincoln-douglas debate format.
 */
export const ld: DebateFormat = {
  name: 'Lincoln-Douglas',
  flows: [
    {
      name: 'aff',
      columns: ['1AC', '1NR', '1AR', '2NR', '2AR'],
    },
    {
      name: 'neg',
      columns: ['1NC', '1AR', '2NR', '2AR'],
    },
  ],
  speeches: [
    {
      name: '1AC',
      duration: 6,
      isSecondary: false,
    },
    {
      name: '1NC',
      duration: 7,
      isSecondary: true,
    },
    {
      name: '1AR',
      duration: 4,
      isSecondary: false,
    },
    {
      name: '2NR',
      duration: 6,
      isSecondary: true,
    },
    {
      name: '2AR',
      duration: 3,
      isSecondary: false,
    },
  ],
  prepMinutes: 4,
};
