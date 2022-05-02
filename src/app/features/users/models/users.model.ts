import { Column, Entity, PrimaryColumn } from "typeorm";

interface UsersModelProps {
  id: string;
}

@Entity({
  name: "users",
})
export class UsersModel {
  public static create(data: Partial<UsersModelProps>): UsersModel {
    const entity = new UsersModel();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column()
  authorized: boolean;
}
