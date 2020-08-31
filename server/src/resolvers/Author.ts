import { Resolver, Mutation, Query, Arg, Ctx } from 'type-graphql'
import { Author } from '../entities/Author'
import { MyContext } from 'src/types'
import { Book } from '../entities/Book'

@Resolver()
export class AuthorResolver {
    @Query(() => Author)
    async author(
        @Arg('id') id: string,
        @Ctx() context: MyContext
    ) {
        const author = await context.em.findOne(Author, { id })
        return author
    }

    @Query(() => [Author])
    async authors(
        @Ctx() context: MyContext
    ) {
        const authors = await context.em.find(Author, {})
        return authors
    }

    @Mutation(() => Author)
    async createAuthor(
        @Arg('name') name: string,
        @Arg('age') age: number,
        @Ctx() context: MyContext
    ) {
        const repo = context.em.getRepository(Author)
        const author = repo.create({ name, age })
        await context.em.persistAndFlush(author)
        const book = new Book()
        return author
    }

}