import {SessionStatus} from '@/lib/types';
import { TypeStatus } from '@/lib/types';

interface StatusBadgeProps {
    id: number,
    type: SessionStatus | TypeStatus,
    description: string;
}

export default function StatusBadge({ id, type, description }: StatusBadgeProps) {
    return (
        <div className="bg-zinc-800 text-zinc-50 border border-white/6 rounded-lg p-4">
            <h2>Status  Badge</h2>
            <p>{type}</p>
            <p>{description}</p>
        </div>
    );
}