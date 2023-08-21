export interface Props {
    name: string;
    slug: string;
    image: string;
  }
  
export type Books = Props;

export const books: Props[] = [
{
    name: "Atomic Habits",
    slug: "atomic-habits",
    image: "./src/assets/books/Atomic-Habits-by-James-Clear.jpg",
},
];
