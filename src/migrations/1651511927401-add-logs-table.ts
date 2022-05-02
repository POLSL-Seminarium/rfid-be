import {MigrationInterface, QueryRunner} from "typeorm";

export class addLogsTable1651511927401 implements MigrationInterface {
    name = 'addLogsTable1651511927401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "logs" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "authorized" boolean NOT NULL, "user_id" integer, CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "unknown" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "logs" ADD CONSTRAINT "FK_70c2c3d40d9f661ac502de51349" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP CONSTRAINT "FK_70c2c3d40d9f661ac502de51349"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "unknown"`);
        await queryRunner.query(`DROP TABLE "logs"`);
    }

}
