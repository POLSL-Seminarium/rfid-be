import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LogsModel } from "../../logs/models/logs.model";

interface UsersModelProps {
  code: string;
  name: string;
  authorized: boolean;
  unknown: boolean;
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

  @Column()
  unknown: boolean;

  @OneToMany(() => LogsModel, (log) => log.user)
  logs: LogsModel[];
}
