// Shared between /api/scope and the scoper UI.
// Sentinels are appended to the plain-text stream so the client can react to non-text outcomes.
export const REFUSAL_SENTINEL = "\u0000[[refusal]]";
export const ERROR_SENTINEL = "\u0000[[error]]";
export const BRIEF_HEADING = "## Project brief";

export type ChatMessage = { role: "user" | "assistant"; content: string };
