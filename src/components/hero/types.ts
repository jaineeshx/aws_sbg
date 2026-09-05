export interface TerminalLine {
  t: string;
  c?: string;
  isAction?: boolean;
  targetId?: string;
  isCommand?: boolean;
}

export interface BootLine {
  t: string;
  c: string;
  d: number;
  isCommand?: boolean;
}

export interface SectionItem {
  name: string;
  id: string;
  desc: string;
}

export interface StatItem {
  val: string;
  label: string;
}
