// Example project for Heeler editor screenshots. Fictional data only.

export interface Note {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  updatedAt: number;
}

export function searchNotes(notes: Note[], query: string): Note[] {
  const search = query.trim().toLowerCase();
  return notes
    .filter(note => `${note.title} ${note.content}`.toLowerCase().includes(search))
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt);
}

export function togglePin(note: Note): Note {
  return { ...note, pinned: !note.pinned, updatedAt: Date.now() };
}

export const exampleNotes: Note[] = [
  { id: 'demo-1', title: 'Weekend ideas', content: 'Build something fun.',
    pinned: true, updatedAt: 0 },
  { id: 'demo-2', title: 'Garden plans', content: 'Remember the tomatoes.',
    pinned: false, updatedAt: 0 },
];
