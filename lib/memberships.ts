export type Membership = {
  name: string;
  price: string;
  summary: string;
  features: string[];
};

export const memberships: Membership[] = [
  {
    name: "Base",
    price: "2 900 ₽/мес",
    summary: "Для тех, кто хочет бегать регулярно и быть в клубной среде.",
    features: ["3 тренировки в неделю", "Общий чат DAGRUN", "Скидки на старты"]
  },
  {
    name: "Pro",
    price: "5 900 ₽/мес",
    summary: "Для подготовки к забегам с тренерской структурой.",
    features: ["Все из Base", "План подготовки", "Контроль темпа и объема"]
  },
  {
    name: "Elite",
    price: "9 900 ₽/мес",
    summary: "Для амбициозных целей, личного прогресса и стартов.",
    features: ["Все из Pro", "Персональный разбор", "Приоритетная регистрация"]
  }
];
