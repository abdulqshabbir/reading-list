import { Resolver, Mutation, Query, Arg, Ctx } from 'type-graphql'
import { Book } from '../entities/Book'
import { MyContext } from 'src/types'

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
        @Ctx() context: MyContext
    ) {
        const repo = context.em.getRepository(Book)
        const book = repo.create({ name, genre, authorId: '2' })
        await context.em.persistAndFlush(book)
        return book
    }
}