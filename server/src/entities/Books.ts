import { Entity, PrimaryKey, SerializedPrimaryKey, Property } from 'mikro-orm'
import { ObjectId } from 'mongodb'

@Entity() // database table
export class Books {

    @PrimaryKey() // database field
    _id!: ObjectId;

    @SerializedPrimaryKey()
    id!: string;

    @Property() // database field
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property()
    name!: string;

    @Property()
    genre!: string;

    @Property()
    authorId!: string;
}