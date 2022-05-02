import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

interface UsersModelProps {
  code: string;
  name: string;
  authorized: string;
}

@Entity({
  name: "users",
})
export class UsersModel {
  public static create(data: UsersModelProps): UsersModel {
    const entity = new UsersModel();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column()
  authorized: boolean;
}
