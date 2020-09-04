import { Entity, PrimaryKey, SerializedPrimaryKey, Property, ManyToOne } from 'mikro-orm'
import { ObjectId } from 'mongodb'
import { ObjectType, Field } from 'type-graphql'
import { Author } from './Author';

@ObjectType()
@Entity() // database table
export class Book {

    @PrimaryKey()
    _id!: ObjectId;

    @Field()
    @SerializedPrimaryKey()
    id!: string;

    @Field(() => Date)
    @Property()
    createdAt = new Date();

    @Field(() => Date)
    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    @Field()
    @Property()
    name!: string;

    @Field()
    @Property()
    genre!: string;

    @Field()
    @ManyToOne(() => Author)
    author!: Author;
}