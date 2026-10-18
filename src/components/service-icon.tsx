import { Bot, FileSearch, Globe, MessageCircle, Rocket, ShieldCheck, Smartphone, type LucideProps } from "lucide-react";
import type { Service } from "@/content/services";

const icons = {
  agent: Bot,
  chat: MessageCircle,
  docs: FileSearch,
  rocket: Rocket,
  globe: Globe,
  phone: Smartphone,
  shield: ShieldCheck,
} satisfies Record<Service["icon"], React.ComponentType<LucideProps>>;

export function ServiceIcon({ name, ...props }: { name: Service["icon"] } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" {...props} />;
}
