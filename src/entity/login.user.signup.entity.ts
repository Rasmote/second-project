import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserSignUpEntity {
    @PrimaryGeneratedColumn()
    userPk: number;

    @Column()
    id: string;

    @Column()
    password: string;

    @Column()
    name: string;
}