export interface StreamType {
  id: number;
  title: string;
  coverImageUrl?: string;
  status: "active" | "retired";
  ownerId: string;
}