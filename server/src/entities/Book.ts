import { Entity, PrimaryKey, SerializedPrimaryKey, Property } from 'mikro-orm'
import { ObjectId } from 'mongodb'
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
@Entity() // database table
export class Book {

    @PrimaryKey() // database field only
    _id!: ObjectId;

    @Field() // exposes graphql schema
    @SerializedPrimaryKey()
    id!: string;

    @Field(() => Date) // graphql field
    @Property() // database field
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
    @Property()
    authorId!: string;
}