import {MigrationInterface, QueryRunner} from "typeorm";

export class addUsersTable1651494399654 implements MigrationInterface {
    name = 'addUsersTable1651494399654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "authorized" boolean NOT NULL, CONSTRAINT "UQ_1f7a2b11e29b1422a2622beab36" UNIQUE ("code"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
