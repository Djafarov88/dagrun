export type Membership = {
  name: string;
  price: string;
  summary: string;
  features: string[];
};

export const memberships: Membership[] = [
  {
    name: "Starter",
    price: "$12/mo",
    summary: "For runners building consistency.",
    features: ["Weekly community runs", "Route library access", "Member event pricing"]
  },
  {
    name: "Regular",
    price: "$28/mo",
    summary: "For runners training with structure.",
    features: ["All Starter benefits", "Coach-led workouts", "Monthly benchmark sessions"]
  },
  {
    name: "Performance",
    price: "$48/mo",
    summary: "For runners preparing for races.",
    features: ["All Regular benefits", "Race plan review", "Priority event registration"]
  }
];
