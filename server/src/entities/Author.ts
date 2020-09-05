import { Entity, PrimaryKey, SerializedPrimaryKey, Property, OneToMany, Collection, Cascade } from 'mikro-orm'
import { ObjectId } from 'mongodb'
import { ObjectType, Field } from 'type-graphql'
import { Book } from './Book';

@ObjectType()
@Entity() // database table
export class Author {

    @PrimaryKey() // database field only
    _id!: ObjectId;

    @Field() // exposes graphql schema
    @SerializedPrimaryKey()
    id!: string;

    @Field()
    @Property()
    name!: string;

    @Field()
    @Property()
    age!: number;

    @Field(() => [Book])
    @OneToMany({ entity: () => Book, mappedBy: 'author', orphanRemoval: true, cascade: [Cascade.REMOVE] })
    books = new Collection<Book>(this)
}