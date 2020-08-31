import { Resolver, Mutation, Query, Arg, Ctx } from 'type-graphql'
import { Book } from '../entities/Book'
import { MyContext } from 'src/types'
import { Author } from '../entities/Author'

@Resolver()
export class BookResolver {
    @Query(() => Book)
    async book
        (
            @Arg('id') id: string,
            @Ctx() context: MyContext
        ) {
        return await context.em.findOne(Book, { id: id })
    }

    @Query(() => [Book])
    async books(@Ctx() context: MyContext) {
        return context.em.find(Book, {})
    }

    @Mutation(() => Book, { nullable: true })
    async createBook(
        @Arg('name') name: string,
        @Arg('genre') genre: string,
        @Arg('authorId') authorId: string,
        @Ctx() context: MyContext
    ): Promise<Book | null> {
        // create book
        const bookRepo = context.em.getRepository(Book)
        const book = bookRepo.create({ name, genre })

        // associate author to book
        const authorRepo = context.em.getRepository(Author)
        const author = await authorRepo.findOne({ id: authorId })

        if (author !== null) {
            book.author = author
            await context.em.persistAndFlush(book)
            return book
        }
        else {
            return null
        }
    }

    @Mutation(() => Book, { nullable: true })
    async deleteBook(
        @Arg('id') id: string,
        @Ctx() context: MyContext
    ): Promise<Book | null> {
        const book = await context.em.findOne(Book, { id })
        if (book) {
            await context.em.remove(Book, { id }, true)
            return book
        }
        return null
    }
}