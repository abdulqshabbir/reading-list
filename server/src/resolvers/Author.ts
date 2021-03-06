import { Resolver, Mutation, Query, Arg, Ctx } from 'type-graphql'
import { Author } from '../entities/Author'
import { MyContext } from 'src/types'

@Resolver()
export class AuthorResolver {
    @Query(() => Author)
    async author(
        @Arg('id') id: string,
        @Ctx() context: MyContext
    ) {
        console.log('inside author resolver!')
        const author = await context.em.findOne(Author, { id })

        await author?.books.init()

        for (const book of author!.books) {
            console.log(book.name)
            author?.books.add(book)
        }

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
        return author
    }

    @Mutation(() => Author)
    async deleteAuthor(
        @Arg('id') id: string,
        @Ctx() context: MyContext
    ): Promise<null | Author> {
        const repo = context.em.getRepository(Author)
        const author = await repo.findOne({ id })
        if (author) {
            await repo.removeAndFlush(author)
            return author
        }
        return null
    }
}