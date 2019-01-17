import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedOn: Date;
}