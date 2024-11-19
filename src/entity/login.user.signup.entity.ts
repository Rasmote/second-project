import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserSignUpEntity {
    @PrimaryColumn()
    userPk: number;

    @Column()
    id: string;

    @Column()
    password: string;

    @Column()
    name: string;
}