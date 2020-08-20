import Book from './book'

export default interface Author {
    id: string;
    name: string;
    age: string;
    books: [Book];
}