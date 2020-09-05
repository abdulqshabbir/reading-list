import Book from './book'

export default interface Author {
    _id: string;
    id: string;
    name: string;
    age: string;
    books: [Book];
}