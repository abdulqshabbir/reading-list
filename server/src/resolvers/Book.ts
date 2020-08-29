import { Resolver, Query } from 'type-graphql'

@Resolver()
export class BookResolver {
    @Query(() => String)
    book() {
        return 'book!!!1'
    }
}