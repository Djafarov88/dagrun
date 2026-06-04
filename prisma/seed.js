const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const memberships = [
  {
    name: "Новичок",
    slug: "novichok",
    description: "Разовая тренировка для знакомства с клубом и форматом занятий.",
    price: "500",
    features: ["Разовая тренировка", "Групповое занятие", "Подходит для первого визита"]
  },
  {
    name: "Семья DAGRUN",
    slug: "semya-dagrun",
    description: "1 месяц тренировок в клубной группе.",
    price: "3000",
    features: ["1 месяц", "3 раза в неделю", "Тренировки на стадионе «Труд»"]
  },
  {
    name: "Любитель",
    slug: "lyubitel",
    description: "3 месяца регулярных тренировок и бонусы от партнёров клуба.",
    price: "7200",
    features: ["3 месяца", "3 раза в неделю", "Бонусы от партнёров клуба"]
  },
  {
    name: "Профи",
    slug: "profi",
    description: "6 месяцев подготовки с бонусами от партнёров и скидками на забеги.",
    price: "11500",
    features: ["6 месяцев", "3 раза в неделю", "Бонусы от партнёров клуба", "Скидки на забеги"]
  },
  {
    name: "Годовой",
    slug: "godovoy",
    description: "12 месяцев тренировок с расширенными клубными бонусами.",
    price: "18000",
    features: ["12 месяцев", "3 раза в неделю", "Бонусы от партнёров клуба", "Скидки на забеги", "1 гость в месяц"]
  },
  {
    name: "Индивидуальная подготовка",
    slug: "individualnaya-podgotovka",
    description: "Цена формируется индивидуально в зависимости от цели и сроков.",
    price: "7000",
    features: ["Индивидуальная цель", "Персональные сроки", "Подготовка к нормативам или стартам"]
  }
];

const trainers = [
  ["Максим Королёв", "Главный тренер", "Чемпион РД на 1500 м, 3000 м, 5000 м и 10 км. Чемпион ЮФО на 3000 м."],
  ["Тарлан Амиралиев", "Тренер", "Чемпион по кроссу РД на 10 км, призёр «Джейрах» 21 км, чемпион RUNFEST в вертикальном километре и на 20 км."],
  ["Гамад Латифов", "Тренер", "Чемпион РД на 800 м, призёр Чемпионата РД на 1500 м и 5000 м."],
  ["Райсат Чартаева", "Тренер", "Чемпион СКФО на 1500 м и 3000 м, чемпион Универсиады ЮФО на 800 м, чемпион РД на 800 м и 1500 м."],
  ["Хадижа Келебеева", "Тренер", "Финалист Чемпионата России на 60 м, чемпион РД на 60 м и 100 м, чемпион ЮФО и СКФО на 60 м."]
];

async function main() {
  await prisma.siteContent.upsert({
    where: { key: "homepage" },
    update: {
      heroTitle: "Крупнейшее беговое сообщество Дагестана",
      heroSubtitle: "Присоединяйтесь к нам, чтобы достигнуть своих спортивных целей, улучшить физическую форму и обрести новых друзей.",
      heroImage: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&w=2200&q=85",
      statParticipants: "5000+",
      statTrainings: "3",
      statEvents: "10+"
    },
    create: {
      key: "homepage",
      heroTitle: "Крупнейшее беговое сообщество Дагестана",
      heroSubtitle: "Присоединяйтесь к нам, чтобы достигнуть своих спортивных целей, улучшить физическую форму и обрести новых друзей.",
      heroImage: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&w=2200&q=85",
      statParticipants: "5000+",
      statTrainings: "3",
      statEvents: "10+"
    }
  });

  for (const plan of memberships) {
    await prisma.membershipPlan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan
    });
  }

  for (const [index, trainer] of trainers.entries()) {
    await prisma.trainer.upsert({
      where: { id: `seed-trainer-${index}` },
      update: {
        name: trainer[0],
        role: trainer[1],
        bio: trainer[2],
        image: "",
        sortOrder: index,
        active: true
      },
      create: {
        id: `seed-trainer-${index}`,
        name: trainer[0],
        role: trainer[1],
        bio: trainer[2],
        image: "",
        sortOrder: index,
        active: true
      }
    });
  }

  await prisma.partner.upsert({
    where: { id: "seed-partner-telegram" },
    update: {
      name: "Партнёры клуба",
      url: "https://t.me/dagrun05",
      logo: "",
      sortOrder: 0,
      active: true
    },
    create: {
      id: "seed-partner-telegram",
      name: "Партнёры клуба",
      url: "https://t.me/dagrun05",
      logo: "",
      sortOrder: 0,
      active: true
    }
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
