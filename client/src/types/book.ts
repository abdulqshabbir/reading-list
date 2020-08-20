import Author from './author'

export default interface Book {
    id: string;
    name: string;
    genre: string;
    author: Author;
}