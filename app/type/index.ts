export type Project = {
  title: string;
  client: string;
  deadline: string;
  amount: number;
  status: string;
  description: string;
};
export type UserProfile = {
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  // add more fields as needed
};
