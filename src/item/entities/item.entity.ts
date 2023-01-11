import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn }from "typeorm";

@Entity()
export class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ name: 'name', type: 'varchar', length: 50})
    name: string;

    @Column({ name: 'description', type: 'varchar', nullable: true, length: 255})
    description?: string;

    @Column({ name: 'quantity', type: 'int'})
    quantity: number;

    @Column({ name: 'type', type: 'varchar', length: 50})
    type: string;


constructor(item?: Partial<Item>) {
    this.id = item?.id;
    this.updatedAt = item?.updatedAt;
    this.name = item?.name;
    this.description = item?.description;
    this.quantity = item?.quantity;
    this.type = item?.type;
}
}
