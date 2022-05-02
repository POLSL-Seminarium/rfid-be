import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UsersModel } from "../../users/models/users.model";

interface LogsModelProps {
  id: string;
  user?: UsersModel;
  authorized: boolean;
}

@Entity({
  name: "logs",
})
export class LogsModel {
  public static create(data: Partial<LogsModelProps>): LogsModel {
    const entity = new LogsModel();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryGeneratedColumn("increment")
  id: string;

  @ManyToOne(() => UsersModel, (user) => user.logs)
  user: UsersModel;

  @CreateDateColumn()
  date: Date;

  @Column()
  authorized: boolean;
}
