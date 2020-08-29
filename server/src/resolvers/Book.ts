import { Resolver, Query, Arg, Ctx } from 'type-graphql'
import { Book } from '../entities/Book'
import { MyContext } from 'src/types'

@Resolver()
export class BookResolver {
    @Query(() => Book)
    async book(
        @Arg('id') id: string,
        @Ctx() ctx: MyContext
    ) {
        return await ctx.em.findOne(Book, { id: id })
    }
}