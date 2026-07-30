export type StreamType = 'Game' | 'Chatting' | 'Vlog' | 'Music';

export type NoteType = 'Works' | 'Improvement' | 'Failed';

export type SessionStatus = 'Planned' | 'Completed' | 'Cancelled';

export type TypeStatus = 'Active' | 'Retired';

export interface UserInformation {
    id: number,
    name: string,
    sessions: number;
}

export interface SessionCard {
    id: number,
    date: string,      //ISO string
    title: string,
    type: StreamType[],
    duration: number,    //in hours
    goals?: string[];
}

export interface NoteCard {
    id: number,
    type: NoteType,
    description: string;
}